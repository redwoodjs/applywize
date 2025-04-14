import { route } from "@redwoodjs/sdk/router";
import { Login } from "./Login";
import { sessions } from "@/session/store";
import { Signup } from "./Signup";

export const userRoutes = [
  route("/login", [Login]),
  route("/signup", [Signup]),
  route("/logout", async function ({ request }) {
    const headers = new Headers();
    await sessions.remove(request, headers);
    headers.set("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  }),
];
