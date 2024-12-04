// src/components/BooksComponent.js
import React, { useState, useEffect } from "react";
import { apiClient } from "./FetchAPI/API";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.get("/book");
        setBooks(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const fetchChapters = async (bookId) => {
    if (chapters[bookId]) return; // Skip if chapters already loaded
    try {
      const response = await apiClient.get(`/book/${bookId}/chapter`);
      setChapters((prev) => ({ ...prev, [bookId]: response.data.docs }));
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  if (loading) return <div>Loading books...</div>;

  return (
    <div>
      <h2>Books</h2>
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.name}</h3>
          <button onClick={() => fetchChapters(book._id)}>Show Chapters</button>
          <ul>
            {(chapters[book._id] || []).map((chapter) => (
              <li key={chapter._id}>{chapter.chapterName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Books;
