import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { Course } from "../entities/Course";
import { Category } from "../entities/Category";
import { CourseType } from '../inputTypes/courseType'
import { adminAuth } from "../authentication/auth";

@Resolver()
export class CourseResolver {
    /* 
        fetch all Courses Request
    */
    @Query(() => [Course])
    //@UseMiddleware(adminAuth)
    async fetchCourses(): Promise<Course[]> {
        return await Course.find();
    }


    /*
        find Course by _id 
    */
    @Query(() => Course!, { nullable: true })
    @UseMiddleware(adminAuth)
    async findCourseByID(
        @Arg("_id") _id: string
    ): Promise<Course | undefined | null> {
        return await Course.findOne(_id);
    }


    /* 
        Add Course Request
    */
    @Mutation(() => Course!)
    @UseMiddleware(adminAuth)
    async createCourse(
        @Arg('data') data: CourseType
    ): Promise<Course> {
        const isCourseExist = await Course.findOne({ where: { title: data.title } });
        if (isCourseExist) {
            throw new Error("Course is already exists");
        }

        const isCategoryExist = await Category.findOne(data.categoryId);

        if (!isCategoryExist) {
            throw new Error("Category not exists");
        }

        if (!data.categoryId && !data.title) {
            throw new Error("Required fields are missing");
        }
        const category = Course.create(data);
        await category.save();
        return category;
    }

    /*
        update Category
     */
    @Mutation(() => Course!)
    @UseMiddleware(adminAuth)
    async updateCourse(
        @Arg("_id") _id: string,
        @Arg('data') data: CourseType
    ): Promise<Category | null> {
        let course = await Course.findOne(_id);
        if (course) {
            course.title = data.title;
            course.description = data.description;
            course.outline = data.outline;
            course.isActive = data.isActive;
            course.isDeleted = data.isDeleted;
            // course.coursePart = data.coursePart
            course.updatedAt = new Date(new Date().getTime());
            await Course.update(_id, course);
            return course;
        }
        return null;
    }

    /* 
        delete Course byid
    */
    @Mutation(() => Course!, { nullable: true })
    @UseMiddleware(adminAuth)
    async deleteCourseByID(
        @Arg("_id") _id: string
    ): Promise<Course | undefined | null> {
        let course = await Course.findOne(_id);
        if (course) {
            course.isDeleted = true;
            course.updatedAt = new Date(new Date().getTime());
            await Course.update(_id, course);
            return course;
        }
        return null;
    }

}