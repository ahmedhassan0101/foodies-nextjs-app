/**
 * Validates meal form fields submitted via the Server Action.
 * Returns { hasErrors, errors } so the Server Action can return
 * inline field errors to the client via useFormState.
 */
export function validateMealInput(meal) {
  const errors = {};

  if (!meal.title?.trim())        errors.title        = 'Title is required.';
  if (!meal.summary?.trim())      errors.summary      = 'Summary is required.';
  if (!meal.instructions?.trim()) errors.instructions = 'Instructions are required.';
  if (!meal.creator?.trim())      errors.creator      = 'Your name is required.';

  if (!meal.creator_email?.trim() || !meal.creator_email.includes('@')) {
    errors.creator_email = 'A valid email address is required.';
  }

  if (!meal.image || meal.image.size === 0) {
    errors.image = 'Please pick a meal image.';
  }

  return { hasErrors: Object.keys(errors).length > 0, errors };
}