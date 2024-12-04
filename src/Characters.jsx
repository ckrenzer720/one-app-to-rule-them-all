// src/components/CharactersComponent.js
import React, { useState, useEffect } from "react";
import { apiClient } from "./FetchAPI/API";

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

  if (loading) return <div>Loading characters...</div>;

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
