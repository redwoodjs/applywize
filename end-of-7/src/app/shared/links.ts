import { defineLinks } from "@redwoodjs/sdk/router";

export const link = defineLinks([
  "/",
  "/user/login",
  "/user/signup",
  "/user/logout",
  "/legal/privacy",
  "/legal/terms",
  "/applications",
  "/applications/new",
  "/applications/:id",
]);
