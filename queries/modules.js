import { Module } from "@/model/module.model";


export async function create(moduleData) {
  try {
    const newModule = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(newModule))
  } catch (err) {
    throw new Error(err)
  }
}