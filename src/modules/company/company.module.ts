import {Module} from '@nestjs/common';
import {CompanyQueryResolver} from './resolvers/company.query.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanyEntity} from '../../entities/company.entity';
import {TravelEntity} from '../../entities/travel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, TravelEntity])],
  providers: [
    CompanyQueryResolver,
  ],
})
export class CompanyModule {}
