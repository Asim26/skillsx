import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { Admin } from "../entities/Admin";
import {
  SECRET_KEY,
  INCORRECT_PASSWORD,
  NOT_FOUND,
  IS_EXISTS,
} from "../Utils/Constants";

@Resolver()
export class AdminResolver {
  //all admins
  @Query(() => [Admin])
  async allAdmins(): Promise<Admin[]> {
    return await Admin.find();
  }

  //Add admin
  @Mutation(() => Admin!)
  async signUp(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("phoneNo") phoneNo: string,
    @Arg("role") role: string,
    @Arg("isActive") isActive: boolean
  ): Promise<Admin> {
    const isAdminExist = await Admin.findOne({ where: { email } });
    if (isAdminExist) {
      throw new Error(IS_EXISTS);
    }

    const hashedPassword = await hash(password, 13);
    password = hashedPassword;

    const admin = Admin.create({
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      role,
      isActive,
    });
    await admin.save();
    return admin;
  }

  //find admin byid
  @Query(() => Admin!, { nullable: true })
  async findAdminByID(
    @Arg("_id") _id: string
  ): Promise<Admin | undefined | null> {
    return await Admin.findOne(_id);
  }

  //delete admin byid
  @Mutation(() => Admin!, { nullable: true })
  async deleteAdminByID(
    @Arg("_id") _id: string
  ): Promise<Admin | undefined | null> {
    const allAdmin = await Admin;
    const admin = await allAdmin.findOne(_id);
    if (admin) {
      await allAdmin.delete(_id);
      return admin;
    }
    return null;
  }

  //update Admin
  @Mutation(() => Admin!)
  async updateAdmin(
    @Arg("_id") _id: string,
    @Arg("firstName") firstName: string, // 2
    @Arg("lastName") lastName: string,
    // @Arg("email") email: string,
    // @Arg("password") password: string,
    @Arg("phoneNo") phoneNo: string
    // @Arg("isActive") isActive: boolean
  ): Promise<Admin | null> {
    let admin = await Admin.findOne(_id);
    if (admin) {
      admin.firstName = firstName;
      admin.lastName = lastName;
      admin.phoneNo = phoneNo;

      //   const hashedPassword = await hash(password, 13);
      //   password = hashedPassword;

      //   admin.password = password;
      //   admin.isActive = isActive;
      //   admin.email = email;
      await Admin.update(_id, admin);
      return admin;
    }
    return null;
  }

  //Login With Email and Password
  @Mutation(() => Admin)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new Error(NOT_FOUND);
    }

    const verify = await compare(password, admin.password);

    if (!verify) {
      throw new Error(INCORRECT_PASSWORD);
    }

    const accessToken = sign({ adminId: admin._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    admin.accessToken = accessToken;

    return admin;
  }
}
