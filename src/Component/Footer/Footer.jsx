import { Container, Row, Col } from "react-bootstrap";
import logo from "../Assets/logo/bookbuddy-high-resolution-logo-transparent.png";
// Assuming Logo is a component displaying your logo
const Logo = () => {
  // Your Logo component implementation
  return <img width={150} src={logo} alt="Logo" />;
};

const Footer = () => {
  return (
    <Container fluid className="py-5">
      <Row className="align-items-center">
        <Col className="d-flex align-items-center">
          <hr
            className="flex-grow-1 me-4"
            style={{ borderBottom: "1px solid #dee2e6" }}
          />
          <Logo />
          <hr
            className="flex-grow-1 ms-4"
            style={{ borderBottom: "1px solid #dee2e6" }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <p className="text-muted">
          © 2023 Shahnwaz Ansari. All rights reserved
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
