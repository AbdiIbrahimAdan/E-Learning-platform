import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import useUserStore from '../../store/userStore'; // Make sure the store is being used correctly
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const { books, fetchBooks } = useUserStore();

  useEffect(() => {
    if (!books.length) {
      fetchBooks(); // Fetch books if not already loaded
    }
  }, [books, fetchBooks]);

  const selectedBook = books.find((book) => book._id === id);

  // If no book is found, display a message
  if (!selectedBook) {
    return (
      <div className="book-detail-container">
        <h2>Book Not Found</h2>
        <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
      </div>
    );
  }

  // Log the entire selectedBook to check the structure
  console.log("Selected Book Data:", selectedBook);

  const countryStats = selectedBook.countryStats || [];

  // Verify if countryStats exists and its structure
  console.log("Country Stats from selectedBook:", countryStats);

  const countryData = {
    labels: countryStats.length ? countryStats.map((c) => c.country || 'Unknown') : ['Unknown'],
    datasets: [
      {
        data: countryStats.length ? countryStats.map((c) => c.count || 0) : [0],
        backgroundColor: ['#1abc9c', '#2ecc71', '#f1c40f', '#e67e22', '#e74c3c'],
      },
    ],
  };

  // Gender data for Pie chart (to ensure gender data works as expected)
  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: selectedBook.genderStats || [30, 50, 20], // Mock data if not available
        backgroundColor: ['#3498db', '#e74c3c', '#9b59b6'],
      },
    ],
  };

  return (
    <div className="book-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <br/>
      <br/>
      <div className="book-detail">
        <img src={selectedBook.imageUrl} alt={selectedBook.title} className="book-detail-image" />
        <div className="book-info">
          <h1 className="book-title">{selectedBook.title}</h1>
          <p className="book-description">{selectedBook.description}</p>
        </div>
      </div>
      <div className="book-visualizations">
        <div className="visualization-section">
          <h2>Gender Statistics</h2>
          <div className="chart-container">
            <Pie data={genderData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="visualization-section">
          <h2>Country Statistics</h2>
          <div className="chart-container">
            {countryStats.length > 0 ? (
              <Pie data={countryData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p>No country statistics available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
