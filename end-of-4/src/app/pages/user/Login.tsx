"use client";

import { useState, useTransition } from "react";
import { link } from "@/app/shared/links";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  finishPasskeyLogin,
  finishPasskeyRegistration,
  startPasskeyLogin,
  startPasskeyRegistration,
} from "./functions";
import { useTurnstile } from "@redwoodjs/sdk/turnstile";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertTitle } from "@/app/components/ui/alert";
import { AlertCircle } from "lucide-react";

// >>> Replace this with your own Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();
  const turnstile = useTurnstile(TURNSTILE_SITE_KEY);

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      setResult("Login successful!");
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  return (
    <AuthLayout>
      <div className="auth-form max-w-[400px] w-full mx-auto px-10">
        <h1 className="page-title text-center">Login</h1>
        <p className="py-6">Enter your username below to sign-in.</p>

        {result && (
        <Alert variant="destructive" className="mb-5">
          <AlertCircle className="h-4 w-4"/>
          <AlertTitle>{result}</AlertTitle>
        </Alert>
        )}

        <div className="absolute top-0 right-0 p-10">
          <a href={link("/user/signup")} className="font-display font-bold text-black text-sm underline underline-offset-8 hover:decoration-primary">
            Register
          </a>
        </div>
        <div ref={turnstile.ref} />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Button onClick={handlePerformPasskeyLogin} disabled={isPending} className="font-display w-full mb-6">
          {isPending ? <>...</> : "Login with passkey"}
        </Button>

        <p>By clicking continue, you agree to our <a href={link("/legal/terms")}>Terms of Service</a> and <a href={link("/legal/privacy")}>Privacy Policy</a>.</p>
      </div>
    </AuthLayout>
  );
}
