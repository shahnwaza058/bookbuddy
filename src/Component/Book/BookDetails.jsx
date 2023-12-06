import React, { useEffect, useState } from "react";
import BookModal from "../../Cards/BookModal";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BOOK_URL } from "../../utils/Constants";
import axios from "axios";
import Spinners from "../Spinner/Spinner";

const BookDetails = () => {
  const { loading, book } = useSelector((state) => state.Books);
  const [bookData, setBookData] = useState([]);
  const [bookLoading, setLoading] = useState(false);
  const [totalRating, setTotalRating] = useState(0);
  const location = useLocation();
  const { id } = useParams();
  const GET_BOOK_BY_ID = async (id) => {
    try {
      setLoading(true);
      const data = await axios.get(BOOK_URL + "/" + id, {
        headers: "Content-Type:application/json",
      });
      setLoading(false);
      setBookData(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    GET_BOOK_BY_ID(id);
  }, [id]);
  useEffect(() => {
    if (bookData && bookData.ratings) {
      let total = 0;
      bookData.ratings.forEach((rating) => {
        total += rating.rating;
      });
      let temp = [];
      temp.push({
        count: total / bookData.ratings.length,
        noOfPerson: bookData.ratings.length,
      });
      setTotalRating(temp);
    }
  }, [bookData]);

  return (
    <div className="p-2 px-5 d-flex mt-5 justify-content-center">
      {bookLoading ? (
        <>
          <Spinners />
        </>
      ) : (
        <>
          <div className="container mt-3 d-flex justify-content-center align-items-center">
            {bookData.bookId ? (
              <BookModal
                ratings={totalRating[0]?.count}
                noOfPerson={totalRating[0]?.noOfPerson}
                GET_BOOK_BY_ID={GET_BOOK_BY_ID}
                book={bookData}
              />
            ) : (
              <>
                <p className="text-danger p-5 fs-4 text center fw-bolder f">
                  No book found !
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetails;
