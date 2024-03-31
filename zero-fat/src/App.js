import "./App.css";
import Header from "./components/header/header.component";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewPage from "./pages/new.page/new.page.component";
import ViewPage from "./pages/view.page/view.page.componet";
import TablePage from "./pages/table.page/table.page.component";
import HomePage from "./pages/home.page/home.page.component";
import LoginPage from "./pages/login.page/login.page.component";
import UserProvider from "./components/providers/user.provider";
import MealsPage from "./pages/meals.page/meals.page.component";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/*" element={<Navigate to="/home" replace />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/view" element={<ViewPage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/meals" element={<MealsPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
