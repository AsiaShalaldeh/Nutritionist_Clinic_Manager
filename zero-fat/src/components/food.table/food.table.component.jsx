import { useContext, useEffect, useState } from "react";
import AddFood from "../add.food/add.food.component";
import "./food.table.css";

const FoodTable = () => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("create");
  const [foodToEdit, setFoodToEdit] = useState({});
  const [meals, setMeals] = useState(
    JSON.parse(localStorage.getItem("meals") || "[]")
  );

  const deleteFood = (id) => {
    const newMeals = meals.filter((meal) => meal.id !== id);
    setMeals(newMeals);
    localStorage.setItem("meals", JSON.stringify(newMeals));
  };
  const addFood = () => {
    setShow(true);
    setAction("create");
  };
  const editFood = (meal) => {
    setShow(true);
    setAction("edit");
    setFoodToEdit(meal);
  };

  return (
    <div className="food-table">
      <button className="add-new" onClick={() => addFood()}>
        <img src={process.env.PUBLIC_URL + "/plus1.png"} alt="" width={20} />
        <p>Add New</p>
      </button>
      {show && (
        <AddFood
          meals={meals}
          onChange={(newMeals) => setMeals(newMeals)}
          show={(newShowValue) => setShow(newShowValue)}
          action={action}
          foodToEdit={foodToEdit}
        />
      )}
      <table className="food-table-">
        <thead>
          <tr>
            <th>Food</th>
            <th>Image</th>
            <th>Amount(g/ml)</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals?.map((meal, index) => {
            return (
              <tr key={index}>
                <td>{meal.food}</td>
                <td className="image">
                  <img src={meal.image} alt="Food" width={80} />
                </td>
                <td>{meal.amount}</td>
                <td>{meal.calories}</td>
                <td className="actions">
                  <button onClick={() => deleteFood(meal.id)}>
                    <img
                      src={process.env.PUBLIC_URL + "/trash.svg"}
                      alt=""
                      width={20}
                    />
                  </button>
                  <button onClick={() => editFood(meal)}>
                    <img
                      src={process.env.PUBLIC_URL + "/edit.png"}
                      alt=""
                      width={20}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default FoodTable;
