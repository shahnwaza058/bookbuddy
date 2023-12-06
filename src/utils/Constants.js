const BASE_URL = "https://localhost:7204/api/v1/";
export const BOOK_URL = BASE_URL + "Books";
export const RATING_URL = BASE_URL + "Ratings";
export const USER_LOGIN_URL = BASE_URL + "User/login";
export const GET_USER_TOKEN_URL = BASE_URL + "User/";
export const USER_LOGOUT_URL = BASE_URL + "User/logout";
export const GET_ALL_BOOKS_URL = BOOK_URL;
export const LEND_NEW_BOOK_URL = BOOK_URL + "/lend";
export const GET_LENDED_BOOKS_URL = BASE_URL + "User/books-lended";
export const GET_BORROWED_BOOKS_URL = BASE_URL + "User/books-borrowed";
export const BORROW_BOOK_URL = BOOK_URL + "/borrow/";
export const RETURN_BOOK_URL = BOOK_URL + "/return/";
export const ADD_RATING_URL = RATING_URL + "/";
