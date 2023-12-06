import React, { useEffect, useState } from "react";
import "../Component/Style/bookmodal.css";
import { IoStarSharp } from "react-icons/io5";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../utils/Helper";
import {
  BORROW_BOOK,
  RETURN_BOOK,
  access_token,
} from "../Redux/Acttion/UserAction";
import { GET_ALL_BOOKS, GET_BORROWED_BOOKS } from "../Redux/Acttion/BookAction";
import { toast } from "react-toastify";
import ReactStars from "react-stars";
import axios from "axios";
import { ADD_RATING_URL } from "../utils/Constants";
const BookModal = ({
  isModal = false,
  ratings,
  noOfPerson,
  book,
  GET_BOOK_BY_ID,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { User, token, isAuth, loading } = useSelector((state) => state.User);
  const [starsCount, setStartCount] = useState(0);
  const [comment, setComment] = useState("");

  const handleReturnBook = async (bookId) => {
    try {
      await dispatch(RETURN_BOOK(bookId));
      dispatch(GET_BORROWED_BOOKS());
      dispatch(GET_ALL_BOOKS());
      toast.success("Return's successfully!");
      navigate("/books");
      GET_BOOK_BY_ID(book.bookId);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleBorrowBook = async (bookId) => {
    if (!isAuth) {
      toast.warning("Login first!");
      return navigate("/login");
    }
    if (token == 0) {
      return toast.warning("Insufficient Token!");
    }
    try {
      await dispatch(BORROW_BOOK(bookId));
      if (isModal) await dispatch(GET_ALL_BOOKS());
      else await GET_BOOK_BY_ID(bookId);
      await dispatch(GET_BORROWED_BOOKS());
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (starsCount == 0) {
      return toast.warning("Please rate book by stars!");
    }

    try {
      if (
        book?.currentlyBorrowedByUserId == User?.userId ||
        book?.lentByUserId == User?.userId
      ) {
        const data = await axios.post(
          ADD_RATING_URL + book.bookId,
          { rating: starsCount, comment },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        toast.success("Your review added successfully!");
        setStartCount(0);
        setComment("");
        //to update the comment
        GET_BOOK_BY_ID(book.bookId);
      } else return toast.error("Only borrower's can rate books!");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div class="border">
      <div class="book-content book-wrap ">
        <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center align-items-lg-start justify-content-lg-start">
          <div class="col-5">
            <div class="book-image m-0 p-0">
              <img
                width={"100%"}
                className="object-fit-cover m-0 p-0"
                src={book?.imageUrl}
                alt="194x228"
              />
              <span class="tag2 hot">HOT</span>
            </div>
          </div>
          <div class=" border w-100 pt-2">
            <div class="book-deatil">
              <div
                className=""
                style={{ lineHeight: "10px", fontSize: ".8rem" }}
              >
                <h6 className="fw-bold text-capitalize">{book?.bookName}</h6>
                <p className="text-muted text-capitalize">
                  Author: {book?.author}
                </p>
                <p className="text-muted text-capitalize">
                  Genre: {book?.genre}
                </p>
                {!isModal && (
                  <p className="text-muted text-capitalize">
                    Lender:{book?.lendedBy}{" "}
                  </p>
                )}
              </div>
              <p class="price-container">
                <h6
                  className={`fs-7 text-${
                    book?.isBookAvailable ? "success" : "danger"
                  } text-capitalize`}
                >
                  {book?.isBookAvailable ? "Available" : "out of stock"}
                </h6>
              </p>
            </div>
            <div class="description  w-100 text-justify">
              <h6 className="fs-5">Description:</h6>
              <p>{book?.description}</p>
            </div>
            <div class="book-info mb-2">
              <div class="d-flex align-items-center">
                {!isModal && (
                  <>
                    <ReactStars
                      count={5}
                      value={ratings}
                      edit={false}
                      size={24}
                      color2={"#dc3545"}
                    />
                    <span className="text-muted fs-8 text-capitalize">
                      {ratings?.toFixed(1)} | {noOfPerson} reviews
                    </span>
                  </>
                )}
              </div>
              {User.userId != book?.lentByUserId && (
                <>
                  {book?.isBookAvailable && (
                    <Button
                      variant="outline-dark"
                      className="w-100"
                      disabled={loading}
                      onClick={() => handleBorrowBook(book?.bookId)}
                    >
                      Borrow
                    </Button>
                  )}
                </>
              )}
              {User.userId === book?.currentlyBorrowedByUserId && (
                <Button
                  variant="outline-danger"
                  className="w-100"
                  disabled={loading}
                  onClick={() => handleReturnBook(book?.bookId)}
                >
                  Return
                </Button>
              )}
            </div>

            <div class="book-info mb-2">
              {!isModal && (
                <div
                  class="d-flex flex-column reviews w-100 h-100"
                  style={{ height: "20rem" }}
                >
                  {/* Comment button */}
                  <div class="bg-light w-100  p-2">
                    <div class="mt-2 w-100  text-right">
                      {isAuth && (
                        <div class="d-flex flex-column lh-1">
                          <span className="fs-8 fw-bold text-muted text-capitalize">
                            Rate this book
                          </span>
                          <Form onSubmit={handleSubmit}>
                            <ReactStars
                              value={starsCount}
                              onChange={(e) => setStartCount(e)}
                              half={false}
                              size={24}
                              color2={"#dc3545"}
                            />
                            <Form.Group controlId="validationCustom04">
                              <Form.Control
                                type="text"
                                className="w-100 my-2 px-2 mt-1"
                                placeholder="Write your comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                              />
                            </Form.Group>
                            <Button type="submit" variant="dark" size="sm">
                              Post comment
                            </Button>
                          </Form>
                        </div>
                      )}
                    </div>
                  </div>
                  <h5 className="fs-8 fw-bolder my-2 p-0">Ratings:</h5>

                  <div
                    class="w-100 d-flex align-items-end"
                    style={{
                      maxHeight: "20rem",
                    }}
                  >
                    <div class="d-flex w-100 comment-section">
                      <div
                        class="bg-white p-2 w-100"
                        style={{
                          maxHeight: "15rem",
                          overflowY: "scroll",
                        }}
                      >
                        <div class="d-flex flex-column w-100 flex-row user-info">
                          {book?.ratings.length > 0 ? (
                            <>
                              {[...book?.ratings].reverse().map((rating) => (
                                <div class="d-flex w-100 border rounded bg-light p-2 w-100 flex-column justify-content-start ml-2">
                                  <div className="d-flex w-100 justify-content-between w-100">
                                    <span class="d-block fw-bold">
                                      {rating?.name}
                                    </span>
                                    <div class="">
                                      <ReactStars
                                        value={rating?.rating}
                                        edit={false}
                                        size={24}
                                        color2={"#dc3545"}
                                      />
                                    </div>
                                  </div>

                                  <div class="mt-2 w-100">
                                    <p class="comment-text fs-8 lh-base text-muted">
                                      {rating?.comment}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              <p className="text-muted fw-bolder border p-5 fs-8">
                                No review available. Be the first to add your
                                review...
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
