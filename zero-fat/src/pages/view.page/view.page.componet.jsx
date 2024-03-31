import FilterBar from "../../components/common/filter.bar/filter.bar.component";
import "./view.page.css";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getTotalCalories } from "../../components/utility/patients";
import { downloadProgram } from "../../components/utility/program";

const ViewPage = () => {
  const [params, setParams] = useSearchParams();
  const searchTerms = params.get("searchTerms") || "";
  const [patients, setPatients] = useState(
    JSON.parse(localStorage.getItem("patients") || "[]")
  );
  const [patientsToShow, setPatientsToShow] = useState([]);

  useEffect(() => {
    const patientsJson = localStorage.getItem("patients") || "[]";
    const allPatients = JSON.parse(patientsJson);
    setPatients(allPatients);
    const patients = [];
    allPatients.map((person) => {
      const patient = {
        name: person.name,
        totalCalories: getTotalCalories(person),
      };
      patients.push(patient);
    });
    setPatientsToShow(patients);
  }, []);

  const setParam = (name, value) => {
    const newParams = new URLSearchParams(params);

    newParams.delete(name);

    if (Array.isArray(value)) {
      value.forEach((item) => newParams.append(name, item));
    } else if (value.trim()) {
      newParams.set(name, value.trim());
    }

    setParams(newParams);
  };

  const deleteProgram = (index) => {
    setPatientsToShow(
      patientsToShow.filter(
        (patient) => patientsToShow.indexOf(patient) !== index
      )
    );
    const newPatients = patients.filter(
      (patient) => patients.indexOf(patient) !== index
    );
    setPatients(newPatients);
    localStorage.setItem("patients", JSON.stringify(newPatients));
  };

  return (
    <div>
      <FilterBar
        searchTerms={searchTerms}
        params={params}
        setParam={setParam}
      />
      <table className="programs-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Total Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientsToShow
            ?.filter((patient) => {
              let match = patient.name
                .toLowerCase()
                .includes(searchTerms.toLowerCase().trim());
              return match;
            })
            .map((patient, index) => {
              return (
                <tr key={index}>
                  <td className="names">{patient.name}</td>
                  <td>{patient.totalCalories}</td>
                  <td className="action">
                    <button onClick={() => deleteProgram(index)}>
                      <img
                        src={process.env.PUBLIC_URL + "/trash.svg"}
                        alt=""
                        width={20}
                      />
                    </button>
                    <button onClick={() => downloadProgram(index, patients)}>
                      <img
                        src={process.env.PUBLIC_URL + "/pdf.png"}
                        alt=""
                        width={20}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default ViewPage;
