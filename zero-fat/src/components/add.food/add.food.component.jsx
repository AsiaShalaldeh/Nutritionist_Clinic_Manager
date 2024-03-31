import { useState } from "react";
import Input from "../common/input/input-component";
import "./add.food.css";

const AddFood = (props) => {
  const [food, setFood] = useState("");
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState(0);
  const [calories, setCalories] = useState(0.0);

  const submitHandler = (e) => {
    e.preventDefault();

    const meal = {
      id: Date.now(),
      food,
      image,
      amount,
      calories,
    };

    const mealJson = localStorage.getItem("meals") || "[]";
    const allMeal = JSON.parse(mealJson);

    allMeal.push(meal);
    props.onChange(allMeal);

    localStorage.setItem("meals", JSON.stringify(allMeal));

    props.show(false);
  };

  const updateFood = () => {
    const newMeal = {
      id: props.foodToEdit.id,
      food: food || props.foodToEdit.food,
      image: image || props.foodToEdit.image,
      amount: amount || props.foodToEdit.amount,
      calories: calories || props.foodToEdit.calories,
    };
    console.log(newMeal);
    const newMeals = [];
    props.meals.map((meal) => {
      if (meal.id === newMeal.id) {
        newMeals.push(newMeal);
      } else {
        newMeals.push(meal);
      }
    });
    props.onChange(newMeals);
    localStorage.setItem("meals", JSON.stringify(newMeals));
    props.show(false);
  };
  return (
    <div>
      <form className="add-food" onSubmit={submitHandler}>
        <Input
          label="Food"
          name="food"
          onChange={(e) => setFood(e.target.value)}
          required
        />
        <Input
          label="Image"
          name="image"
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Input
          label="Amount"
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Input
          label="Calories"
          name="calories"
          onChange={(e) => setCalories(e.target.value)}
          required
        />
        {props.action === "create" ? (
          <button type="submit" className="create">
            Create
          </button>
        ) : (
          <button type="button" className="update" onClick={updateFood}>
            Update
          </button>
        )}
        <button
          type="button"
          className="cancel"
          onClick={() => props.show(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default AddFood;
