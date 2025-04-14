import { defineScript } from "@redwoodjs/sdk/worker";
import { db, setupDb } from "../db";

export default defineScript(async ({ env }) => {
  setupDb(env);

  const createApplication = async () => {
    await db.application.create({
      data: {
        user: {
          connect: {
            id: "bf971d31-ee62-4b3d-af0f-b0ae92baf7d9"
          },
        },
        status: {
          connect: {
            id: 1,
          }
        },
        company: {
          create: {
            name: "RedwoodSDK",
            contacts: {
              create: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                role: "Hiring Manager",
              },
            },
          }
        },
        salaryMin: "100000",
        salaryMax: "120000",
        jobTitle: "Software Engineer",
        jobDescription: "Software Engineer",
        postingUrl: "https://redwoodjs.com",
        dateApplied: new Date(),
      }
    });
  };

  await createApplication();

  console.log("🌱 Finished seeding");
});