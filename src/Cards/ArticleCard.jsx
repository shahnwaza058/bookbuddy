import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import Lend from "../Component/Assets/Book lover-pana.png";
import Borrow from "../Component/Assets/Bibliophile-pana.png";
import { MdGeneratingTokens } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const ArticleList = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.fromTo(
      "#articleHeading",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: -20,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: "#articleHeading",
          markers: false,
        },
        ease: "ease",
      }
    );
    gsap.fromTo(
      "#image-container-1",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        delay: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: "#image-container-1",
          markers: false,
        },
        ease: "ease",
      }
    );
    gsap.fromTo(
      "#text-container-1",
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        delay: 2,
        duration: 1.5,
        scrollTrigger: {
          trigger: "#text-container-1",
          markers: false,
        },
        ease: "ease",
      }
    );
    gsap.fromTo(
      "#image-container-2",
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        delay: 0.5,
        duration: 1.5,
        scrollTrigger: {
          trigger: "#image-container-2",
          markers: false,
        },
        ease: "ease",
      }
    );
    gsap.fromTo(
      "#text-container-2",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        delay: 1,
        scrollTrigger: {
          trigger: "#text-container-2",
          markers: false,
        },
        ease: "ease",
      }
    );
  }, []);
  return (
    <Container fluid className="p-5">
      <h3
        className="text-center article-heading fw-bolder ls-wide"
        id="articleHeading"
      >
        Knowledge Exchange Hub:{" "}
        <span className="fw-medium">
          <span style={{ color: "red" }}>L</span>end,{" "}
          <span style={{ color: "red" }}>B</span>orrow, Earn Tokens
        </span>
      </h3>
      <Row className=" justify-content-center  h-100">
        <Col md={6} className="d-flex position-relative">
          <div className="w-85 mr-auto mt-5" id="image-container-1">
            <Image
              src={Lend}
              alt="some good alt text"
              className="w-100"
              rounded
            />
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column pt-5 mt-5"
          id="text-container-1"
        >
          <h5 className="mt-1 fw-bold fs-5">
            <MdGeneratingTokens size={22} className="text-danger" /> Earn
            Tokens: Lend your book
          </h5>
          <p className="text-lg text-muted lh-lg">
            Share your books and earn tokens with each lending action. Grow your
            library and earn tokens that empower you to borrow more books from
            others in the community. Contribute to the exchange of knowledge
            while building your reading repertoire.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center flex-row-reverse h-100">
        <Col md={6} className="d-flex position-relative">
          <div className="w-85 mr-auto mt-5" id="image-container-2">
            <Image
              src={Borrow}
              alt="some good alt text"
              className="w-100"
              rounded
            />
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column pt-5 mt-5"
          id="text-container-2"
        >
          <h5 className="mt-1 fw-bold fs-5">
            <FaBookOpenReader size={22} className="text-danger" /> Borrow:
            Access Books with Tokens
          </h5>
          <p className="text-lg text-muted lh-lg">
            Discover a treasure trove of books using your tokens. Borrow books
            hassle-free and delve into new worlds of knowledge. Utilize tokens
            earned from lending to unlock more books for your reading pleasure.
            Expand your horizons through the power of shared learning.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleList;
