import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

const Navigation = () => {
  return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/notfound" element={<NotFoundPage/>} />
        </Routes>
  );
};

export default Navigation;
