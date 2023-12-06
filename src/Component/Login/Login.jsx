import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaBlog } from "react-icons/fa6";
import logo from "../Assets/logo/bookbuddy-high-resolution-logo-transparent.png";
import "../Style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_LOGIN, GET_USER_TOKEN } from "../../Redux/Acttion/UserAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  GET_BORROWED_BOOKS,
  GET_LENDED_BOOKS,
} from "../../Redux/Acttion/BookAction";
function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const { loading, isAuth } = useSelector((state) => state.User);
  const { loading: bookLoading } = useSelector((state) => state.Books);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || !userName) return setValidated(true);
    await dispatch(GET_USER_LOGIN(userName, password));
    if (!isAuth) return;
  };
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [loading]);
  return (
    <div
      className="login-container mt-5 d-flex justify-content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="form-parent rounded w-75 d-flex overflow-hidden my-3">
        <div className="left-section w-50 d-none d-lg-block ">
          <img
            className="object-fit-cover"
            src="https://img.freepik.com/premium-photo/stack-books-with-floral-pattern-cover_789916-70.jpg"
            alt=""
            width="100%"
            srcset=""
          />
        </div>
        <div className="right-section bg-light d-flex justify-content-center align-items-center px-4">
          <Form
            className="w-100"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className="mt-4">
              <img src={logo} width={120} alt="" srcset="" />
            </div>
            <div className="input-field  my-4">
              <Form.Group controlId="validationCustom04">
                <Form.Label>User Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  *User name is required.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="input-field  my-4">
              <Form.Group controlId="validationCustom04">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  *Last name is reqiured.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="input-field my-4">
              <Button
                className="w-100 text-uppercase"
                variant="dark"
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
