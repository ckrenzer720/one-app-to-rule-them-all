// src/components/BooksComponent.js
import React, { useState, useEffect } from "react";
import { apiClient } from "./FetchAPI/API";
import Spinner from "./Spinner";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/book");
        setBooks(response.data.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const fetchChapters = async (bookId) => {
    if (chapters[bookId]) {
      // Chapters already fetched, toggle visibility
      setActiveBook((prev) => (prev === bookId ? null : bookId));
      return;
    }
    try {
      const response = await apiClient.get(`/book/${bookId}/chapter`); // Use relative path
      setChapters((prev) => ({ ...prev, [bookId]: response.data.docs })); // Update chapters state
      setActiveBook(bookId); // Set active book to show chapters
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  if (loading) return <Spinner on={loading} />;

  return (
    <div>
      <h2>Books</h2>
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.name}</h3>
          <button onClick={() => fetchChapters(book._id)}>
            {activeBook === book._id ? "Hide Chapters" : "Show Chapters"}
          </button>
          {activeBook === book._id && ( // Show chapters only for active book
            <ul>
              {(chapters[book._id] || []).map((chapter) => (
                <li key={chapter._id}>{chapter.chapterName}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Books;
