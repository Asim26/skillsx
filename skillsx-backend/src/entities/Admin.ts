import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  ObjectIdColumn,
  Column,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Admin extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  accessToken: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  phoneNo: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
