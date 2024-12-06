// src/App.js
import React, { useState } from "react";
import { Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import Books from "./Books.jsx";
import Movies from "./Movies.jsx";
import Characters from "./Characters.jsx";
import Spinner from "./Spinner.jsx";
import "./styles/index.css";

function App() {
  const [spinnerOn, setSpinnerOn] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    // If a token is in local storage it should be removed,
    localStorage.getItem("token");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <Spinner on={spinnerOn} />
      <button id="logout" onClick={logout}>
        Logout from app
      </button>
      <div>
        <header>The Lord of the Rings API</header>
        <nav>
          <NavLink id="loginScreen" to="/">
            Login
          </NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/characters">Characters</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="*" element={<LoginPage />} /> {/*Default to LoginPage*/}
        </Routes>
      </div>
    </>
  );
}

export default App;
