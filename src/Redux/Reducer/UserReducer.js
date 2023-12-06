import { createReducer } from "@reduxjs/toolkit";
const userData = JSON.parse(localStorage.getItem("user"));
const tokensAvailable = localStorage.getItem("userToken");
const initialState = {
  User: userData ? userData : [],
  token: tokensAvailable ? tokensAvailable : 0,
  loading: false,
  isAuth: userData ? true : false,
};

export const UserReducer = createReducer(initialState, {
  GET_USER_LOGIN_REQUEST: (state) => {
    state.loading = true;
  },
  GET_USER_LOGIN_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuth = true;
    state.User = action.payload.data;
    state.token = action.payload.data.tokensAvailable;
  },
  GET_USER_LOGIN_FAILED: (state, action) => {
    state.loading = false;
    state.isAuth = false;
  },
  GET_USER_LOGOUT_REQUEST: (state) => {
    state.loading = true;
  },
  GET_USER_LOGOUT_SUCCESS: (state, action) => {
    state.loading = false;
    state.isAuth = false;
    state.token = null;
    state.User = [];
  },
  GET_USER_LOGOUT_FAILED: (state, action) => {
    state.loading = false;
  },
  GET_USER_TOKEN_REQUEST: (state) => {
    state.tokenLoader = true;
  },
  GET_USER_TOKEN_SUCCESS: (state, action) => {
    state.tokenLoader = false;
    state.token = action.payload.data.tokensAvailable;
  },
  GET_USER_TOKEN_FAILED: (state, action) => {
    state.tokenLoader = false;
  },
  LEND_NEW_BOOK_REQUEST: (state) => {
    state.loading = true;
  },
  LEND_NEW_BOOK_SUCCESS: (state, action) => {
    state.loading = false;
    state.token = action.payload.data.tokens;
  },
  LEND_NEW_BOOK_FAILED: (state, action) => {
    state.loading = false;
    state.lendedBook = [];
  },
  BORROW_BOOK_REQUEST: (state) => {
    state.loading = true;
  },
  BORROW_BOOK_SUCCESS: (state, action) => {
    state.loading = false;
    state.token = action.payload.data.tokens;
  },
  BORROW_BOOK_FAILED: (state, action) => {
    state.loading = false;
  },
  RETURN_BOOK_REQUEST: (state) => {
    state.loading = true;
  },
  RETURN_BOOK_SUCCESS: (state, action) => {
    state.loading = false;
  },
  RETURN_BOOK_FAILED: (state, action) => {
    state.loading = false;
  },
});
