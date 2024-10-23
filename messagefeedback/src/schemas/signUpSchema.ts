import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "username must be atleast 2 chracters")
  .max(20, "username must be no longer than 20")
  .regex(
    /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
    "username must be not contain special letter"
  );

export const signUpSchema = z.object({
  userName: usernameValidation,
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 chracters" }),
});
