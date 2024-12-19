"use server";

import { Lesson } from "@/model/lesson.modal";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";

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