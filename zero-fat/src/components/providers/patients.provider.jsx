import React, { useState } from "react";
import { useEffect } from "react";

export const PeopleContext = React.createContext(null);

const PatientsProvider = (props) => {
  const initialPatients = JSON.parse(localStorage.getItem("patients" || "[]"));
  const [patients, setPatients] = useState(initialPatients);

  const setPatientsOverride = (patients) => {
    setPatients(patients);
    localStorage.setItem("patients", JSON.stringify(patients));
  };

  return (
    <PatientsContext.Provider
      value={{ patients, setPatients: setPatientsOverride }}
    >
      {props.children}
    </PatientsContext.Provider>
  );
};
export default PatientsProvider;
