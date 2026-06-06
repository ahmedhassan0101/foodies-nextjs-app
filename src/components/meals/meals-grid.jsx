import MealItem from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        // MongoDB uses _id as the unique identifier
        <li key={meal._id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}