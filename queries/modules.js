import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.modal";
import { Module } from "@/model/module.model";


export async function create(moduleData) {
  try {
    const newModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(newModule))
  } catch (err) {
    throw new Error(err)
  }
}

export async function getModule(moduleId) {
  try {
    const modul = await Module.findById(moduleId).populate({
      path: "lessonIds",
      model: Lesson
    }).lean();
    return replaceMongoIdInObject(modul)
  } catch (err) {
    throw new Error(e)
  }
}