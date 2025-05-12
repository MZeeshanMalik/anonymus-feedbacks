import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not Authenticated" }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user?._id);
  try {
    const userFromDB = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    console.log("userFromDB is " + userFromDB);
    if (!userFromDB || userFromDB.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messages: userFromDB[0].messages }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Adding messages", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
