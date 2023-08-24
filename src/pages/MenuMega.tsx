import { Icons } from "@/components/icons/icons";
import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ratata from "../assets/megaPreco.svg"
import { ModalDolar } from "./ModalDolar";
import { FreteiroController } from "@/datatypes/freteiro";
import { FreteiroStore } from "@/context/FreteiroStore";
import { useQuery } from "@tanstack/react-query";
import { SincronizaCatalogosStore } from "@/context/SincronizaCatalogosStore";
import { toast } from "react-toastify";

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

export function MenuMega() {
  const [cotacaoDolar, setCotacaoDolar] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [filtro, setFiltro] = useState("");
  const { freteiro } = FreteiroStore.useStore();
  const dispatch = FreteiroStore.useDispatch();
  const { sincronizaCatalogos } = SincronizaCatalogosStore.useStore();




  const { data: freteiros } = useQuery(["freteiros", filtro], async () => {
    const result = await FreteiroController.search(filtro);
    return result?.map(freteiro => {
      return {
        ...freteiro
      };
    });
  });

  useEffect(() => {
    // Verifica se sincronizaCatalogos tem algum valor
    if (sincronizaCatalogos && sincronizaCatalogos.length > 0) {
        const isSuccessfulMessage = sincronizaCatalogos === "Dados ML sincronizados com sucesso!";
        
        // Se o toast com o ID "sincroiniza_dados_ml" NÃO estiver ativo, exiba-o.
        if (!toast.isActive("sincroiniza_dados_ml")) {
          toast.info(sincronizaCatalogos, { 
            toastId: "sincroiniza_dados_ml",
            autoClose: isSuccessfulMessage ? 5000 : false // Define autoClose para 5000ms se for a mensagem de sucesso, caso contrário, desativa o autoClose
          });
        } else {
          // Se o toast já estiver ativo, atualiza o conteúdo
          toast.update("sincroiniza_dados_ml", {
            render: sincronizaCatalogos,
            autoClose: isSuccessfulMessage ? 5000 : false
          });
        }
    }
  }, [sincronizaCatalogos]);



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

  function getActiveKey(pathname: string) {
    if (pathname.startsWith("/lojas")) {
      return "/lojas";
    } else if (pathname.startsWith("/catalogos")) {
      return "/catalogos";
    } else if (pathname.startsWith("/freteiro")) {
      return "/freteiro";
    } else if (pathname.startsWith("/home")) {
      return "/home";
    } else {
      return pathname;
    }
  }


  return (
    <React.Fragment>
      <Navbar className="custom-navbar" expand="lg" >
        <Container >
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
                activeKey={getActiveKey(location.pathname)}
                onSelect={(eventKey) => navigate(eventKey ?? "/")}
              >

                {/*    
                <Nav.Item>
                  <Nav.Link eventKey="/" title="Home">Home</Nav.Link>
                </Nav.Item>
                */}
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

              <Form.Select
                className="optionStyle"
                value={freteiro?.id ?? ""}
                onChange={(e) => dispatch(freteiros?.find(freteiro => freteiro.id === e.target.value) ?? null)}
              >
                <option value="">Selecionar Freteiro</option>
                {freteiros?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </Form.Select>

              <Nav.Link onClick={() => { setShowModal(true); }} className="no-wrap" style={{ color: "white" }}>
                <Icons tipo="flag" /> <b>Dólar: R$ {cotacaoDolar}</b>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
          <ModalDolar showModal={showModal} setShowModal={setShowModal} cotacaoDolar={cotacaoDolar} />
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

