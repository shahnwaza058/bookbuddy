import axios from "axios";
import {
  BORROW_BOOK_URL,
  GET_USER_DETAILS_URL,
  GET_USER_TOKEN_URL,
  LEND_NEW_BOOK_URL,
  RETURN_BOOK_URL,
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
} from "../../utils/Constants";
import { toast } from "react-toastify";
import { GET_BORROWED_BOOKS, GET_LENDED_BOOKS } from "./BookAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const headers = {
  headers: "Content-Type:application/json",
};
const user = JSON.parse(localStorage.getItem("user"));
export const access_token = user?.token;
export const GET_USER_LOGIN = (userName, password) => async (disptach) => {
  try {
    disptach({ type: "GET_USER_LOGIN_REQUEST" });
    const data = await axios.post(
      USER_LOGIN_URL,
      { userName, password },
      headers
    );
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("userToken", data.data.tokensAvailable);
    toast.success(data.data.message);
    disptach({ type: "GET_USER_LOGIN_SUCCESS", payload: data });
    window.location.href = "/";
  } catch (error) {
    toast.error(error?.response?.data);
    disptach({ type: "GET_USER_LOGIN_FAILED" });

  }
};
export const GET_USER_TOKEN = (id) => async (disptach) => {
  try {
    disptach({ type: "GET_USER_TOKEN_REQUEST" });
    const data = await axios.get(GET_USER_TOKEN_URL + id, headers);
    localStorage.setItem("userToken", data.data.tokensAvailable);
    disptach({ type: "GET_USER_TOKEN_SUCCESS", payload: data });
  } catch (error) {
    toast.error(error?.response?.data);
  }
};
export const GET_USER_LOGOUT = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_LOGOUT_REQUEST" });
    const data = await axios.post(USER_LOGOUT_URL, {}, headers);
    localStorage.removeItem("user");
    toast.success(data.data.message);
    dispatch({ type: "GET_USER_LOGOUT_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({ type: "GET_USER_LOGOUT_FAILED" });
  }
};
export const BORROW_BOOK = (bookId, userId) => async (disptach) => {
  try {
    disptach({ type: "BORROW_BOOK_REQUEST" });
    const data = await axios.put(
      BORROW_BOOK_URL + bookId,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    localStorage.setItem("userToken", data.data.tokens);
    toast.success(data.data.message);
    disptach({ type: "BORROW_BOOK_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    disptach({
      type: "BORROW_BOOK_FAILED",
      payload: error.message,
    });
  }
};

export const RETURN_BOOK = (bookId) => async (disptach) => {
  try {
    disptach({ type: "RETURN_BOOK_REQUEST" });
    const data = await axios.put(
      RETURN_BOOK_URL + bookId,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    disptach({ type: "RETURN_BOOK_SUCCESS", payload: data });
  } catch (error) {
    toast.error(error?.response?.data);

    disptach({
      type: "RETURN_BOOK_FAILED",
      payload: error.message,
    });
  }
};
export const LEND_NEW_BOOK =
  (bookName, author, genre, description, ImageUrl) => async (disptach) => {
    try {
      disptach({ type: "LEND_NEW_BOOK_REQUEST" });
      const data = await axios.post(
        LEND_NEW_BOOK_URL,
        { bookName, author, genre, description, ImageUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      localStorage.setItem("userToken", data.data.tokens);

      toast.success(data.data.message);
      disptach({ type: "LEND_NEW_BOOK_SUCCESS", payload: data });
      // disptach(GET_ALL_BOOKS());
    } catch (error) {
      toast.error(error?.response?.data);

      disptach({
        type: "LEND_NEW_BOOK_FAILED",
        payload: error.message,
      });
    }
  };
