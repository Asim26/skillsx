import { makeVar } from '@apollo/client';

export const loginAccess = makeVar<any>("");

export const userId = makeVar<any>("");
export const userAccessToken = makeVar<any>("");
export const courseId = makeVar<any>("");
export const courseName = makeVar<any>("");
export const courseDescription = makeVar<any>("");