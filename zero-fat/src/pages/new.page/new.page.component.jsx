import PatientInfo from "../../components/patient.info/patient.info.component";
import { useNavigate } from "react-router-dom";
import "./new.page.css";
import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Tabs from "../../components/common/tab/tabs.component";
import DAYS from "../../data/days";
import { UserContext } from "../../components/providers/user.provider";

const NewPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [meals, setMeals] = useState(new Map());
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user?.id) {
      navigate("/login", { replace: false });
    }
    const newMeals = new Map();
    DAYS.map((day) => newMeals.set(day, []));
    setMeals(newMeals);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const unique_id = uuid();

    const patientMeals = Object.fromEntries(meals);
    const patients = {
      id: Date.now(),
      name,
      phone: phone,
      email,
      password: unique_id.slice(0, 8),
      dateOfBirth,
      city,
      patientMeals,
      role: "PATIENT",
    };
    const patientsJson = localStorage.getItem("patients") || "[]";
    const allPatients = JSON.parse(patientsJson);

    allPatients.push(patients);
    localStorage.setItem("patients", JSON.stringify(allPatients));
    setMeals(new Map());
    e.target.reset();
    const newMeals = new Map();
    DAYS.map((day) => newMeals.set(day, []));
    setMeals(newMeals);
    localStorage.removeItem("selectedMeals");
  };

  return (
    <div>
      <form className="new-program" onSubmit={submitHandler}>
        <PatientInfo
          name={(newName) => setName(newName)}
          phone={(newPhone) => setPhone(newPhone)}
          email={(newEmail) => setEmail(newEmail)}
          dateOfBirth={(newDateOfBirth) => setDateOfBirth(newDateOfBirth)}
          city={(newCity) => setCity(newCity)}
        />
        <Tabs
          key={Date.now()}
          value={meals}
          onChange={(newMeals) => setMeals(newMeals)}
        />
        <button type="submit" className="create-program">
          Create
        </button>
      </form>
    </div>
  );
};
export default NewPage;
