const addFood = (food, day, allMeals, map, amount) => {
  let image = "";
  let calories = 0.0;
  if (!food) {
    alert("Enter Food Name Please !!");
    return;
  }
  allMeals.map((meal) => {
    if (meal.food === food) {
      image = meal.image;
      calories = Math.round((meal.calories / meal.amount) * amount);
    }
  });
  const newMap = map;
  const oldMeals = newMap.get(day);
  if (oldMeals?.length !== 0) {
    newMap.set(day, [...oldMeals, { food, amount, image, calories: calories }]);
  } else {
    newMap.set(day, [{ food, amount, image, calories: calories }]);
  }
  localStorage.setItem("selectedMeals", JSON.stringify([...newMap]));
  return newMap;
};
const deleteFood = (index, day, map) => {
  const afterDelete = map?.get(day)?.filter((meal, ind) => ind !== index);
  const mapAfterDelete = new Map();
  map.forEach((value, key) => {
    if (key === day) {
      mapAfterDelete.set(day, afterDelete);
    } else {
      mapAfterDelete.set(key, value);
    }
  });
  localStorage.setItem("selectedMeals", JSON.stringify([...mapAfterDelete]));
  return mapAfterDelete;
};
export { addFood, deleteFood };
