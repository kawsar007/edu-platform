"use server";

import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/modules";
import * as mongoose from 'mongoose';


export async function createModule(data) {
  console.log("Action Data ---> ", data);

  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const courseId = data.get("courseId");
    const order = data.get("order");

    const createdModule = await create({ title, slug, course: courseId, order });

    const course = await Course.findById(courseId);
    course.modules.push(createdModule._id);
    course.save();

    return createdModule;

  } catch (err) {
    throw new Error(err)
  }
}

export async function reOrderModules(data) {
  console.log(data);

  try {
    await Promise.all(
      data.map(async (element) => {
        await Module.findByIdAndUpdate(element.id, { order: element.position });
      })
    )
  } catch (error) {
    throw new Error(error)
  }
}

export async function updateModule(moduleId, data) {
  try {
    await Module.findByIdAndUpdate(moduleId, data);
  } catch (err) {
    throw new Error(err);
  }
}

export async function changeModulePublishState(moduleId) {
  try {
    const publishModule = await Module.findById(moduleId);
    const response = await Module.findByIdAndUpdate(moduleId, {
      active: !publishModule.active
    }, { lean: true })
    return response.active;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteModule(moduleId, courseId) {
  try {
    const course = await Course.findById(courseId);
    course.modules.pull(new mongoose.Types.ObjectId(moduleId));
    course.save();
    await Module.findByIdAndDelete(moduleId);
  } catch (err) {
    throw new Error(err);
  }
}