import {Module} from '@nestjs/common';
import {CompanyQueryResolver} from './resolvers/company.query.resolver';

@Module({
  providers: [
    CompanyQueryResolver,
  ],
})
export class CompanyModule {}
