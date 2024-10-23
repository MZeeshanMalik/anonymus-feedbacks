import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: { message_id: string } }
) {
  console.log("Request to delete message", request);
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Not Authenticated",
      }),
      { status: 401 }
    );
  }

  const user: User = session.user as User;
  const userId = user._id;
  const { message_id } = params;

  console.log("Authenticated user ID:", userId);
  console.log("Message ID to delete:", message_id);

  try {
    // Find the user by their ID (without deleting them)
    const userDoc = await UserModel.findById(userId);
    if (!userDoc) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    // Check if the message exists in the user's messages array
    const originalMessageCount = userDoc.messages.length;
    userDoc.messages = userDoc.messages.filter(
      (message) => message._id.toString() !== message_id
    );

    if (userDoc.messages.length === originalMessageCount) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Message not found",
        }),
        { status: 404 }
      );
    }

    // Save the updated user document with the message removed
    await userDoc.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete message:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete message",
      }),
      { status: 500 }
    );
  }
}
