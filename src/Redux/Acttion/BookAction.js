import axios from "axios";
import {
  BOOK_URL,
  GET_ALL_BOOKS_URL,
  GET_BORROWED_BOOKS_URL,
  GET_LENDED_BOOKS_URL,
  GET_USER_TOKEN_URL,
  LEND_NEW_BOOK_URL,
} from "../../utils/Constants";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));
const access_token = user?.token;

export const GET_ALL_BOOKS = () => async (disptach) => {
  try {
    disptach({ type: "GET_ALL_BOOKS_REQUEST" });
    const data = await axios.get(GET_ALL_BOOKS_URL, {
      headers: "Content-Type:application/json",
    });
    disptach({ type: "GET_ALL_BOOKS_SUCCESS", payload: data });
  } catch (error) {
    disptach({
      type: "GET_ALL_BOOKS_FAILED",
      payload: error.message,
    });
  }
};
export const GET_BOOK_BY_ID = (id) => async (disptach) => {
  try {
    disptach({ type: "GET_BOOK_BY_ID_REQUEST" });
    const data = await axios.get(BOOK_URL + "/" + id, {
      headers: "Content-Type:application/json",
    });
    disptach({ type: "GET_BOOK_BY_ID_SUCCESS", payload: data });
  } catch (error) {
    disptach({
      type: "GET_BOOK_BY_ID_FAILED",
      payload: error.message,
    });
  }
};


export const GET_LENDED_BOOKS = () => async (disptach) => {
  try {
    disptach({ type: "GET_LENDED_BOOKS_REQUEST" });
    const data = await axios.get(GET_LENDED_BOOKS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    toast.success(data.data.message);
    disptach({ type: "GET_LENDED_BOOKS_SUCCESS", payload: data });
  } catch (error) {
    toast.error(error?.response?.data);
    disptach({
      type: "GET_LENDED_BOOKS_FAILED",
      payload: error.message,
    });
  }
};
export const GET_BORROWED_BOOKS = () => async (disptach) => {
  try {
    disptach({ type: "GET_BORROWED_BOOKS_REQUEST" });
    const data = await axios.get(GET_BORROWED_BOOKS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    toast.success(data.data.message);
    disptach({ type: "GET_BORROWED_BOOKS_SUCCESS", payload: data });
  } catch (error) {
    toast.error(error?.response?.data);
    disptach({
      type: "GET_BORROWED_BOOKS_FAILED",
      payload: error.message,
    });
  }
};
