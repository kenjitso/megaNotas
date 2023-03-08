import { Col, Container, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import reactLogo from "@/assets/ratata.svg";
import { Icons } from "@/components/icons/icons";

interface props {
  children: React.ReactNode;
}

export function MenuMega({ children }: props) {
  return (
    <Container fluid >
      <Row style={{ flexWrap: "nowrap"  }}>
        <Col className="menuCss top-0 start-0">
          <Navbar>
            <Stack gap={5}>
              <Nav.Item>
                <Col className="text-center">
                  <Image className="logoEmprise" src={reactLogo} />
                </Col>
              </Nav.Item>
              <div className="">
                <Nav.Item>
                  <Link to="/lojas">
                    <Row className="buttonNav">
                      <Col className="iconNav ">
                        <Icons tipo="loja" />{" "}
                      </Col>{" "}
                      <Col className="textNav ">Loja</Col>
                    </Row>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/freteiro">
                    <Row className="buttonNav">
                      <Col className="iconNav ">
                        <Icons tipo="caixa" />{" "}
                      </Col>{" "}
                      <Col className="textNav ">Freteiro</Col>
                    </Row>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/produtos">
                    <Row className="buttonNav">
                      <Col className="iconNav ">
                        <Icons tipo="produto" />{" "}
                      </Col>{" "}
                      <Col className="textNav ">Produto</Col>
                    </Row>
                  </Link>
                </Nav.Item>
              </div>
            </Stack>
          </Navbar>
        </Col>
        <Col style={{ marginLeft: "290px" }} >
          {children}
        </Col>
      </Row>
    </Container>
  );
}
