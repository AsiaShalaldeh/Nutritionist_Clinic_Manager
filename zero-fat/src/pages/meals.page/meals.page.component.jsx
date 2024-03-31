import { useContext } from "react";
import { UserContext } from "../../components/providers/user.provider";
import DAYS from "../../data/days";
import "./meals.page.css";

// This page will appear only for Ptients

const MealsPage = () => {
  const userContext = useContext(UserContext);
  const meals = new Map(Object.entries(userContext.user?.patientMeals));

  return (
    <div className="patient-page">
      {DAYS.map((day, index) => {
        return (
          meals.get(day).length > 0 && (
            <div className="main" key={index}>
              <div className="day">{day}</div>
              <div className="meals">
                {meals?.get(day)?.map((meal, index) => {
                  return (
                    <div className="meal" key={index}>
                      <img src={meal.image} alt="Food" />
                      <div className="desc">
                        <p>Food : {meal.food}</p>
                        <p>Amount : {meal.amount}</p>
                        <p>Calories : {meal.calories}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
export default MealsPage;
