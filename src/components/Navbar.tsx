import { Container, Nav, Navbar as NavbarTS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <NavbarTS className="bg-white shadow-sm mb-4">
      <Container>
        <Nav className="d-flex justify-content-between w-100">
          <Nav.Link to="/" as={NavLink}>
            FactWise Assessment
          </Nav.Link>
          <div>
            <a
              href="https://github.com/Harshsanas/factwise_frontend_assessment"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                style={{ color: "black", fontSize: "24px" }}
              />
            </a>
          </div>
        </Nav>
      </Container>
    </NavbarTS>
  );
}
