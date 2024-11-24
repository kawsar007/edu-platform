import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';

export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).select("-password").lean();
  return replaceMongoIdInObject(user);
}

// export async function getUserDetails(userId) {
//   const user = await User.findById(userId).select("-password").lean();
//   return replaceMongoIdInObject(user);
// }

export async function getUserDetails(userId) {
  // Validate and convert userId to string if it's a Buffer
  if (Buffer.isBuffer(userId)) {
    userId = userId.toString('hex'); // Convert Buffer to hex string
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId format');
  }

  const user = await User.findById(userId).select("-password").lean();
  return replaceMongoIdInObject(user);
}

export async function validatePassword(email, password) {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(
    password,
    user.password
  );
  return isMatch;
}