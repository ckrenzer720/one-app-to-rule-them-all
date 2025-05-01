import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "./FetchAPI/API";
import Spinner from "./Spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", race: "", gender: "" });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await apiClient.get("/character");
        setCharacters(response.data.docs);
        setFilteredCharacters(response.data.docs); // Initialize filtered characters
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) return <Spinner on={loading} />;
  if (!localStorage.getItem("token")) {
    alert("You need to login to view the characters...");
    return <Navigate to="/" />;
  }

  // Update filters state on input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Apply filters when the button is clicked
  const applyFilters = () => {
    const filtered = characters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesRace =
        !filters.race ||
        character.race?.toLowerCase() === filters.race.toLowerCase();
      const matchesGender =
        !filters.gender ||
        character.gender?.toLowerCase() === filters.gender.toLowerCase();

      return matchesName && matchesRace && matchesGender;
    });

    setFilteredCharacters(filtered);
  };

  // Group characters by the first letter of their names
  const groupedCharacters = filteredCharacters.reduce((groups, character) => {
    const firstLetter = character.name[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(character);
    return groups;
  }, {});

  // Settings for the carousel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For smaller screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="characters-container">
      <h2>Characters</h2>

      {/* Filter Section */}
      <div className="filter-container">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <select name="race" value={filters.race} onChange={handleFilterChange}>
          <option value="">All Races</option>
          <option value="Human">Human</option>
          <option value="Elf">Elf</option>
          <option value="Dwarf">Dwarf</option>
          <option value="Hobbit">Hobbit</option>
          {/* Add more races as needed */}
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button onClick={applyFilters} className="apply-filters-button">
          Apply Filters
        </button>
      </div>

      {/* Render Carousels */}
      {Object.keys(groupedCharacters)
        .sort() // Sort alphabetically
        .map((letter) => (
          <div key={letter} className="character-group">
            <h3>{letter}</h3>
            <Slider {...settings}>
              {groupedCharacters[letter].map((character) => (
                <div key={character._id} className="character-card">
                  <h3>{character.name}</h3>
                  <p>Race: {character.race || "Unknown"}</p>
                  <p>Gender: {character.gender || "Unknown"}</p>
                </div>
              ))}
            </Slider>
          </div>
        ))}
    </div>
  );
};

export default Characters;
