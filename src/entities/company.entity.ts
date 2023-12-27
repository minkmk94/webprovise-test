import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType('Company', {
  description: 'Company',
})
export class CompanyEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  parentId: string;

  @Field()
  createdAt: string;
}