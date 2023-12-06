import React, { useEffect } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import "../Component/Style/bookcard.css";
import BookModal from "./BookModal";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BookCard = ({ book, id }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  const handleModal = () => {
    setModalShow(!modalShow);
  };
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      `#book-grid-${id}`,
      { opacity:0,y:50 },
      {
        opacity: 1,
        y:0,
        delay: .5,
        duration: .5,
        scrollTrigger: {
          trigger: `#book-grid-${id}`,
          markers: false,
        },
        ease:"sine"
      }
    );
  }, []);

  return (
    <Row>
      <div class="book-grid" style={{ width: "13rem" }} id={`book-grid-${id}`}>
        <div class="book-image w-100" style={{ height: "18rem" }}>
          <a class="image">
            <img
              width={"100%"}
              className="object-fit-cover"
              src={book?.imageUrl}
            />
          </a>
          <Button
            className="book-link w-75"
            size="sm"
            variant="danger"
            onClick={handleModal}
          >
            Quick View
          </Button>
        </div>
        <div className="p-2 w-100">
          <div
            className="d-flex book-name justify-content-between"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/book/${book?.bookId}`)}
          >
            <h6 className="fs-8 p-0">{book?.bookName}</h6>

            <h6
              className={`fs-8 p-0 text-${
                book?.isBookAvailable ? "success" : "danger text-underline"
              } text-capitalize`}
            >
              {book?.isBookAvailable ? "Available" : "out of stock"}
            </h6>
          </div>
          <p className="fs-8 p-0 m-0 text-elipse text-muted text-capitalize">
            Author: {book?.author}
          </p>
          <p className="fs-8 p-0 m-0 text-muted text-capitalize">
            Genre: {book?.genre}
          </p>
          {/* Stars */}
        </div>
      </div>
      <div className="model">
        <Modal show={modalShow} onHide={handleModal}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <BookModal isModal={true} book={book} />
          </Modal.Body>
        </Modal>
      </div>
    </Row>
  );
};

export default BookCard;
