// src\lib\models\meal.model.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary secure_url
  creator: { type: String, required: true },
  creator_email: { type: String, required: true },
});

// Prevent model re-compilation during Next.js hot reload in development
const Meal = mongoose.models.Meal || mongoose.model("Meal", mealSchema);

export default Meal;
