import { useEffect, useContext, useState } from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";
import Input from "../../components/common/input/input-component";
import { UserContext } from "../../components/providers/user.provider";
import { USERS } from "../../data/users";
import HomePage from "../home.page/home.page.component";
import "./login.page.css";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (email && password) {
      const doctor = loginDoctor(email, password);
      const patient = loginPatient(email, password);
      if (doctor) {
        userContext.setUser(doctor);
        navigate("/new", { replace: true });
      } else if (patient) {
        userContext.setUser(patient);
        navigate("/home", { replace: true });
      } else {
        alert("Email or Password are not correct! Please try again.");
      }
    }
  };
  const loginDoctor = (email, password) => {
    const doctor = USERS.find(
      (user) => user.email === email && user.password === password
    );
    return doctor || null;
  };
  const loginPatient = (email, password) => {
    const patientsJson = localStorage.getItem("patients") || "[]";
    const allPatients = JSON.parse(patientsJson);
    const patient = allPatients.find(
      (user) => user.email === email && user.password === password
    );
    return patient || null;
  };
  return (
    <div className="login-page">
      <HomePage page="login" />
      <form onSubmit={handleLogin}>
        <h1>Welcome</h1>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <div>
          <button type="submit" className="login">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
