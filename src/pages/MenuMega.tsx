import { Rotas } from "@/components/routes/rotas";
import { Col, Nav, Navbar, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import reactLogo from "@/assets/megaNotas.svg";
import { Icons } from "@/components/icons/icons";


interface props {
    children: React.ReactNode;
}


export function MenuMega({ children }: props) {



    return (
        <Rotas>
            <Navbar className="menuCss top-0 start-0 ">
                <Stack gap={5}>
                    <Nav.Item >

                        <Col className=" text-center"><Image className="logoEmprise" src={reactLogo} /></Col>

                    </Nav.Item>
                    <div className="">
                        <Nav.Item  >
                            <Link to='/'  >
                                <Row className="buttonNav"><Col className="iconNav "><Icons tipo="casa" /></Col><Col className="textNav ">Mega Notas</Col></Row>
                            </Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Link to="/loja">
                                <Row className="buttonNav"><Col className="iconNav "><Icons tipo="loja" /> </Col> <Col className="textNav ">Loja</Col></Row>
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/freteiro">
                                <Row className="buttonNav"><Col className="iconNav "><Icons tipo="caixa" /> </Col> <Col className="textNav ">Freteiro</Col></Row>
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/produto">
                                <Row className="buttonNav"><Col className="iconNav "><Icons tipo="produto" /> </Col>  <Col className="textNav ">Produto</Col></Row>
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/historico">
                                <Row className="buttonNav"><Col className="iconNav "><Icons tipo="historico" /> </Col> <Col className="textNav ">Histórico</Col></Row>
                            </Link>
                        </Nav.Item>
                    </div>
                </Stack >
            </Navbar >
            {children}
        </Rotas >
    );
}