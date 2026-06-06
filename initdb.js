/**
 * initdb.js — one-time seed script (run locally, never on Vercel)
 *
 * What it does:
 * 1. Reads each dummy meal image from /public/
 * 2. Uploads it to Cloudinary under the "foodies" folder in parallel
 * 3. Inserts the meal record into MongoDB with the Cloudinary URL
 *
 * Usage:
 * node initdb.js
 *
 * Run once. Re-running will skip meals whose title already exists.
 */

const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const slugify = require("slugify");
require("dotenv").config({ path: ".env.local" });

// ── Cloudinary config ───────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Mongoose schema (inline — no need to import the app model) ──────────────
const mealSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  summary: String,
  instructions: String,
  image: String,
  creator: String,
  creator_email: String,
});
const Meal = mongoose.models.Meal || mongoose.model("Meal", mealSchema);

// ── Dummy data ───────────────────────────────────────────────────────────────
const dummyMeals = [
  {
    title: "Juicy Cheese Burger",
    imageFile: "burger.jpg",
    summary:
      "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
    instructions: `1. Prepare the patty:\n   Mix 200g of ground beef with salt and pepper. Form into a patty.\n\n2. Cook the patty:\n   Heat a pan with oil. Cook for 2-3 minutes each side until browned.\n\n3. Assemble the burger:\n   Toast the bun halves. Add lettuce, tomato, the patty, and a slice of cheese.\n\n4. Serve:\n   Complete with the top bun and serve hot.`,
    creator: "John Doe",
    creator_email: "johndoe@example.com",
  },
  {
    title: "Spicy Curry",
    imageFile: "curry.jpg",
    summary:
      "A rich and spicy curry, infused with exotic spices and creamy coconut milk.",
    instructions: `1. Chop vegetables:\n   Cut your choice of vegetables into bite-sized pieces.\n\n2. Sauté vegetables:\n   In a pan with oil, sauté until they start to soften.\n\n3. Add curry paste:\n   Stir in 2 tablespoons of curry paste and cook for a minute.\n\n4. Simmer with coconut milk:\n   Pour in 500ml of coconut milk. Simmer for 15 minutes.\n\n5. Serve:\n   Enjoy with rice or bread.`,
    creator: "Max Schwarz",
    creator_email: "max@example.com",
  },
  {
    title: "Homemade Dumplings",
    imageFile: "dumplings.jpg",
    summary:
      "Tender dumplings filled with savory meat and vegetables, steamed to perfection.",
    instructions: `1. Prepare the filling:\n   Mix minced meat, shredded vegetables, and spices.\n\n2. Fill the dumplings:\n   Place filling in the center of each wrapper. Fold and seal the edges.\n\n3. Steam the dumplings:\n   Arrange in a steamer. Steam for about 10 minutes.\n\n4. Serve:\n   Enjoy hot with a dipping sauce of your choice.`,
    creator: "Emily Chen",
    creator_email: "emilychen@example.com",
  },
  {
    title: "Classic Mac n Cheese",
    imageFile: "macncheese.jpg",
    summary:
      "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `1. Cook the macaroni:\n   Boil according to package instructions until al dente.\n\n2. Prepare cheese sauce:\n   Melt butter, whisk in flour, gradually add milk until thickened. Stir in grated cheese.\n\n3. Combine:\n   Mix cheese sauce with drained macaroni.\n\n4. Bake:\n   Top with breadcrumbs and bake until golden.\n\n5. Serve:\n   Serve hot, garnished with parsley.`,
    creator: "Laura Smith",
    creator_email: "laurasmith@example.com",
  },
  {
    title: "Authentic Pizza",
    imageFile: "pizza.jpg",
    summary:
      "Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.",
    instructions: `1. Prepare the dough:\n   Knead pizza dough and let it rise until doubled.\n\n2. Shape and add toppings:\n   Roll out the dough, spread tomato sauce, add toppings and cheese.\n\n3. Bake:\n   Bake at 220°C for 15-20 minutes.\n\n4. Serve:\n   Slice hot and top with fresh basil.`,
    creator: "Mario Rossi",
    creator_email: "mariorossi@example.com",
  },
  {
    title: "Wiener Schnitzel",
    imageFile: "schnitzel.jpg",
    summary:
      "Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.",
    instructions: `1. Prepare the veal:\n   Pound veal cutlets to an even thickness.\n\n2. Bread the veal:\n   Coat in flour, dip in beaten eggs, then coat in breadcrumbs.\n\n3. Fry:\n   Heat oil in a pan and fry until golden brown on both sides.\n\n4. Serve:\n   Serve hot with lemon and a side of potato salad or greens.`,
    creator: "Franz Huber",
    creator_email: "franzhuber@example.com",
  },
  {
    title: "Fresh Tomato Salad",
    imageFile: "tomato-salad.jpg",
    summary:
      "A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.",
    instructions: `1. Prepare the tomatoes:\n   Slice fresh tomatoes and arrange on a plate.\n\n2. Add herbs:\n   Sprinkle chopped basil, salt, and pepper.\n\n3. Dress:\n   Drizzle with olive oil and balsamic vinegar.\n\n4. Serve:\n   Enjoy as a side dish or light meal.`,
    creator: "Sophia Green",
    creator_email: "sophiagreen@example.com",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

async function uploadToCloudinary(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "foodies",
    public_id: publicId,
    overwrite: false,
  });
  return result.secure_url;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const seedPromises = dummyMeals.map(async (meal) => {
      try {
        const exists = await Meal.findOne({ title: meal.title });
        if (exists) {
          console.log(`⏭  Skipping "${meal.title}" (already exists)`);
          return;
        }

        const slug = slugify(meal.title, { lower: true });

        const imagePath = path.join(__dirname, "public", meal.imageFile);
        const imageUrl = await uploadToCloudinary(imagePath, slug);

        console.log(`☁️  Uploaded image for "${meal.title}"`);

        await Meal.create({
          title: meal.title,
          slug,
          summary: meal.summary,
          instructions: meal.instructions,
          image: imageUrl,
          creator: meal.creator,
          creator_email: meal.creator_email,
        });

        console.log(`🍽  Inserted "${meal.title}"`);
      } catch (mealError) {
        console.error(
          `❌ Failed to process "${meal.title}":`,
          mealError.message,
        );
      }
    });

    // الانتظار حتى تنتهي جميع الوجبات
    await Promise.all(seedPromises);
  } catch (dbError) {
    console.error("❌ Database connection failed:", dbError);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log("✅ Disconnected from MongoDB. Seeding complete.");
    }
    process.exit(0);
  }
}

seed();
