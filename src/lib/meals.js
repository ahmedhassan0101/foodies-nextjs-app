// src\lib\meals.js
import slugify from "slugify";
import xss from "xss";
import crypto from "crypto";

import { connectDB } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import Meal from "@/lib/models/meal.model";

// ---------------------------------------------------------------------------
// READ
// ---------------------------------------------------------------------------

export async function getMeals() {
  await connectDB();
  // .lean() returns plain JS objects instead of Mongoose documents —
  // lighter and safe to pass from Server Components to Client Components.
  return Meal.find().lean();
}

export async function getMeal(slug) {
  await connectDB();
  return Meal.findOne({ slug }).lean();
}

// ---------------------------------------------------------------------------
// WRITE
// ---------------------------------------------------------------------------

export async function saveMeal(meal) {
  await connectDB();

  const baseSlug = slugify(meal.title, { lower: true });
  const randomHex = crypto.randomBytes(3).toString("hex");
  meal.slug = `${baseSlug}-${randomHex}`;

  // Strip any malicious HTML from instructions before storing.
  // Instructions are later rendered with dangerouslySetInnerHTML,
  // so sanitization here is essential.
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const buffer = Buffer.from(await meal.image.arrayBuffer());

  // uploadImage returns the Cloudinary secure_url, which we store in the DB.
  meal.image = await uploadImage(buffer, fileName);

  await Meal.create(meal);
}
