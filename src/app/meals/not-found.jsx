// Next.js renders this page automatically when notFound() is called
// anywhere within the /meals route segment.
export default function MealsNotFound() {
  return (
    <main className="not-found">
      <h1>Meal not found</h1>
      <p>Unfortunately, we could not find the requested page or meal data.</p>
    </main>
  );
}