// src\lib\actions.js
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { saveMeal } from "@/lib/meals";
import { validateMealInput } from "@/lib/utils";

// The 'use server' directive marks every exported function in this file
// as a Server Action — they run on the server and can be passed directly
// to a <form action={...}> prop.

/**
 * Handles the "share a meal" form submission.
 *
 * Signature (prevState, formData) is required by useFormState:
 *  - prevState → last value returned by this action (unused, but required)
 *  - formData  → submitted form fields, provided automatically by React
 */

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
  };

  const { hasErrors, errors } = validateMealInput(meal);
  if (hasErrors) return { errors };

  try {
    await saveMeal(meal);
  } catch {
    return { errors: { form: "Something went wrong. Please try again." } };
  }

  // Bust the Next.js cache for the meals listing so the new meal
  // appears immediately without waiting for the next deployment.
  revalidatePath("/meals");
  redirect("/meals");
}
