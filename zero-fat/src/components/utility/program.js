import DAYS from "../../data/days";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadProgram = (index, patients) => {
  const doc = new jsPDF("landscape", "px", "a4", "false");
  let patient = {};
  patients.map((user) => {
    if (index === patients.indexOf(user)) {
      patient = user;
      return;
    }
  });
  const data = `Patient Information:
  \n=================================================================
  \nName : ${patient.name}
  \nEmail : ${patient.email}
  \nPhone : ${patient.phone}
  \nCity : ${patient.city}
  \nDate Of Birth : ${patient.dateOfBirth}`;
  doc.text(100, 80, data);
  DAYS.map((day) => {
    bodyRows(doc, patient, day);
  });
  doc.save("patient-program");
};

function bodyRows(doc, patient, day) {
  doc.addPage();
  const meals = new Map(Object.entries(patient.patientMeals));
  var body = [];
  for (var j = 0; j < meals.get(day).length; j++) {
    const meal = meals.get(day)[j];
    body.push({
      food: meal.food,
      amount: meal.amount,
      calories: meal.calories,
      image: meal.image,
    });
  }
  autoTable(doc, {
    tableWidth: "auto",
    cellWidth: "wrap",
    columnStyles: {
      0: {
        cellWidth: 60,
      },
      1: {
        cellWidth: 57,
      },
      2: {
        cellWidth: 53,
      },
    },
    head: [
      {
        food: "Food",
        amount: "Amount",
        calories: "Calories",
        image: "Image",
      },
    ],
    body: body,
  });
}
export { downloadProgram };
