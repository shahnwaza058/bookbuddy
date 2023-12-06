import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_BORROWED_BOOKS,
  GET_LENDED_BOOKS,
} from "../../Redux/Acttion/BookAction";
import Spinners from "../Spinner/Spinner";
import BootstrapTable from "../../utils/BootstrapTable";

const BookList = () => {
  const { type } = useParams();
  const [listType, setListType] = useState(type);
  const dispatch = useDispatch();
  const { loading, borrowedBook, lendedBook } = useSelector(
    (state) => state.Books
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (type === "borrowed-book" || type === "lended-book") {
      setListType(type);
    } else navigate("/");
  }, []);
  useEffect(() => {
    dispatch(GET_LENDED_BOOKS());
    dispatch(GET_BORROWED_BOOKS());
  }, []);
  return (
    <div className="booklist-container mt-5 d-flex justify-content-center">
      {loading ? (
        <>
          <Spinners />
        </>
      ) : (
        <div className="container">
          {listType === "borrowed-book" ? (
            <>
              <BootstrapTable type={type} listOfBooks={borrowedBook} />
            </>
          ) : listType === "lended-book" ? (
            <>
              <BootstrapTable type={type} listOfBooks={lendedBook} />
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;
