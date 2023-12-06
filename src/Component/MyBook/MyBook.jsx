import React, { useEffect } from "react";
import mybook from "../Assets/mybooks.jpg";
import "../Style/mybook.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_BORROWED_BOOKS,
  GET_LENDED_BOOKS,
} from "../../Redux/Acttion/BookAction";
import Spinners from "../Spinner/Spinner";

const MyBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { borrowedBook, lendedBook, loading } = useSelector(
    (state) => state.Books
  );
  const { User } = useSelector((state) => state.User);
  const handleNavigate = (type) => {
    navigate(type);
  };
  useEffect(() => {
    dispatch(GET_LENDED_BOOKS());
    dispatch(GET_BORROWED_BOOKS());
  }, [User]);

  return (
    <div className="mybook-container mt-5 d-flex justify-content-center">
      {loading ? (
        <>
          <Spinners />
        </>
      ) : (
        <>
          <div className="container mt-3">
            <div className="mybook-header bg-danger w-100">
              {" "}
              <p
                className="d-block heading text-white p-5 fs-1 fw-bolder"
                style={{ fontSize: "2rem", letterSpacing: "10px" }}
              >
                <span className="text-danger">My</span>{" "}
                <span className="text-danger">B</span>ooks
              </p>
            </div>
            <div className="box mt-5 gap-5  d-flex flex-wrap w-100 justify-content-center">
              <div
                className="lended-book d-flex justify-content-center align-items-center rounded border"
                onClick={() => handleNavigate("lended-book")}
              >
                <span className="text-white fw-bolder fs-5">
                  Lended:{lendedBook.length}
                </span>
              </div>
              <div
                className="borrowed-book  d-flex justify-content-center align-items-center rounded border"
                onClick={() => handleNavigate("borrowed-book")}
              >
                <span className="text-white fw-bolder fs-5">
                  Borrowed:{borrowedBook.length}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBook;
