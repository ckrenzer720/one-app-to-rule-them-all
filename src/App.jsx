// src/App.js
import React, { useState } from "react";
import { Router, Routes, Route, NavLink } from "react-router-dom";
import Books from "./Books.jsx";
import Movies from "./Movies.jsx";
import Characters from "./Characters.jsx";
import Quotes from "./Quotes.jsx";
import Spinner from "./Spinner.jsx";
import "./styles/index.css";

function App() {
  return (
    <>
      <Spinner on={spinnerOn} />
      <div>
        <header>The Lord of the Rings API</header>
        <nav>
          <NavLink to="/">Books</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/characters">Characters</NavLink>
          <NavLink to="/quotes">Quotes</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
