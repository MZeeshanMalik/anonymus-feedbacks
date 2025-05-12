import { resend } from "@/lib/resend";

import VerificationEmail, { OtpEmail } from "../../emails/verificationEmails";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
  template: string = "VerificationEmail"
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "message app verification code ",
      react:
        template === "VerificationEmail"
          ? VerificationEmail({ username, otp: verifyCode })
          : OtpEmail({ username, otp: verifyCode }),
      // react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "verification email send successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
