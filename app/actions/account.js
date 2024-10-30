"use server"

import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateUserInfo(email, updateData) {
  try {
    const filter = { email: email };
    await User.findOneAndUpdate(filter, updateData);
  } catch (error) {
    throw new Error(error)
  }
}

export async function changePassword(email, oldPassword, newPassword) {
  const isMatch = await validatePassword(email, oldPassword);

  if (!isMatch) {
    throw new Error("Please enter a valid current password");
  }

  const filter = { email: email };

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  const dataToUpdate = {
    password: hashedPassword
  }

  try {
    await User.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath('/account')
  } catch (error) {
    throw new Error(error);
  }
};

export async function updateContactInfo(email, phone, url) {
  console.log(url);
  
  const filter = { email: email };
  const dataToUpdate = {
    phone: phone,
    social_media: {
      facebook: url.facebook,
      twitter: url.twitter,
      linkedin: url.linkedin,
      instagram: url.instagram
    }
  }
  try {
    await User.findOneAndUpdate(filter, dataToUpdate);
  } catch (error) {
    throw new Error(error)
    console.log(error);
    
  }
}