import React, { useEffect, useRef } from "react";
import books from "../Assets/vector.png";
import "../Style/home.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ArticleList from "../../Cards/ArticleCard";
import BookCard from "../../Cards/BookCard";
import BookModal from "../../Cards/BookModal";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
const Home = () => {
  const navigate = useNavigate();
  let herocontainer = useRef();
  let herocontainerImg = useRef();
  useEffect(() => {
    gsap.to(herocontainer, 0.8, {
      opacity: 1,
      y: -20,
      delay: .5,
      ease: "ease",
    });
    gsap.to(herocontainerImg, 0.8, {
      opacity: 1,
      y: -20,
      delay: 1,
      ease: "ease",
    });
  }, []);
  return (
    <div className="home-container mt-5 mt-lg-3 pt-4">
      <Container fluid>
        <Row className="align-items-center mx-2">
          <Col
            md={6}
            className="px-3 hero-container"
            ref={(el) => {
              herocontainer = el;
            }}
          >
            <h1 className="font-weight-bold lh-sm">
              <span style={{ position: "relative", fontSize: "1.5rem" }}>
                Exchange knowledge:
              </span>
              <br />
              <p style={{ fontSize: "2rem", letterSpacing: "10px" }}>
                <span style={{ color: "red" }}>L</span>end &{" "}
                <span style={{ color: "red" }}>B</span>orrow
              </p>
            </h1>
            <p className="text-muted text-justify">
              Contribute Your Books, Uncover Insights. Borrow Books to Broaden
              Your Horizons and Deepen Understanding. Exchange Ideas and Expand
              Perspectives through Shared Learning Experiences.
            </p>
            <div className="d-flex justify-content-lg-start">
              <Button
                onClick={() => navigate("/lend-new-book")}
                variant="danger"
                className="rounded text-lg-nowrap px-4 mb-3 mb-md-0 mr-md-3"
              >
                Lend Book
              </Button>
              <Button
                variant="outline-dark"
                className="rounded text-lg-nowrap mx-2  px-4 mb-3 mb-md-0 mr-md-3"
                onClick={() => navigate("/books")}
              >
                Borrow Book
              </Button>
            </div>
          </Col>
          <Col
            md={6}
            className="image-side mt-3 d-flex justify-content-lg-end justify-content-center"
            ref={(el) => {
              herocontainerImg = el;
            }}
          >
            <Image
              className="object-fit-cover mx-0 mx-md-5"
              src={books}
              alt="Hero Image"
              fluid
            />
          </Col>
        </Row>
      </Container>
      <ArticleList />
    </div>
  );
};

export default Home;
