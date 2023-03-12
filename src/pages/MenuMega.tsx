import { Col, Container, Nav,NavLink} from "react-bootstrap";
import { Link } from "react-router-dom";

interface props {
  children: React.ReactNode;
}

export function MenuMega({ children }: props) {
  
  return (
    <Container fluid style={{ padding: "50px" }} >
      <Col>
        <Nav fill variant="tabs" defaultActiveKey="/loja">
          <Nav.Item>
            <NavLink as={Link} to="/lojas" >
              <Col>Loja</Col>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink as={Link} to="/freteiro">
              <Col>Freteiro</Col>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink as={Link} to="/produtos">
              <Col>Produto</Col>
            </NavLink>
          </Nav.Item>
        </Nav>
      </Col>
      <Col>
        {children}
      </Col>
    </Container>
  );
}
