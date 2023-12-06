import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "../../Cards/BookCard";
import { Form, InputGroup } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import { filterBooks } from "../../utils/Helper";
import Spinners from "../Spinner/Spinner";

const Books = () => {
  const { books, loading } = useSelector((state) => state.Books);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBook, setSearchBook] = useState([]);
  let filterBook = searchQuery && searchBook ? searchBook : books;
  useEffect(() => {
    if (searchQuery) {
      setSearchBook(filterBooks(searchQuery, books));
    }
    filterBook = searchQuery && searchBook ? searchBook : books;
  }, [searchQuery]);
  return (
    <div className="books-container mt-5 d-flex flex-column justify-content-center align-items-center w-100">
      {loading ? (
        <>
          <Spinners />
        </>
      ) : (
        <>
          <div className="search-box w-100 d-flex justify-content-center my-3">
            <InputGroup className="input-group border w-100">
              <Form.Control
                onChange={(e) => setSearchQuery(e.target.value)}
                className="m-0 p-2"
                type="text"
                placeholder="Name, Author, Genre"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
              />
              <InputGroup.Text
                id="btnGroupAddon"
                className="rounded-0 bg-danger text-white m-0 p-2"
              >
                <CiSearch color="white" size={25} />
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="container d-flex flex-wrap">
            {filterBook.length > 0 ? (
              [...filterBook]
                .reverse()
                .map((book, key) => <BookCard book={book} id={key} />)
            ) : (
              <>
                <p className="w-100 text-danger text-center fs-5 fw-bolder text-capitalize">
                  no book available !
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
