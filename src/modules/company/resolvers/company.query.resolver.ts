import {Int, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import axios from 'axios';
import {CompanyEntity} from '../../../entities/company.entity';
import {TravelEntity} from '../../../entities/travel.entity';
import {GET_COMPANIES_URL, GET_TRAVELS_URL} from '../constants';

@Resolver(() => CompanyEntity)
export class CompanyQueryResolver {
  private companies: CompanyEntity[] = [];
  private travels: TravelEntity[] = [];

  @Query(() => [CompanyEntity], {
    name: 'getCompanies',
    description: 'getCompanies',
  })
  async getCompanies(): Promise<CompanyEntity[]> {
    const [companiesResponse, travelsResponse] = await Promise.all([axios.get(GET_COMPANIES_URL), axios.get(GET_TRAVELS_URL)]);
    this.companies = companiesResponse?.data?.sort();
    this.travels = travelsResponse?.data?.sort();
    return this.companies;
  }

  @ResolveField(() => [CompanyEntity], {
    nullable: true,
  })
  children(@Parent() company: CompanyEntity): CompanyEntity[] {
    return this.companies.filter((e) => e.parentId === company.id);
  }
  @ResolveField(() => Int, {
    nullable: true,
  })
   cost(@Parent() company: CompanyEntity): number {
    // get parent's cost and child's cost (if existed)
    const allChildren = this.getChildren(company.id);
    // Calculate cost of parent company and all children companies
    const companyIds = [company, ...allChildren].map((e) => e.id);
    return this.travels.reduce((cost, travel) => companyIds.includes(travel.companyId) ? cost + Number(travel.price) : cost, 0);
  }

  private getChildren(parentId: string): CompanyEntity[] {
    const allChildren: CompanyEntity[] = [];
    const children = this.companies.filter((e) => e.parentId === parentId);
    if (children.length) {
      // Get next level children
      const nextLevelChild = children.map((child) => this.getChildren(child.id));
      allChildren.push(...children, ...(nextLevelChild.flat()));
    }
    return allChildren;
  }
}
