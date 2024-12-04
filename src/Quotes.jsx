// src/components/QuotesComponent.js
import React, { useState, useEffect } from "react";
import { apiClient } from "./FetchAPI/API";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await apiClient.get("/quote");
        setQuotes(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) return <div>Loading quotes...</div>;

  return (
    <div>
      <h2>Quotes</h2>
      {quotes.map((quote) => (
        <blockquote key={quote._id}>
          <p>"{quote.dialog}"</p>
        </blockquote>
      ))}
    </div>
  );
};

export default Quotes;
