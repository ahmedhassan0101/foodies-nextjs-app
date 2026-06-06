"use client";

import { useFormState } from "react-dom";

import ImagePicker from "@/components/meals/image-picker";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { shareMeal } from "@/lib/actions";
import classes from "./page.module.css";

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { errors: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" />
            </p>
          </div>

          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>

          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" />
          </p>

          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" rows="10" />
          </p>

          <ImagePicker label="Your image" name="image" />

          {/* Render whichever field error exists, or the generic form error */}
          {state.errors && (
            <p className={classes.error}>
              {state.errors.form ||
                state.errors.title ||
                state.errors.summary ||
                state.errors.instructions ||
                state.errors.creator ||
                state.errors.creator_email ||
                state.errors.image}
            </p>
          )}

          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
