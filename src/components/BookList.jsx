import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetail from './BookDetail';
import Bookmark from './Bookmark';
import BookDetailPage from './BookDetailPage';
import './bookList.css';
import { FaSearch } from 'react-icons/fa';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('books'); // 'books', 'bookDetail', or 'bookmarks'
  const [selectedBook, setSelectedBook] = useState(null); // Track selected book
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) return;

      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key={YOUR API KEY}`
        );
        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  const toggleBookmark = (bookId, book) => {
    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((b) => b.id === bookId);
      if (isBookmarked) {
        return prevBookmarks.filter((b) => b.id !== bookId);
      } else {
        return [...prevBookmarks, book];
      }
    });
  };

  const removeFromBookmarks = (bookId) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((b) => b.id !== bookId));
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    if (currentPage * booksPerPage < books.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={() => setView('books')}>Books</button>
        <button onClick={() => setView('bookmarks')}>Bookmarks</button>
      </div>

      {view === 'books' && (
        <div className="centered-container">
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books..."
              className="search-bar"
            />
            <FaSearch className="search-icon" />
          </div>
          {currentBooks.length > 0 ? (
            <div className="book-list">
              {currentBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => {
                    setSelectedBook(book);
                    setView('bookDetail');
                  }}
                >
                  <BookDetail
                    book={book}
                    toggleBookmark={toggleBookmark}
                    isBookmarked={bookmarks.some((b) => b.id === book.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No books found.</p>
          )}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage * booksPerPage >= books.length}
            >
              Next
            </button>
          </div>
        </div>
      )}

{view === 'bookDetail' && selectedBook && (
        <BookDetailPage
          book={selectedBook}
          onBack={() => setView('books')}
          toggleBookmark={toggleBookmark}
          isBookmarked={bookmarks.some((b) => b.id === selectedBook.id)}
        />
      )}

      {view === 'bookmarks' && (
        <Bookmark bookmarks={bookmarks} removeFromBookmarks={removeFromBookmarks} />
      )}
    </div>
  );
};

export default BookList;
