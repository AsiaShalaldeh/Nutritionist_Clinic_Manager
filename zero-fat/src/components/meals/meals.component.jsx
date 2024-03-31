import { useContext, useEffect, useState } from "react";
import { addFood, deleteFood } from "../utility/meals";
import Input from "../common/input/input-component";
import Select from "../common/select/select-component";
import "./meals.css";

const Meals = (props) => {
  const [food, setFood] = useState("");
  const [amount, setAmount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [allMeals, setAllMeals] = useState([]);
  const [map, setMap] = useState(
    new Map(JSON.parse(localStorage.getItem("selectedMeals")) || props.map)
  );
  const [selectedMeals, setSelectedMeals] = useState(
    new Map(JSON.parse(localStorage.getItem("selectedMeals")) || props.map)
  );

  useEffect(() => {
    setAllMeals(JSON.parse(localStorage.getItem("meals") || "[]"));
    setSelectedMeals(
      new Map(JSON.parse(localStorage.getItem("selectedMeals")) || props.map)
    );
  }, []);

  const addMeal = () => {
    const newMap = addFood(food, props.day, allMeals, map, amount);
    setSelectedMeals(newMap);
    setFood("");
    setAmount(0);
    setMap(newMap);
    setClicked(false);
    props.onChange(newMap);
    props.setMap(newMap);
  };
  const deleteMeal = (index) => {
    const mapAfterDelete = deleteFood(index, props.day, map);
    setSelectedMeals(mapAfterDelete);
    setMap(mapAfterDelete);
    props.onChange(mapAfterDelete);
    props.setMap(mapAfterDelete);
  };

  console.log("map from Meals");
  console.log(map);
  return (
    <div className="meals">
      {selectedMeals?.get(props.day)?.map((meal, index) => {
        return (
          <div className="meal" key={index}>
            <button type="button" onClick={() => deleteMeal(index)}>
              <img src={process.env.PUBLIC_URL + "/bin.png"} alt="Delete" />
            </button>
            <div className="image">
              <img src={meal.image} alt="Food" />
            </div>
            <div className="desc">
              <p>Food : {meal.food}</p>
              <p>Amount : {meal.amount}</p>
              <p>Calories : {meal.calories}</p>
            </div>
          </div>
        );
      })}
      <div className="add-meal">
        <button onClick={() => setClicked(true)} type="button">
          <img
            src={process.env.PUBLIC_URL + "/plus.png"}
            alt="Add"
            width={100}
          />
        </button>
      </div>
      {clicked && (
        <div className="add-meal-form">
          <div className="form-header">
            <div>Add Meal</div>
            <img src={process.env.PUBLIC_URL + "/food.jpg"} alt="Add" />
          </div>
          <Select
            name="meal"
            label="Meal"
            onChange={(e) => setFood(e.target.value)}
            value={food}
            required
          >
            <option value="none">Select an option</option>
            {allMeals?.map((item, index) => {
              return (
                <option key={index} value={item.food}>
                  {item.food}
                </option>
              );
            })}
          </Select>
          <Input
            name="amount"
            label="Amount"
            type="number"
            min={0}
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
          <button className="cancel-form" onClick={() => setClicked(false)}>
            Cancel
          </button>
          <button className="add-form" type="button" onClick={addMeal}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Meals;
