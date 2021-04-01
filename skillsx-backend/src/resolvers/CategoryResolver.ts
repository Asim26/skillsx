import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { Category } from "../entities/Category";
import { IS_EXISTS } from "../Utils/Constants";
import { adminAuth } from "../authentication/auth";

@Resolver()
export class CategoryResolver {
  //fetch all Categories
  @Query(() => [Category])
 // @UseMiddleware(adminAuth)
  async fetchCategories(): Promise<Category[]> {
    return await Category.find();
  }

  //Add category
  @Mutation(() => Category!)
  async createCategory(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("isActive") isActive: boolean,
    @Arg("isDeleted") isDeleted: boolean
  ): Promise<Category> {
    const isCategoryExist = await Category.findOne({ where: { title } });
    if (isCategoryExist) {
      throw new Error(IS_EXISTS);
    }
    let createdAt = Date.now();
    let updatedAt = Date.now();

    const category = Category.create({
      title,
      description,
      isActive,
      isDeleted,
      createdAt,
      updatedAt,
    });
    await category.save();
    return category;
  }

  // find Category by _id
  @Query(() => Category!, { nullable: true })
  @UseMiddleware(adminAuth)
  async findCategoryByID(
    @Arg("_id") _id: string
  ): Promise<Category | undefined | null> {
    return await Category.findOne(_id);
  }

  // find Category by title
  @Query(() => Category!)
  @UseMiddleware(adminAuth)
  async findCategoryByTitle(
    @Arg("title") title: string
  ): Promise<Category | undefined | null> {
    return await Category.findOne({ where: { title } });
  }

  //delete Category byid
  @Mutation(() => Category!, { nullable: true })
  @UseMiddleware(adminAuth)
  async deleteCategoryByID(
    @Arg("_id") _id: string
  ): Promise<Category | undefined | null> {
    let category = await Category.findOne(_id);
    if (category) {
      category.isDeleted = true;
      category.updatedAt = new Date(new Date().getTime());
      await Category.update(_id, category);
      return category;
    }
    return null;
  }

  //Activate or Deactivate Category byid
  @Mutation(() => Category!, { nullable: true })
  @UseMiddleware(adminAuth)
  async UpdateCategoryStatusByID(
    @Arg("_id") _id: string,
    @Arg("isActive") isActive: boolean
  ): Promise<Category | undefined | null> {
    let category = await Category.findOne(_id);
    if (category) {
      category.isActive = isActive;
      category.updatedAt = new Date(new Date().getTime());
      await Category.update(_id, category);
      return category;
    }
    return null;
  }

  //update Category
  @Mutation(() => Category!)
  @UseMiddleware(adminAuth)
  async updateCategory(
    @Arg("_id") _id: string,
    @Arg("description") description: string
  ): Promise<Category | null> {
    let category = await Category.findOne(_id);
    if (category) {
      category.description = description;
      category.updatedAt = new Date(new Date().getTime());
      await Category.update(_id, category);
      return category;
    }
    return null;
  }
}
