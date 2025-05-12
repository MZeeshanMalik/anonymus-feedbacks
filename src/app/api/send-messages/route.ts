import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  const { userName, content } = await request.json();
  try {
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // is user accepting the messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 401 }
      );
    }

    const newMessage = { content, createAt: new Date() };
    user.messages.push(newMessage as unknown as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message send successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("an unexpected error occured", error);
    return Response.json(
      {
        success: false,
        message: "Unknown Error",
      },
      { status: 500 }
    );
  }
}
