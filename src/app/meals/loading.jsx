import classes from './loading.module.css';

// Next.js automatically renders this component as a fallback
// for the entire /meals route segment while any async data is loading.
// It works alongside the <Suspense> in page.js — the Suspense fallback
// covers the MealsList component specifically, while this file covers
// the full page during initial navigation.
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}