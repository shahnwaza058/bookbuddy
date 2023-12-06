import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../Style/bookcard.css";
import { FiUploadCloud } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_BOOKS,
  GET_LENDED_BOOKS,
} from "../../Redux/Acttion/BookAction";
import { toast } from "react-toastify";
import { GET_USER_TOKEN, LEND_NEW_BOOK } from "../../Redux/Acttion/UserAction";
import { useNavigate } from "react-router-dom";

const LendBook = () => {
  const [validated, setValidated] = useState();
  const [BookName, SetBookName] = useState("");
  const [AuthorName, SetAuthorName] = useState("");
  const [Genre, SetGenre] = useState("");
  const [Description, setDescription] = useState("");
  const [BookImageUrl, SetBookImageUrl] = useState("");
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.Books);
  const { User } = useSelector((state) => state.User);
  const checkImageUrl = (url) => {
    const imageExtensions = /\.(jpeg|jpg|gif|png|svg)$/;

    return imageExtensions.test(url);
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !BookName ||
      !AuthorName ||
      !Genre ||
      !Description ||
      !checkImageUrl(BookImageUrl)
    )
      return setValidated(true);
    try {
      await dispatch(
        LEND_NEW_BOOK(BookName, AuthorName, Genre, Description, BookImageUrl)
      );

      await dispatch(GET_LENDED_BOOKS());
      await dispatch(GET_ALL_BOOKS());
      navigate("/books");
    } catch (error) {
      // Handle errors if any
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="lendbook-parent mt-5">
      <div className="container w-75">
        <div className="book-form   d-flex justify-content-center flex-column align-items-center">
          <h3 className="text-white">Add Book</h3>
          <Form
            className="border p-5 bg-light rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="newbook-form  gap-2 flex-column-reverse flex-lg-row">
              <Col md={6}>
                <h3 className="text-center text-capitalize fw-bold text-decoration-underline"></h3>
                <div className="form-field d-flex flex-column flex-wrap w-100">
                  <div className="d-flex gap-2 justify-content-between">
                    <div className="">
                      <Form.Group controlId="validationCustom04">
                        <Form.Label>Book Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Book Name"
                          value={BookName}
                          onChange={(e) => SetBookName(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          *Book name is required.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="input-field">
                      <Form.Group controlId="validationCustom04">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Author Name"
                          required
                          value={AuthorName}
                          onChange={(e) => SetAuthorName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          *Author name is reqiured.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="input-field">
                    <Form.Group controlId="validationCustom04">
                      <Form.Label>Genre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Genre"
                        required
                        value={Genre}
                        onChange={(e) => SetGenre(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        *Genre is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="input-field">
                    <Form.Group controlId="validationCustom04">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Write Book Description..."
                        rows={5}
                        required
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        *Book description is reqiured
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="book-image d-flex flex-column align-items-center justify-content-center w-100">
                  <div className="image-box bg-white border d-flex justify-content-center flex-column align-items-center">
                    {BookImageUrl ? (
                      <>
                        <img
                          width={"100%"}
                          height={"100%"}
                          className="object-fit-contain"
                          src={BookImageUrl}
                          alt="book"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-light rounded-pill p-2 bg-danger">
                          <FiUploadCloud size={30} />
                        </span>
                      </>
                    )}
                  </div>
                  <div className="input-field align-self-start flex-1 w-100">
                    <Form.Group controlId="validationCustom04">
                      <Form.Label>Image url</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="Image Url"
                        required
                        value={BookImageUrl}
                        onChange={(e) => SetBookImageUrl(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        *Valid ImageUrl is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="input-field mt-2">
              <Button
                className="w-100 text-uppercase"
                variant="dark"
                type="submit"
                disabled={loading}
              >
                Add
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LendBook;
