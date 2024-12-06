// src/components/CharactersComponent.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "./FetchAPI/API";
import Spinner from "./Spinner";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await apiClient.get("/character");
        setCharacters(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) return <Spinner on={loading} />;
  if (!localStorage.getItem("token")) {
    alert("You must login to view the library...");
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Characters</h2>
      {characters.map((character) => (
        <div key={character._id}>
          <h3>{character.name}</h3>
          <p>Race: {character.race || "Unknown"}</p>
          <p>Gender: {character.gender || "Unknown"}</p>
        </div>
      ))}
    </div>
  );
};

export default Characters;
