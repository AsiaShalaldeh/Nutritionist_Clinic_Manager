import React, { useState, createContext } from "react";

export const MealContext = React.createContext(null);

const MealProvider = (props) => {
  const initialMeal = JSON.parse(localStorage.getItem("meal"));
  const [meal, setMeal] = useState(initialMeal);

  console.log("Meal Context");

  const setMealOverride = (meal) => {
    setMeal(meal);
    localStorage.setItem("meal", JSON.stringify(meal));
  };

  return (
    <MealContext.Provider value={{ meal, setMeal: setMealOverride }}>
      {props.children}
    </MealContext.Provider>
  );
};
export default MealProvider;
