import { ICatalogo } from "@/datatypes/catalogo";
import React from "react";
import ratata from "../../assets/megaPreco.svg";
import { formatCurrency } from "@/features/FormatCurrency";
import { Accordion, Card, Col, ListGroup, Row } from "react-bootstrap";

interface IPropItensTable {
    catalogo: ICatalogo;
    eventKey: string;
    onToggle: (key: string | null) => void;
    expandedKey: string | null;
}


export function ItemTable({ catalogo, eventKey, onToggle, expandedKey }: IPropItensTable) {

    return (
        <React.Fragment>
            <tr onClick={() => onToggle(expandedKey === eventKey ? null : eventKey)}>
                <td className="acordionStyle">
                    <img
                        className="responsive-image"
                        src={catalogo.url_thumbnail || ratata}
                        alt="Descrição da imagem"
                    />
                </td>

                <td className="th200">

                    <a
                        style={{ color: "blue" }}

                        href={catalogo.url_catalogo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={catalogo.nome}
                    >

                        {catalogo.nome}
                    </a>
                </td>

                <td className="th110" style={{ textAlign: "center" }}>
                    U${" "}
                    {formatCurrency(catalogo.competidores[0]?.produto.preco ?? 0)}
                </td>
                <td className="th130" style={{ textAlign: "center" }}>
                    R$ {" "}
                    {formatCurrency(catalogo.custoTotal)}
                </td>
                <td className="th130" style={{ textAlign: "center" }}>
                    R$ {" "}
                    {formatCurrency(catalogo.precoC)}
                </td>
                <td className="th110" style={{ textAlign: "center" }}>
                    R${" "}
                    {formatCurrency(catalogo.precoP)}
                </td>
                <td className="th110" style={{ textAlign: "center", color: catalogo.lucroC < 0 ? "red" : catalogo.lucroC > 0 ? "green" : "black" }}>
                    R${" "}
                    {formatCurrency(catalogo.lucroC)}
                </td>

                <td className="th110" style={{ textAlign: "center", color: catalogo.lucroP < 0 ? "red" : catalogo.lucroP > 0 ? "green" : "black" }}>
                    R${" "}
                    {formatCurrency(catalogo.lucroP)}
                </td>
                <td className="th130" style={{ textAlign: "center", color: catalogo.margemC < 0 ? "red" : catalogo.margemC > 0 ? "green" : "black" }}>
                    {catalogo.margemC.toFixed(2)}%
                </td>

                <td className="th130" style={{ textAlign: "center", color: catalogo.margemP < 0 ? "red" : catalogo.margemP > 0 ? "green" : "black" }}>
                    {catalogo.margemP.toFixed(2)}%
                </td>
                <td className="th110" >
                    {catalogo.competidores[0]?.loja.nome ?? ""}
                    <br />
                    {catalogo.competidores[0]?.produto.codigo ?? ""}
                </td>
            </tr>
            <tr >
                <td colSpan={11} style={{ height: 0, padding: 0 }}>
                    <Accordion activeKey={expandedKey} >
                        <Accordion.Item eventKey={eventKey} >
                            <Accordion.Header ></Accordion.Header>
                            <Accordion.Body>
                                <ListGroup >
                                    {catalogo.competidores.map((competidor, i) => (
                                        <ListGroup.Item key={i}>

                                            <Card >
                                                <Card.Header >
                                                    <strong>Loja:</strong> {competidor.loja.nome}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col xs={4} md={2} >
                                                            <strong>Código: </strong>
                                                            {competidor.produto.codigo}
                                                        </Col>
                                                        <Col xs={8} md={10}>
                                                            <strong>Produto: </strong>


                                                            <a
                                                                style={{ color: "blue" }}
                                                                href={competidor.loja.algoritmo === 1
                                                                    ? `https://atacadogames.com/lista-produtos/termo/${competidor.produto.codigo}/1`
                                                                    : (competidor.loja.algoritmo === 7
                                                                        ? `https://www.megaeletro.com.py/br/p/${competidor.produto.codigo}/1`
                                                                        : (competidor.loja.algoritmo === 5
                                                                            ? `https://www.madridcenter.com/produtos?q=${competidor.produto.codigo}`
                                                                            : (competidor.loja.algoritmo === 4
                                                                                ? `https://cellshop.com/catalogsearch/result/?q=${competidor.produto.codigo}`
                                                                                : (competidor.loja.algoritmo === 8
                                                                                    ? `https://www.mobilezone.com.br/search/q?search=${competidor.produto.codigo}`
                                                                                    : (competidor.loja.algoritmo === 3
                                                                                        ? `https://www.bestshop.com.py/buscar/${competidor.produto.codigo}`
                                                                                        : (competidor.loja.algoritmo === 6
                                                                                            ? ` https://stargamesparaguay.com/?s=${competidor.produto.codigo}`
                                                                                            : '#'))))))}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={competidor.produto.codigo}
                                                            >
                                                                {competidor.produto.nome}
                                                            </a>




                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col xs={3} md={3}>
                                                            <strong>Frete: </strong>
                                                            {formatCurrency(competidor.frete)}
                                                        </Col>
                                                        <Col xs={3} md={3}>
                                                            <strong>Preço U$: </strong>
                                                            {formatCurrency(competidor.produto.preco)}
                                                        </Col>
                                                        <Col xs={3} md={3} >
                                                            <strong>Preço R$: </strong>
                                                            {formatCurrency(competidor.produto.preco * competidor.loja.cotacao)}
                                                        </Col>
                                                        <Col xs={3} md={3} >
                                                            <strong>Custo Total R$: </strong>
                                                            {formatCurrency(competidor.frete + (competidor.produto.preco * competidor.loja.cotacao))}
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </td>
            </tr>
        </React.Fragment>
    );
}