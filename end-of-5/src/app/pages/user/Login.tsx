"use client";

import { useState, useTransition } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { finishPasskeyLogin, startPasskeyLogin } from "./functions";
import { useTurnstile } from "@redwoodjs/sdk/turnstile";
import { Button } from "@/app/components/ui/button";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { link } from "@/app/shared/links";
import { Alert, AlertTitle } from "@/app/components/ui/alert";
import { AlertCircle } from "lucide-react";

// >>> Replace this with your own Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = "0x4AAAAAABCpUSmzOt7TgetS";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();
  const turnstile = useTurnstile(TURNSTILE_SITE_KEY);

  const passkeyLogin = async () => {
    const options = await startPasskeyLogin();
    const login = await startAuthentication({ optionsJSON: options });
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      window.location.href = link('/');
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  return (
    <AuthLayout>
      <div className="absolute top-0 right-0 p-10">
        <a href={link('/user/signup')} className="font-display font-bold text-black text-sm underline underline-offset-8 hover:decoration-primary">
          Register
        </a>
      </div>

      <div className="auth-form max-w-[400px] px-10">
        <h1 className="page-title text-center">Login</h1>
        <p className="py-6">Enter your username below to sign-in.</p>

        {result && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>{result}</AlertTitle>
          </Alert>
        )}

        <div ref={turnstile.ref} />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Button onClick={handlePerformPasskeyLogin} disabled={isPending} className="font-display w-full mb-6">
          {isPending ? <>...</> : "Login with Passkey"}
        </Button>

        <p>By clicking continue, you agree to our <a href={link('/legal/terms')}>Terms of Service</a> and <a href={link('/legal/privacy')}>Privacy Policy</a>.</p>
      </div>
    </AuthLayout>
  );
}