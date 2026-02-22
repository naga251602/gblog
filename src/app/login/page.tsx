// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh(); // Refresh the server components to reflect auth state
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-md mx-auto px-6 py-20 flex-grow flex flex-col justify-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-brand mb-2">
          Welcome back
        </h2>
        <p className="text-gray-500">
          Enter your details to access your account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

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
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="#"
              className="text-xs font-medium text-gray-500 hover:text-brand transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-all shadow-sm mt-2 flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            "Logging in..."
          ) : (
            <>
              Log in <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-brand font-semibold hover:underline decoration-brand underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
