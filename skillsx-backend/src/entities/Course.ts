import { ObjectType, Field, ID, } from "type-graphql";
import {
  Entity,
  BaseEntity,
  ObjectIdColumn,
  Column,
  ObjectID,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { CourseParts } from "./CourseParts"
@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  outline: string;

  @Field()
  @Column()
  isActive: boolean;

  @Field()
  @Column()
  isDeleted: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Field()
  @Column()
  categoryId: string;

  @Field(() => [CourseParts], { nullable: true })
  @OneToMany(() => CourseParts, coursePart => coursePart.course,
    { cascade: true }
  )
  coursePart: CourseParts[];

}
