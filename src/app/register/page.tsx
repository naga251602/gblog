// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Supabase Auth handles the user creation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // You might want to redirect to a "check your email" page here if email confirmation is turned on in Supabase
      router.push("/login");
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto px-6 py-20 flex-grow flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-brand mb-2">
          Create an account
        </h2>
        <p className="text-gray-500">
          Join the community to start reading and writing.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-all shadow-sm mt-2 disabled:opacity-70"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand font-semibold hover:underline decoration-brand underline-offset-4"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
