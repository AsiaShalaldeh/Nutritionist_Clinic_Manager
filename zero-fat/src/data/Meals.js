const allMeals = JSON.parse(localStorage.getItem("meals") || "[]");
const MEALSNAMES = [];

allMeals.map((meal) => {
  MEALSNAMES.push(meal.food);
});

export { MEALSNAMES };
