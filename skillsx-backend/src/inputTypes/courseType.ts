import { InputType, Field } from 'type-graphql'
import { CoursePartType } from './coursePartTypes';

@InputType()
export class CourseType {

    @Field({ nullable: true })
    _id: string

    @Field({ nullable: true })
    categoryId: string

    @Field()
    title: string

    @Field()
    description: string

    @Field()
    outline: string

    @Field()
    isActive: boolean

    @Field()
    isDeleted: boolean

    @Field(() => [CoursePartType])
    coursePart: CoursePartType[]

    @Field({ nullable: true })
    createdAt: Date

    @Field({ nullable: true })
    updatedAt: Date
}
