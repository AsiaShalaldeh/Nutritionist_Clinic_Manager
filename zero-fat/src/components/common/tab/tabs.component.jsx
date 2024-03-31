import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import DAYS from "../../../data/days";
import Meals from "../../meals/meals.component";
import { getCaloriesPerDay, getMealsPerDay } from "../../utility/patients";
import "./tab.css";

const Tabs = (props) => {
  const [dayToShow, setDayToShow] = useState("Saturday");
  const [map, setMap] = useState(
    new Map(JSON.parse(localStorage.getItem("selectedMeals")) || props.map)
  );
  const [params, setParams] = useSearchParams();
  const selectedDay = params.get("mealsDay") || "Saturday";

  useEffect(() => {
    setMap(
      new Map(JSON.parse(localStorage.getItem("selectedMeals")) || props.map)
    );
  }, []);

  const toggleTab = (index, day) => {
    setDayToShow(selectedDay);
    setParam("mealsDay", day.trim());
  };

  const setParam = (name, value) => {
    const newParams = new URLSearchParams(params);
    newParams.set(name, value.trim());
    setParams(newParams);
  };

  console.log("map from Tabs");
  console.log(map);
  return (
    <div className="container">
      <div className="tabs">
        {DAYS.map((day, index) => {
          return (
            <div
              key={index}
              className={`tab ${selectedDay === day ? "active" : ""}`}
              onClick={() => toggleTab(index, day)}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="tabs-content">
        {DAYS.map((day, index) => {
          if (day === selectedDay) {
            return (
              <Meals
                key={index}
                map={map}
                day={selectedDay}
                onChange={props.onChange}
                setMap={(e) => setMap(e)}
              />
            );
          }
        })}
        <div className="data">
          <div>
            Total Calories ({selectedDay}) :{" "}
            {getCaloriesPerDay(selectedDay, map)} 
          </div>
          <div>Number of Meals : {getMealsPerDay(selectedDay, map)}</div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
