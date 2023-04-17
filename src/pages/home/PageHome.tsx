import {
    PaginationComponent,
} from "@/datas/PaginationComponent";
import {
    CatalogoController,
    ICatalogo,
    ICatalogoCompetidor,
} from "@/datatypes/catalogo";
import React, { useEffect, useState } from "react";
import {
    Accordion,
    Card,
    Col,
    FloatingLabel,
    ListGroup,
    Row,
    Table,
} from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { useNavigate, useParams } from "react-router-dom";
import useDataTypes from "@/hooks/useDataTypes";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { useSelectedId } from "@/context/SelectedIdContext";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "@/components/utils/FormatCurrency";

export function PageHome() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [filtro, setFiltro] = useState("");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const { selectedId } = useSelectedId();
    const [currentSelectedId, setCurrentSelectedId] = useState(selectedId);

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries(["catalogos", page ?? "1", "10"]);
        setCurrentSelectedId(selectedId);
    }, [selectedId]);

    console.log(currentSelectedId);

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data,
    } = useDataTypes<ICatalogoCompetidor>({
        queryKey: ["catalogos", page ?? "1", "10"],
        queryFn: async () =>

            await CatalogoController.searchCompetidor(
                parseInt(selectedId ?? "0"),
                parseInt(page ?? "1"),
                10,
                filtro,
                ordenar,
                ordem ? "descrescente" : "crescente"
            ),
        filtro: filtro,
        defaultOrder: "margem",
    });

    const handlePageChange = (page: number) => {
        navigate(`/${page}`);
    };

    return (
        <React.Fragment>
            <Row className="my-3">
                <Col xs className="d-flex">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/1`}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Table bordered>
                <thead>
                    <tr>
                        <th className="th70" >
                            <div className="thArrow">
                                <span></span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => orderBy("premium")}>
                            <div className="thArrow">
                                <span>Premium</span>
                                <span>
                                    {ordenar === "premium" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("preco")}>
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("lucro")}>
                            <div className="thArrow">
                                <span>Preço ML</span>
                                <span>
                                    {ordenar === "lucro" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("margem")}>
                            <div className="thArrow">
                                <span>Margem Liq.</span>
                                <span>
                                    {ordenar === "margem" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("vencedor")}>
                            <div className="thArrow">
                                <span>Vencedor</span>
                                <span>
                                    {ordenar === "vencedor" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading &&
                        data?.items.map((catalogo, index) => (
                            <ItemTable key={index} catalogo={catalogo} eventKey={index.toString()} onToggle={setExpandedKey} expandedKey={expandedKey} />
                        ))}
                </tbody>
            </Table>

            {isLoading && <FragmentLoading />}
            <Row className="mt-2">
                <PaginationComponent<ICatalogo>
                    items={data?.total ?? 0}
                    pageSize={10}
                    onPageChange={handlePageChange}
                    currentPage={data?.page ?? 1}
                />
            </Row>
        </React.Fragment>
    );
}


interface IPropItensTable {
    catalogo: ICatalogoCompetidor;
    eventKey: string;
    onToggle: (key: string | null) => void;
    expandedKey: string | null;
}


function ItemTable({ catalogo, eventKey, onToggle, expandedKey }: IPropItensTable) {

    return (
        <React.Fragment>
            <tr>
                <td colSpan={7} style={{ padding: "0" }}>
                    <Accordion activeKey={expandedKey}>
                        <Accordion.Item eventKey={eventKey}>
                            <Accordion.Header onClick={() => onToggle(expandedKey === eventKey ? null : eventKey)}>

                                <Table bordered hover style={{ marginBottom: "0px" }}>
                                    <tbody>
                                        <tr>
                                            <td className="th70" style={{ textAlign: "center" }}>
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
                                            <td className="th70" style={{ textAlign: "right" }}>
                                                {catalogo.comissao * 100}%
                                            </td>
                                            <td className="th110" style={{ textAlign: "right" }}>
                                                U${" "}
                                                {formatCurrency(catalogo.vencedor?.produto.preco ?? 0)}
                                            </td>
                                            <td className="th110" style={{ textAlign: "right" }}>
                                                R${" "}
                                                {formatCurrency(catalogo.preco)}
                                            </td>
                                            <td className="th110" style={{ textAlign: "right" }}>
                                                {(catalogo.margem * 100).toFixed(2)}%
                                            </td>
                                            <td className="th110" >
                                                {catalogo.vencedor?.loja.nome ?? "Nenhum"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Header>

                            <Accordion.Body>
                                <ListGroup>
                                    {catalogo.competidores.map((competidor, i) => (
                                        <ListGroup.Item key={i}>
                                            <Card>
                                                <Card.Header>
                                                    <strong>Loja:</strong> {competidor.loja.nome}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col xs={4} md={2}>
                                                            <strong>Código:</strong> {competidor.produto.codigo}
                                                        </Col>
                                                        <Col xs={8} md={10}>
                                                            <strong>Produto:</strong> {competidor.produto.nome}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={4} md={4}>
                                                            <strong>Frete: </strong>
                                                            {formatCurrency(competidor.frete)}
                                                        </Col>
                                                        <Col xs={4} md={4}>
                                                            <strong>Preço U$: </strong>
                                                            {formatCurrency(competidor.produto.preco)}
                                                        </Col>
                                                        <Col xs={4} md={4}>
                                                            <strong>Preço R$: </strong>
                                                            {formatCurrency(competidor.produto.preco * competidor.loja.cotacao)}
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