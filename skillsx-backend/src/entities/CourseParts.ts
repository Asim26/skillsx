import { ObjectType, Field, ID } from "type-graphql";
import {
    Entity,
    BaseEntity,
    ObjectIdColumn,
    Column,
    ManyToOne,
    ObjectID,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course";

@ObjectType()
@Entity()
export class CourseParts extends BaseEntity {
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

    @Field(() => Course, { nullable: true })
    @ManyToOne(() => Course, course => course.coursePart, {
        onDelete: "CASCADE"
    })
    course: Course;

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
