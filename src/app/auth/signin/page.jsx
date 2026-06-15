"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardFooter, Button, Alert } from "@heroui/react";
import { Envelope, Eye, EyeSlash, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient } from "@/app/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams=useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/'
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    // Basic client-side validation
    if (!email || !password) {
      setStatus({ type: "danger", message: "Please fill in all fields." });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setStatus({ type: "danger", message: error.message || "Invalid credentials." });
      } else {
        setStatus({
          type: "success",
          message: "Signed in successfully! Redirecting...",
        });
      
        setEmail("");
        setPassword("");
        router.push(redirectTo);
       
      }
    } catch (err) {
      setStatus({ type: "danger", message: "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-900">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center justify-center">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Welcome Back
          </h1>
          <p className="text-small text-default-500">
            Enter your credentials to sign in to your account
          </p>
        </CardHeader>

        <div>
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none text-zinc-400">
                  <Envelope className="text-xl" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none text-zinc-400">
                  <ShieldKeyhole className="text-xl" />
                </div>
                <input
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  className="absolute right-3 focus:outline-none bg-transparent border-none p-1 cursor-pointer flex items-center text-zinc-400 hover:text-zinc-600"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlash className="text-xl pointer-events-none" />
                  ) : (
                    <Eye className="text-xl pointer-events-none" />
                  )}
                </button>
              </div>
            </div>

            {/* Error & Success Feedback Alerts */}
           {status.message && (
              <div 
                className={`p-3.5 rounded-xl border text-sm flex flex-col gap-0.5 shadow-sm transition-all ${
                  status.type === "danger"
                    ? "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/40 dark:border-red-900/60 dark:text-red-200"
                    : "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200"
                }`}
              >
                <span className="font-bold tracking-wide">
                  {status.type === "danger" ? "Error" : "Success"}
                </span>
                <span className="opacity-90">{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              color="primary"
              type="submit"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>

        <CardFooter className="flex justify-center border-t border-default-100 mt-4 pt-4">
          <p className="text-sm text-default-500">
            New to hireLoop?{" "}
            <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}