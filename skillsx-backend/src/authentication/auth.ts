import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "./context";
import { USER_SECRET_KEY, ADMIN_SECRET_KEY } from '../Utils/Constants';

export const userAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("Not Authenticated");
    }
    // Set Bearer
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, USER_SECRET_KEY);
        context.payload = payload as any;
    } catch (err) {
        throw new Error("Not Authenticated Exception");
    }
    return next();
};

export const adminAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("Not Authenticated");
    }
    // Set Bearer
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, ADMIN_SECRET_KEY);
        context.payload = payload as any;
    } catch (err) {
        console.log(err)
        throw new Error("Not Authenticated Exception");
    }
    return next();
};
