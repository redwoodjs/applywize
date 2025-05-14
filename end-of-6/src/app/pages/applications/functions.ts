"use server";

import { requestInfo } from "rwsdk/worker";
import { db } from "@/db";

export const createApplication = async (formData: FormData) => {
  try {
    const { ctx } = requestInfo;

    if (!ctx.user) {
      throw new Error("User not found");
    }

    await db.application.create({
      data: {
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
        status: {
          connect: {
            id: parseInt(formData.get("status") as string),
          },
        },
        company: {
          create: {
            name: formData.get("company") as string,
            contacts: {
              create: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                role: "Hiring Manager",
              },
            },
          },
        },
        salaryMin: formData.get("salaryMin") as string,
        salaryMax: formData.get("salaryMax") as string,
        jobTitle: formData.get("jobTitle") as string,
        jobDescription: formData.get("jobDescription") as string,
        postingUrl: formData.get("url") as string,
        dateApplied: formData.get("dateApplied") as string,
      },
    });

    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: error as Error };
  }
};
