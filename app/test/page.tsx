import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase.from("companies").select("*");

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Supabase Test</h1>

      {error ? (
        <pre className="mt-4 text-red-600">
          {JSON.stringify(error, null, 2)}
        </pre>
      ) : (
        <pre className="mt-4">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}