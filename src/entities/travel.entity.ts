import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType('Travel', {
  description: 'Travel',
})
export class TravelEntity {
  @Field()
  id: string;

  @Field()
  employeeName: string;

  @Field()
  departure: string;

  @Field()
  destination: string;

  @Field()
  price: string;

  @Field()
  companyId: string;

  @Field()
  createdAt: string;
}