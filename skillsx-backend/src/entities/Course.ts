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
export class Course extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  imageUrl: string;

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

  // @Field()
  // @Column()
  // courseParts: [
  //   {
  //     title: string;
  //     description: string;
  //     outline: string;
  //     isActive: boolean;
  //     isDeleted: boolean;
  //     createdAt: Date;
  //     updatedAt: Date;
  //   }
  // ];
}
