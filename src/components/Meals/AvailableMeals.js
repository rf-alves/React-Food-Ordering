import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-http-cb0da-default-rtdb.firebaseio.com/meals.json"
        );
        const responseData = await response.json();
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoading(false);
        console.log("There was an error", error);
      }
    };
    fetchMeals();
  }, []);

  if (httpError) {
    return (
      <section className={classes.MealsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.MealsError}>
        <p>LOADING...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
