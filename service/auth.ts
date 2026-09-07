import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export interface SignupData {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
}

export interface Company {
  id: string;
  name: string;
  owner_id: string;
}

export interface Profile {
  id: string;
  company_id: string;
  full_name: string;
  email: string;
  role: string;
}

export interface SignUpResult {
  user: User;
  company?: Company;
  profile?: Profile;
}

export async function signUp(data: SignupData): Promise<SignUpResult> {
  const { companyName, fullName, email, password } = data;

  // Step 1: Create the auth user via Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log("AUTH DATA:", authData);
  console.log("SESSION:", authData.session);
  console.log("USER:", authData.user);

  if (authError) throw authError;

  // Step 2: Ensure the auth user was returned (null means email already registered)
  if (!authData.user) throw new Error("This email is already registered. Please check your inbox or try logging in.");

  // Step 3: If no session yet (e.g. email confirmation required), skip DB inserts
  if (!authData.session) {
    return { user: authData.user };
  }

  // Step 4: Session exists — extract user id from session
  const userId = authData.session.user.id;
  console.log("USER ID:", userId);

  // Step 5: Insert a new record into the companies table
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({ name: companyName, owner_id: userId })
    .select()
    .single<Company>();

  if (companyError || !company) {
    throw new Error(companyError?.message ?? "Failed to create company.");
  }

  // Step 6: Insert a record into the profiles table using the new company id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      company_id: company.id,
      full_name: fullName,
      email,
      role: "Owner",
    })
    .select()
    .single<Profile>();

  if (profileError || !profile) {
    throw new Error(profileError?.message ?? "Failed to create profile.");
  }


  // Step 7: Return structured result
  return { user: authData.user, company, profile };
}

export async function getCurrentUser(): Promise<{ user: User; profile: Profile; company: Company } | null> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (profileError || !profile) return null;

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("id", profile.company_id)
    .single<Company>();

  if (companyError || !company) return null;

  return { user, profile, company };
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}