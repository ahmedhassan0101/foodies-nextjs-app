'use client';

// useFormStatus must live in a child of the <form> — it cannot be used
// in the same component that renders the form. It reads the pending state
// of the nearest parent form submission automatically.
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  );
}