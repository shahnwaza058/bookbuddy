import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null; // This is a small helper component and doesn't render anything
};

export const getBookById = (books, bookId) => {
  return books.find((book) => book?.bookId == bookId);
};

export const filterBooks = (searchQuery, books) => {
  const query = searchQuery.toLowerCase();
  const filterBooks = books?.filter((book) => {
    return (
      book?.bookName?.toLowerCase().includes(query) ||
      book?.author?.toLowerCase().includes(query) ||
      book?.genre?.toLowerCase().includes(query)
    );
  });

  return filterBooks;
};
