import {
    PaginationComponent,
} from "@/datas/PaginationComponent";
import {
    CatalogoController,
    ICatalogo,
} from "@/datatypes/catalogo";
import React, { useState } from "react";
import {
    Accordion,
    Col,
    FloatingLabel,
    Row,
    Table,
} from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { useNavigate, useParams } from "react-router-dom";
import useDataTypes from "@/hooks/useDataTypes";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";

export function PageHome() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [filtro, setFiltro] = useState("");

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data,
    } = useDataTypes<ICatalogo>({
        queryKey: ["catalogos", page ?? "1", "10"],
        queryFn: async () =>
            await CatalogoController.search(
                parseInt(page ?? "1"),
                10,
                filtro,
                ordenar,
                ordem ? "crescente" : "descrescente",
                true
            ),
        filtro: filtro,
        defaultOrder: "nome",
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
                        <th className="th70">
                        </th>
                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("premium")}>
                            <div className="thArrow">
                                <span>Premium</span>
                                <span>
                                    {ordenar === "premium" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("preco")}>
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("preco")}>
                            <div className="thArrow">
                                <span>Preço ML</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Margem Liq.</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Atualizado em</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading &&
                        data?.items.map((catalogo, index) => (
                            <ItemTable key={index} catalogo={catalogo} />
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
    catalogo: ICatalogo;
}

function ItemTable({ catalogo }: IPropItensTable) {
    return (
        <React.Fragment>
            <tr>
                <td colSpan={7} style={{ padding: "0" }}>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <Table bordered hover style={{ marginBottom: "0px" }}>
                                    <tbody>
                                        <tr>
                                            <td className="image-cell">
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
                                                >
                                                    {catalogo.nome}
                                                </a>
                                            </td>
                                            <td className="th200">{catalogo.comissao * 100}%</td>
                                            <td className="th200">Preco Dolar</td>
                                            <td className="th200 tdValue">
                                                R${" "}
                                                {Number(catalogo.preco)
                                                    ? Number(catalogo.preco).toLocaleString("pt-BR", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })
                                                    : "N/A"}
                                            </td>
                                            <td className="th200">Margem Liq.</td>
                                            <td className="th200">
                                                {catalogo.ultima_atualizacao
                                                    ? catalogo.ultima_atualizacao.toLocaleDateString(
                                                        "pt-BR",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )
                                                    : "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Header>

                            <Accordion.Body>
                                {catalogo.nome}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </td>
            </tr>
        </React.Fragment>
    );
}