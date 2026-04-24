"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
    return undefined;
  } catch (error: any) {
    if (error instanceof AuthError) {
      if (error.cause?.err?.message === "ROLE_MISMATCH") {
        return "Role tidak cocok. Anda mencoba masuk dengan hak akses yang salah.";
      }
      switch (error.type) {
        case "CredentialsSignin":
          return "Email atau sandi tidak cocok.";
        default:
          return "Terjadi kendala saat login. Coba lagi.";
      }
    }
    // AuthError dari NextAuth membungkus custom Error di error.cause?.err
    if (error.message === "ROLE_MISMATCH") {
        return "Role tidak cocok. Anda mencoba masuk dengan hak akses yang salah.";
    }
    throw error;
  }
}
