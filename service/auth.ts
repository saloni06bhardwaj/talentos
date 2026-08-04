import { supabase } from "@/lib/supabase";

export interface SignupData {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export async function signUp(data: SignupData) {
  // 1. Create auth user
  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

  if (authError) throw authError;

  if (!authData.user) {
    throw new Error("Unable to create user.");
  }

  return authData.user;
}