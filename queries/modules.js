import { replaceMongoIdInObject } from "@/lib/convertData";
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
    const modul = await Module.findById(moduleId).lean();
    return replaceMongoIdInObject(modul)
  } catch (err) {
    throw new Error(e)
  }
}