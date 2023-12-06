import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  books: [],
  lendedBook: [],
  borrowedBook: [],
  book: [],
  loading: false,
  message: "",
  error: "",
};
export const BookReducer = createReducer(initialState, {
  GET_ALL_BOOKS_REQUEST: (state) => {
    state.loading = true;
  },
  GET_ALL_BOOKS_SUCCESS: (state, action) => {
    state.loading = false;
    state.books = action.payload.data;
  },
  GET_ALL_BOOKS_FAILED: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  GET_BOOK_BY_ID_REQUEST: (state) => {
    state.loading = true;
  },
  GET_BOOK_BY_ID_SUCCESS: (state, action) => {
    state.loading = false;
    state.book = action.payload.data;
  },
  GET_BOOK_BY_ID_FAILED: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  GET_LENDED_BOOKS_REQUEST: (state) => {
    state.loading = true;
  },
  GET_LENDED_BOOKS_SUCCESS: (state, action) => {
    state.loading = false;
    state.lendedBook = action.payload.data;
  },
  GET_LENDED_BOOKS_FAILED: (state, action) => {
    state.loading = false;
    state.lendedBook = [];
  },
  GET_BORROWED_BOOKS_REQUEST: (state) => {
    state.loading = true;
  },
  GET_BORROWED_BOOKS_SUCCESS: (state, action) => {
    state.loading = false;
    state.borrowedBook = action.payload.data;
  },
  GET_BORROWED_BOOKS_FAILED: (state, action) => {
    state.loading = false;
    state.borrowedBook = [];
  },
  CLEAR_ERROR: (state) => {
    state.error = null;
    state.logouterror = null;
  },
  CLEAR_MESSAGE: (state) => {
    state.message = null;
    state.logoutmessage = null;
  },
});
