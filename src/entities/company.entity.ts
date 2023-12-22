import {Field, ObjectType} from '@nestjs/graphql';
import {Column, Entity, OneToMany} from 'typeorm';
import {TravelEntity} from './travel.entity';

@ObjectType('Company', {
  description: 'Company',
})
@Entity({
  name: 'companies',
})
export class CompanyEntity {
  @Field()
  @Column('varchar', {
    primary: true,
  })
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ name: 'parent_id' })
  parentId: string;

  @Field()
  @Column({ name: 'created_at' })
  createdAt: string;

  @OneToMany(() => TravelEntity, (travel) => travel.company)
  @Field(() => [TravelEntity], { nullable: true })
  travels: TravelEntity[];
}