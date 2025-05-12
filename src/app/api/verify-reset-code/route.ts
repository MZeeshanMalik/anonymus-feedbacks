import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, verifyCode } = await request.json().catch(() => {
      throw new Error("Invalid JSON input");
    });
    if (!email || !verifyCode) {
      return Response.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ email });
    console.log(user);
    // Check if the user exists
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    console.log(user.passwordResetTokenCode, verifyCode);

    // Check if the verification code is correct
    if (user.passwordResetTokenCode !== verifyCode) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }
    // Check if the verification code has expired
    if (user.passwordResetCodeExpiry < new Date()) {
      return Response.json(
        {
          success: false,
          message: "Verification code expired.",
        },
        { status: 400 }
      );
    }
    user.passwordResetTokenCode = 0;
    await user.save();
    return Response.json({
      success: true,
      message: "code verified successfully",
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
