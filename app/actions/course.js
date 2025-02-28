"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import mongoose from "mongoose";

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

export async function updateCourse(courseId, dataToUpdate) {
  try {
    await Course.findByIdAndUpdate(courseId, dataToUpdate)
  } catch (err) {
    throw new Error(err);
  }
}

export async function changeCoursePublishState(courseId) {
  try {
    const publishCourse = await Course.findById(courseId);
    const response = await Course.findByIdAndUpdate(courseId, {
      active: !publishCourse.active
    }, { lean: true })
    return response.active;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteCourse(courseId) {
  try {
    await Course.findByIdAndDelete(courseId);
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateQuizSetForCourse(courseId, dataToUpdate) {
  try {
    const data = {};
    data["quizSet"] = new mongoose.Types.ObjectId(dataToUpdate.quizSetId);
    await Course.findByIdAndUpdate(courseId, data)
  } catch (err) {
    throw new Error(err);
  }
}