"use server";

import { Lesson } from "@/model/lesson.modal";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";
import mongoose from "mongoose";

export async function createLessons(data) {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = data.get("order");

    const createdLesson = await create({ title, slug, moduleId, order })

    const courseModule = await Module.findById(moduleId);
    courseModule.lessonIds.push(createdLesson?._id);
    courseModule.save();
    return createdLesson;

  } catch (err) {
    throw new Error(err);
  }
}

export async function reOrderLesson(data) {
  try {
    await Promise.all(data.map(async (element) => {
      await Lesson.findByIdAndUpdate(element.id, { order: element.position })
    }))
  } catch (err) {
    throw new Error(err)
  }
}

export async function updateLesson(lessonId, data) {
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (err) {
    throw new Error(err);
  }
}

export async function changeLessonPublishState(lessonId) {
  try {
    const lesson = await Lesson.findById(lessonId);
    const response = await Lesson.findByIdAndUpdate(lessonId, {
      active: !lesson.active,
    }, { lean: true });
    return response?.active;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteLesson(lessonId, moduleId) {
  try {
    const findModule = await Module.findById(moduleId);
    findModule.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    await Lesson.findByIdAndDelete(lessonId);
    findModule.save();
  } catch (error) {
    throw new Error(error);
  }
}