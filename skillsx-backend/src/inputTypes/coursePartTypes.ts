import { InputType, Field } from 'type-graphql'

@InputType()
export class CoursePartType {

    @Field({ nullable: true })
    _id: string

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

    @Field({ nullable: true })
    createdAt: Date

    @Field({ nullable: true })
    updatedAt: Date
}
