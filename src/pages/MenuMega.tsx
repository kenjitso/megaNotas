import { Icons } from "@/components/icons/icons";
import InputNumero from "@/components/inputs/InputNumero";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ratata from "../assets/megaPreco.svg"

interface CotacaoMoedas {
  [key: string]: {
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };
}

interface ModalDolarProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export function MenuMega() {
  const [cotacaoDolar, setCotacaoDolar] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [inputCotacao, setInputCotacao] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleModalSave = () => {

    const cotacao = (+inputCotacao / 100).toString().replace(".", ",");
    setCotacaoDolar((cotacao).toString());
    setShowModal(false);
  };

  const handleDolarClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL")
      .then((response) => response.json())
      .then((data: CotacaoMoedas) => {
        const cotacaoCompra = data?.["USDBRL"]?.bid;
        if (cotacaoCompra) {
          const cotacaoArredondada = parseFloat(cotacaoCompra).toFixed(2);
          setCotacaoDolar(cotacaoArredondada.toString().replace(".", ","));
        }
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={ratata}
              height="40"
              className="d-inline-block align-top me-3"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav
                variant="pills"
                className="p-2 d-none d-md-flex border-0 custom-tabs"
                activeKey={location.pathname}
                onSelect={(eventKey) => navigate(eventKey ?? "/")}
              >
                <Nav.Item>
                  <Nav.Link eventKey="/" title="Home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="/lojas" title="Lojas">Lojas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="/freteiro" title="Freteiros">Freteiros</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="/catalogos" title="Catalogos">Catalogos</Nav.Link>
                </Nav.Item>
              </Nav>
            </Nav>
            <Nav className="mx-end">
              <Nav.Link onClick={handleDolarClick}>
                <Icons tipo="flag" /> <b>Dólar: R$ {cotacaoDolar}</b>
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
          <ModalDolar showModal={showModal} setShowModal={setShowModal} onInputCotacao={setInputCotacao} handleModalSave={handleModalSave} />
        </Container>
      </Navbar>
    </React.Fragment>
  );
}
interface ModalDolarProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onInputCotacao: (value: string) => void;
  handleModalSave: () => void;
}



function ModalDolar({ showModal, setShowModal, onInputCotacao, handleModalSave }: ModalDolarProps) {
  const [inputCotacao, setInputCotacao] = useState(0);
  const handleValue = (value: number) => {
    setInputCotacao(value);
    onInputCotacao(value.toString());

  }

  return (
    <Modal
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Inserir cotação do dólar manualmente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCotacao">
            <Form.Label>Cotação do dólar:</Form.Label>
            <Form.Control
              as={InputNumero}
              type="number"
              value={inputCotacao}
              onValueChange={handleValue}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="position" variant="secondary" onClick={handleModalSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}