// src/components/MoviesComponent.js
import React, { useState, useEffect } from "react";
import { apiClient } from "./FetchAPI/API";
import Spinner from "./Spinner";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/movie");
        setMovies(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading)
    return (
      <div>
        <Spinner on={loading} />
      </div>
    );

  return (
    <div>
      <h2>Movies</h2>
      {movies.map((movie) => (
        <div key={movie._id}>
          <h3>{movie.name}</h3>
          <p>Runtime: {movie.runtimeInMinutes} minutes</p>
          <p>Budget: ${movie.budgetInMillions} million</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
