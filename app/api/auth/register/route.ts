import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { hash } from "bcryptjs";
import { IUser, User } from "@/models/user";
import { connectDB } from "@/lib/db";

const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be of minimum 6 characters" }),
  monthlyBudget: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          msg: parsedBody.error,
        },
        { status: 400 },
      );
    }

    const { name, email, password, monthlyBudget } = parsedBody.data;

    await connectDB();

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        {
          success: false,
          msg: "User with this email already exists",
        },
        { status: 400 },
      );
    }

    const hashedPass = await hash(password, 12);

    const user: IUser = await User.create({
      name,
      email,
      password: hashedPass,
      monthlyBudget,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          msg: "Failed to register the user",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Registration successfull",
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        msg: "Something went wrong while registering",
      },
      { status: 500 },
    );
  }
}
