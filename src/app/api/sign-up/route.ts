import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/User";

import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { userName, email, password } = await request.json();
    const existingUserVerifiedByUserName = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    const existingUserByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });
    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "User Already exists with this email",
        },
        { status: 400 }
      );
    }
    if (existingUserVerifiedByUserName) {
      return Response.json(
        {
          success: false,
          message: "UserName is already taken",
        },
        { status: 400 }
      );
    }
    // const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // if (existingUserByEmail) {
    // if (existingUserByEmail.isVerified) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: "User Already exists with this email",
    //     },
    //     { status: 400 }
    //   );
    // } else {
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   existingUserByEmail.password = hashedPassword;
    //   existingUserByEmail.verifyCode = verifyCode;
    //   existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
    //   await existingUserByEmail.save();
    // }
    // } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
      verifyCode,
      isVerified: true,
      verifyCodeExpiry: expiryDate,
      isAcceptingMessage: true,
      messages: [],
    });
    console.log("newUser", newUser);
    await newUser.save();
    // }
    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      userName,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        // message: "User registerd successfullu.Please verify your email",
        message: "👏🏿👏🏻congratulations, sign up successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error regestering user",
      },
      {
        status: 500,
      }
    );
  }
}
