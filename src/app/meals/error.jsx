"use client";

// error.js must be a Client Component — Next.js passes the error object
// and a reset() function as props so the user can retry without a full reload.
export default function MealsError({ error, reset }) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
      <button className="reset-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
