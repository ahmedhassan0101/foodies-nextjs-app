# 🍽️ NextLevel Food — Foodies Community App

A full-stack web application built with **Next.js 14 (App Router)** as part of Maximilian Schwarzmüller's Next.js course on Udemy.

The app allows food lovers to browse community-shared meals and contribute their own recipes with images.

---

## 🎯 Purpose

This project was built to practice and solidify core Next.js 14 concepts hands-on, going beyond theory into a real working application.

---

## ⚙️ Core Next.js Concepts Covered

- **App Router** — file-based routing with nested layouts
- **Server & Client Components** — understanding the boundary and when to use each
- **Server Actions** — handling form submissions directly on the server without an API layer
- **Dynamic Routes** — meal detail pages via `[mealSlug]`
- **Suspense & Streaming** — streaming page content while data is being fetched
- **`loading.js` / `error.js` / `not-found.js`** — built-in Next.js file conventions for UI states
- **`generateMetadata`** — static and dynamic metadata per page
- **`revalidatePath`** — invalidating the Next.js cache after a new meal is submitted
- **`next/image`** — optimized image loading
- **`useFormState` & `useFormStatus`** — managing form submission state and pending UI
- **Server-side input validation** — validating form data within the Server Action
- **XSS protection** — sanitizing user-generated content before storing
- **CSS Modules** — scoped component-level styling

---

## 🗄️ Data & Storage

The original course project used a local SQLite database and local image storage.

For production deployment, this was adapted to use:

- **MongoDB Atlas** — cloud-hosted database for meal records
- **Cloudinary** — cloud storage for meal images

This change was minimal by design — the core application logic and Next.js patterns remain unchanged.

---

## 🚀 Tech Stack

|               |                          |
| ------------- | ------------------------ |
| Framework     | Next.js 14 (App Router)  |
| Database      | MongoDB Atlas + Mongoose |
| Image Storage | Cloudinary               |
| Styling       | CSS Modules              |
| Deployment    | Vercel                   |

---

## 🛠️ Running Locally

```bash
# Install dependencies
npm install

# Add your environment variables
cp .env.local.example .env.local

# Seed the database (one-time)
node -r dotenv/config initdb.js

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```text
app/
  meals/
    [mealSlug]/   ← dynamic meal detail page
    share/        ← submit a new meal
  community/      ← community page
components/
  meals/          ← MealItem, MealsGrid, ImagePicker, FormSubmit
  main-header/    ← navigation
  images/         ← ImageSlideshow
lib/
  db.js           ← MongoDB connection
  meals.js        ← data access (getMeals, getMeal, saveMeal)
  actions.js      ← Server Action (shareMeal)
  cloudinary.js   ← image upload helper
  utils.js        ← form validation
```
