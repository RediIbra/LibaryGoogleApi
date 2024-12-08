import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import "./bookList.css"

const BookDetail = ({ book, toggleBookmark, isBookmarked }) => {
  return (
    <div className="book-item" key={book.id}>
      {book.volumeInfo.imageLinks ? (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={`Cover of ${book.volumeInfo.title}`}
          className="book-cover"
        />
      ) : (
        <p>No cover available</p>
      )}
      <h3 className="book-title">{book.volumeInfo.title}</h3>
      <p className="book-authors">{book.volumeInfo.authors?.join(', ')}</p>
      <button
        className="bookmark-button"
        onClick={() => toggleBookmark(book.id, book)}
      >
        {isBookmarked ? (
          <AiFillStar size={20} color="gold" />
        ) : (
          <AiOutlineStar size={20} />
        )}
        {isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
      </button>
    </div>
  );
};

export default BookDetail;