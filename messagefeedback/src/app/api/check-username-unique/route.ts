import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/User";
import { z } from "zod";

import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  userName: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      userName: searchParams.get("userName"),
    };
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().userName?._errors || [];
      return Response.json(
        {
          succes: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(" ,")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }
    const { userName } = result.data;

    const existingVerifiedUserName = await UserModel.findOne({
      userName,
      isVerified: true,
    });

    if (existingVerifiedUserName) {
      return Response.json(
        {
          succes: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        succes: true,
        message: "Username is unique",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking Username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
