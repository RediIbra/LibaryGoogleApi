import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './BookDetailPage.css';

const BookDetailPage = ({ book, onBack, toggleBookmark, isBookmarked }) => {
  return (
    <div className="book-detail-page">
      <button className="back-button" onClick={onBack}>
        <FaArrowLeft /> 
      </button>

      <div className="book-detail-content">
        <div className="book-detail-header">
          <h1>{book.volumeInfo.title}</h1>
          <h2>by {book.volumeInfo.authors?.join(', ')}</h2>
          <p><strong>Published:</strong> {book.volumeInfo.publishedDate}</p>
          <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
        </div>
        <div className="book-detail-body">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt={book.volumeInfo.title}
            className="book-image"
          />
          <div className="book-description">
            <h3>Description:</h3>
            <p>{book.volumeInfo.description || 'No description available.'}</p>
          </div>
          <div className="book-actions">
            <button onClick={() => toggleBookmark(book.id, book)} className="bookmark-btn">
              {isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
