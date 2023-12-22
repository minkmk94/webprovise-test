import {Int, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import axios from 'axios';
import {CompanyEntity} from '../../../entities/company.entity';
import {TravelEntity} from '../../../entities/travel.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {GET_COMPANIES_URL, GET_TRAVELS_URL} from '../constants';

@Resolver(() => CompanyEntity)
export class CompanyQueryResolver {
  constructor(
    @InjectRepository(CompanyEntity) private companyRepo: Repository<CompanyEntity>,
    @InjectRepository(TravelEntity) private travelRepo: Repository<TravelEntity>
  ) {}

  @Query(() => [CompanyEntity], {
    name: 'getCompanies',
    description: 'getCompanies',
  })
  async getCompanies(): Promise<CompanyEntity[]> {
    // Fetch data if not existed in database
    const data = await this.companyRepo.find({order: {id: 'ASC'}, take: 1});
    if (!data.length) {
      const companiesResponse = await axios.get(GET_COMPANIES_URL);
      const travelsResponse = await axios.get(GET_TRAVELS_URL);
      const companies: CompanyEntity[] = companiesResponse.data;
      const travels: TravelEntity[] = travelsResponse.data;
      // Insert to database
      await this.companyRepo.save(companies);
      await this.travelRepo.save(travels);
    }

    return this.companyRepo.find({order: {id: 'ASC'}});
  }

  @ResolveField(() => CompanyEntity, {
    nullable: true,
  })
  async children(@Parent() company: CompanyEntity): Promise<CompanyEntity> {
    return this.companyRepo.findOneBy({parentId: company.id});
  }
  @ResolveField(() => Int, {
    nullable: true,
  })
  async cost(@Parent() company: CompanyEntity): Promise<number> {
    // get parent's cost and child's cost (if existed)
    const allChildren = await this.getChild(company.id);
    const companyIds = [company, ...allChildren].map((company) => company.id);
    const cost = await this.travelRepo.createQueryBuilder('travel')
      .where('travel.companyId IN (:...companyIds)', {companyIds})
      .select(['travel.companyId AS id', 'SUM(travel.price::float) as price'])
      .groupBy('travel.companyId')
      .getRawOne();
    return cost.price ?? 0;
  }

  private async getChild(parentId: string): Promise<CompanyEntity[]> {
    const allChildren: CompanyEntity[] = [];
    const children = await this.companyRepo.findBy({
      parentId
    });
    if (children.length) {
      const nextLevelChild = await Promise.all(children.map(async (child) => this.getChild(child.id)));
      allChildren.push(...children, ...(nextLevelChild.flat()));
    }
    return allChildren;
  }
}
