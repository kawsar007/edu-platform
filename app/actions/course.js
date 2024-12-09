"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { create } from "@/queries/courses";

export async function createCourse(data) {
  try {
    const loggedInUser = await getLoggedInUser();
    data["instructor"] = loggedInUser?.id
    const course = await create(data);
    return course;
  } catch (err) {
    throw new Error(err);
  }
}