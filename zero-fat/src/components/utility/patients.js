const getTotalCalories = (patient) => {
  let totalCalories = 0;
  const meals = new Map(Object.entries(patient.patientMeals));
  meals.forEach((value, key) => {
    if (value?.length !== 0) {
      value.map((meal) => {
        totalCalories += meal.calories;
      });
    }
  });

  return totalCalories;
};

const getCaloriesPerDay = (selectedDay, allMeals) => {
  let totalCalories = 0;
  const meals = allMeals.get(selectedDay);
  meals?.map((dayMeals, index) => {
    totalCalories += dayMeals.calories;
  });
  return totalCalories;
};
const getMealsPerDay = (selectedDay, allMeals) => {
  const meals = allMeals.get(selectedDay);
  return meals ? meals.length : 0;
};

export { getTotalCalories, getCaloriesPerDay, getMealsPerDay };
