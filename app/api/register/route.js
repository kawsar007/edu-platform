import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { firstName, lastName, email, password, userRole } = await request.json();

  console.log(firstName, lastName, email, password, userRole);

  await dbConnect();

  // Check Duplicate email
  const existingUser = await User.findOne({ email });
  if(existingUser) {
    return new NextResponse("User already exists", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };

  console.log(newUser);

  try {
    await User.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}