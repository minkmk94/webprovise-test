import {Field, ObjectType} from '@nestjs/graphql';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {CompanyEntity} from './company.entity';

@ObjectType('Travel', {
  description: 'Travel',
})
@Entity({
  name: 'travels',
})
export class TravelEntity {
  @Field()
  @Column('varchar', {
    primary: true,
  })
  id: string;

  @Field()
  @Column({
    name: 'employee_name'
  })
  employeeName: string;

  @Field()
  @Column()
  departure: string;

  @Field()
  @Column()
  destination: string;

  @Field()
  @Column()
  price: string;

  @Field()
  @Column({ name: 'company_id' })
  companyId: string;

  @Field()
  @Column({ name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => CompanyEntity, (company) => company.travels)
  @Field(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity
}