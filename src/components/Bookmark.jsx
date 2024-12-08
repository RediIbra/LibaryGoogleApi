import React from 'react';
import { AiFillStar } from 'react-icons/ai';


const Bookmark = ({ bookmarks, removeFromBookmarks }) => {
  return (
    <div className="bookmark-list">
      <h2>Your Bookmarks</h2>
      {bookmarks.length > 0 ? (
        bookmarks.map((book) => (
          <div className="bookmark-item" key={book.id}>
            {book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={`Cover of ${book.volumeInfo.title}`}
                className="bookmark-cover"
              />
            ) : (
              <p>No cover available</p>
            )}
            <h3 className="bookmark-title">{book.volumeInfo.title}</h3>
            <p className="bookmark-authors">{book.volumeInfo.authors?.join(', ')}</p>
            <button
              className="remove-button"
              onClick={() => removeFromBookmarks(book.id)}
            >
              <AiFillStar size={20} color="gold" />
              Remove from Bookmarks
            </button>
          </div>
        ))
      ) : (
        <p>No books bookmarked yet.</p>
      )}
    </div>
  );
};

export default Bookmark;
