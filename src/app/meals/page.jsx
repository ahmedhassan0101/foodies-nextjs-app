import Link from "next/link";
import { Suspense } from "react";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import classes from "./page.module.css";

// MealsList is a separate async component so we can wrap it in <Suspense>.
// This lets Next.js stream the page header to the browser immediately
// while the DB fetch is still in progress.
async function MealsList() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export const metadata = {
  title: "All Meals | NextLevel Food",
  description: "Browse the delicious meals shared by our community.",
};

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <MealsList />
        </Suspense>
      </main>
    </>
  );
}
