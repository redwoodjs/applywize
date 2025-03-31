"use client";

import { useState, useTransition } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import {
  finishPasskeyLogin,
  startPasskeyLogin
} from "./functions";
import { useTurnstile } from "@redwoodjs/sdk/turnstile";
import { Button } from "@/app/components/ui/button";

// >>> Replace this with your own Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = "0x4AAAAAABCpUSmzOt7TgetS";

export function Login() {
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
      setResult("Login successful!");
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  return (
    <main className="bg-bg">
      <h1 className="text-4xl font-bold text-red-500">YOLO</h1>
      <div ref={turnstile.ref} />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Button onClick={handlePerformPasskeyLogin} disabled={isPending}>
        {isPending ? <>...</> : "Login with passkey"}
      </Button>
      {result && <div>{result}</div>}
    </main>
  );
}
