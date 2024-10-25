"use server"

import { User } from "@/model/user-model";

export async function updateUserInfo(email, updateData) {
  try {
    const filter = { email: email };
    await User.findOneAndUpdate(filter, updateData);
  } catch (error) {
    throw new Error(error)
  }
}