import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email } = await request.json().catch(() => {
      throw new Error("Invalid JSON input");
    });
    if (!email) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ email }).select(
      "email userName verifyCode verifyCodeExpiry passwordResetTokenCode passwordResetCodeExpiry"
    );

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000);

    // Update the user with new fields
    await UserModel.updateOne(
      { email },
      {
        $set: {
          passwordResetTokenCode: verifyCode,
          passwordResetCodeExpiry: new Date(Date.now() + 600000),
        },
      }
    );

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      user.userName,
      verifyCode.toString(),
      "OtpEmail"
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Error sending email",
        },
        { status: 500 }
      );
    }
    return Response.json({
      success: true,
      message: "Verification email sent",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error sending verification email", error);
    return Response.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
