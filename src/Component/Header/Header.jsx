import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  NavDropdown,
  Navbar,
  NavbarToggle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "../Style/header.css";
import { IoHome } from "react-icons/io5";
import { FaBookOpenReader } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { BiLibrary, BiLogInCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo/bookbuddy-high-resolution-logo-transparent.png";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER_LOGOUT,
  GET_USER_TOKEN,
} from "../../Redux/Acttion/UserAction";
import { GiToken } from "react-icons/gi";
const Header = () => {
  const { User, isAuth, token } = useSelector((state) => state.User);
  const { borrowedBook, lendedBook } = useSelector((state) => state.Books);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(GET_USER_LOGOUT());
  };
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isBooks = location.pathname === "/books";
  const isMybooks = location.pathname === "/mybook";
  const isLendBooks = location.pathname === "/lend-new-book";
  const isLogin = location.pathname === "/login";

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary"
    >
      <Container>
        <Link to="/" className="mx-2">
          <img src={logo} width={130} alt="" srcset="" />
        </Link>
        {!isAuth ? (
          <>
            <NavbarToggle />
          </>
        ) : (
          <>
            <NavbarToggle style={{ border: "none", outline: "none" }}>
              <Avatar
                sx={{ background: "#dc3545" }}
                children={User?.name[0]}
              ></Avatar>
            </NavbarToggle>
          </>
        )}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex w-100 justify-content-between">
            <div
              className={`navbar-nav left flex-start justify-content-center ${
                !isAuth && "w-100"
              }`}
            >
              <div className="d-flex  w-100 flex-lg-row flex-sm-column">
                <Link className={`nav-link ${isHome ? "active" : ""}`} to="/">
                  <IoHome className="text-danger" />
                  Home
                </Link>

                <Link
                  className={`nav-link ${isBooks ? "active" : ""}`}
                  to="/books"
                >
                  <FaBookOpenReader className="text-danger" />
                  Books
                </Link>
                {isAuth && (
                  <Link
                    className={`nav-link ${isMybooks ? "active" : ""}`}
                    to="/mybook"
                  >
                    <GiBookshelf className="text-danger" />
                    My Book
                  </Link>
                )}
                {isAuth && (
                  <Link
                    className={`nav-link ${isLendBooks ? "active" : ""}`}
                    to="/lend-new-book"
                  >
                    <BiLibrary className="text-danger" />
                    Lend New Book
                  </Link>
                )}
              </div>
            </div>

            <div className="navbar-nav right d-flex justify-content-center align-items-center">
              {isAuth ? (
                <>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="text-center text-md-white">
                      Hi, {User?.name}
                      <Badge className="mx-1" pill bg="danger">
                        <span title="Aavailable token" id="t-1">
                          {token} <GiToken />
                        </span>{" "}
                      </Badge>
                    </span>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    color="white"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    className={`nav-link ${
                      isLogin ? "active" : ""
                    } d-flex justify-content-center align-items-center`}
                    to="/login"
                  >
                    <BiLogInCircle className="text-danger" />
                    Login
                  </Link>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
