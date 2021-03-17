import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { sign } from 'jsonwebtoken'
import { compare, hash } from "bcryptjs";
import { User } from "../entities/User";
import {
  SECRET_KEY, INCORRECT_PASSWORD, NOT_FOUND,
  IS_EXISTS
} from '../Utils/Constants';

@Resolver()
export class UserResolver {
  //all users
  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return await User.find();
  }

  //Add user
  @Mutation(() => User!)
  async registerUser(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("phoneNo") phoneNo: string,
    @Arg("isActive") isActive: boolean
  ): Promise<User> {
    const isUserExist = await User.findOne({ where: { email } });
    if (isUserExist) { throw new Error(IS_EXISTS); }

    const hashedPassword = await hash(password, 13)
    password = hashedPassword

    const user = User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNo,
      isActive
    });
    await user.save(); 
    return user
  }

  //find user byid
  @Query(() => User!, { nullable: true })
  async findUserByID(
    @Arg("_id") _id: string
  ): Promise<User | undefined | null> {
    return await User.findOne(_id);
  }

  //delete user byid
  @Mutation(() => User!, { nullable: true })
  async deleteUserByID(
    @Arg("_id") _id: string
  ): Promise<User | undefined | null> {
    const allUser = await User;
    const user = await allUser.findOne(_id);
    if (user) {
      await allUser.delete(_id);
      return user;
    }
    return null;
  }

  //update user
  @Mutation(() => User!)
  async updateUser(
    @Arg("_id") _id: string,
    @Arg("firstName") firstName: string, // 2
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("phoneNo") phoneNo: string,
    @Arg("isActive") isActive: boolean
  ): Promise<User | null> {
    let user = await User.findOne(_id);
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.phoneNo = phoneNo;

      const hashedPassword = await hash(password, 13)
      password = hashedPassword

      user.password = password;
      user.isActive = isActive;
      user.email = email;
      await User.update(_id, user);
      return user;
    }
    return null;
  }

  //Login With Email and Password
   @Mutation(() => User)
   async loginUser(@Arg("email") email: string,
   @Arg("password") password: string) {
     const user = await User.findOne({ where: { email } });
     if (!user) { throw new Error(NOT_FOUND); }
 
     const verify = await compare(password, user.password);
 
     if (!verify) { throw new Error(INCORRECT_PASSWORD); }
 
     const accessToken = sign({ userId: user._id }, SECRET_KEY, {
       expiresIn: '1d',
     })
     user.accessToken = accessToken

     return user
   }
}
