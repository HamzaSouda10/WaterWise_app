import React, { useState } from "react";
import axios from "axios";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const callbackUrl = "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsPending(true);
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.status === 200) {
        window.location.href = callbackUrl;
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
<div className="w-full min-h-screen bg-green-50 flex items-center justify-center p-6 md:p-12">
    
  <section className="w-full max-w-xl flex justify-center">
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full"
    >

        <h1 className="text-2xl md:text-4xl font-bold text-green-800 font-serif text-center mb-4">
          Log in
        </h1>

          <label
            htmlFor="email"
            className="block text-gray-900 text-xs font-medium mb-2"
          >
            Email
          </label>
          <div className="relative mb-6">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>

          <label
            htmlFor="password"
            className="block text-gray-900 text-xs font-medium mb-2"
          >
            Password
          </label>
          <div className="relative mb-6">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          <button
            type="submit"
            disabled={isPending}
            aria-disabled={isPending}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Log in <ArrowRightIcon className="h-5 w-5" />
          </button>

          <div
            className="flex h-8 items-center mt-4 space-x-2"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-700 hover:text-green-900 font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};
