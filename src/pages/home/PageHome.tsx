import { PaginationComponent } from "@/components/pagination/PaginationComponent";
import { CatalogoController, ICatalogo, } from "@/datatypes/catalogo";
import React, { useMemo, useState } from "react";
import { Accordion, Card, Col, Dropdown, FloatingLabel, ListGroup, OverlayTrigger, Row, Table, Tooltip, } from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { useSearchParams } from "react-router-dom";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { formatCurrency } from "@/features/FormatCurrency";
import { FreteiroStore } from "@/context/FreteiroStore";
import { ILoja } from "@/datatypes/loja";
import { Icons } from "@/components/icons/icons";
import * as XLSX from 'xlsx';
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";



export function PageHome() {
    const [params, setParams] = useSearchParams();
    const [filtro, setFiltro] = useState("");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const { freteiro } = FreteiroStore.useStore();
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<ICatalogo>('nome');

    const { isFetching, data } = useQuery(["catalogoshome", filtro], () => {
        let catalogo = CatalogoController.searchCompetidor(filtro);

        return catalogo;
    });


    const catalogos = useMemo(() => {

        const dados = data?.map(catalogo => {
            for (const competidor of catalogo.competidores) {
                const frete = freteiro ? competidor.produto.preco * competidor.loja.cotacao * freteiro.percentual / 100 + freteiro.fixo : 0;
                competidor.frete = frete;
            }

            let precoC = Number.MAX_SAFE_INTEGER;
            let precoP = Number.MAX_SAFE_INTEGER;

            for (const competidor of catalogo.competicaoML) {
                if (competidor.premium) {
                    precoP = Math.min(competidor.preco, precoP);
                    continue;
                }
                precoC = Math.min(competidor.preco, precoC);
            }

            catalogo.precoC = precoC !== Number.MAX_SAFE_INTEGER ? precoC : 0;
            catalogo.precoP = precoP !== Number.MAX_SAFE_INTEGER ? precoP : 0;

            const vencedor = catalogo.competidores[0];

            if (vencedor) {
                catalogo.custoTotal = vencedor.produto.preco * vencedor.loja.cotacao + vencedor.frete;


                catalogo.lucroC = (catalogo.precoC !== 0) ? (catalogo.precoC - (catalogo.precoC * 0.11) - catalogo.frete - catalogo.custoTotal) : 0;
                catalogo.lucroP = (catalogo.precoP !== 0) ? (catalogo.precoP - (catalogo.precoP * 0.16) - catalogo.frete - catalogo.custoTotal) : 0;
                catalogo.margemC = (catalogo.precoC !== 0) ? (catalogo.lucroC / catalogo.precoC) * 100 : 0;
                catalogo.margemP = (catalogo.precoP !== 0) ? (catalogo.lucroP / catalogo.precoP) * 100 : 0;


            }

            return catalogo;

        }) ?? []


        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);
        return {
            page, total, limit, items
        }
    }, [data, freteiro, page, limit, sortBy, sortOrder])

    function exportCatalogoExcel(catalogos: ICatalogo[]) {
        const filteredCatalogos = catalogos.map(({
            id,
            ativo,
            frete,
            url_catalogo,
            comissao,
            premium,
            preco,
            competicaoML,
            ultima_atualizacao,
            ultima_atualizacao_competidores,
            competidores,
            ...rest
        }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredCatalogos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Catalogos");
        XLSX.writeFile(wb, "catalogo.xlsx");
    }


    const handlePageChange = (page: number, newLimit?: number) => {
        const limitToUse = newLimit || limit;
        setParams(`?limit=${limitToUse}&page=${page}`);
    };





    return (
        <React.Fragment>

            <Row className="my-3">
                <Col xs={12} className="d-flex">

                    <FloatingLabel className="w-100 mr-custom" label="Pesquisar" >
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`?limit=20&page=1`}
                        />

                    </FloatingLabel>



                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="download-tooltip">Exportar para Excel</Tooltip>}
                    >
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown justify-content-end my-1" onClick={() => exportCatalogoExcel(catalogos.items)}>
                            <Icons tipo="downloadXLSX" tamanho={20} />
                        </Dropdown.Toggle>
                    </OverlayTrigger>
                </Col>

            </Row>
            <Row className="my-2">
                <Col xs={10}>
                    <Dropdown >Exibir
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-1 limitPagination">
                            {limit}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 20)}>20</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 50)}>50</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 100)}>100</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 200)}>200</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 400)}>400</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 800)}>800</Dropdown.Item>
                        </Dropdown.Menu>
                        resultados por página
                    </Dropdown>
                </Col>
                <Col xs={2} className="justify-content-end text-right">
                    Mostrando de {catalogos.items.length} até {limit} de {catalogos.total}
                </Col>


            </Row>

            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>
                        <th className="th70" >
                            <div className="thArrow">
                                <span></span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => handleSort('nome')}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {sortBy === "nome" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>

                        <th className="th110" onClick={() => handleSort('competidores[0].produto.preco')} >
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {sortBy === "competidores[0].produto.preco" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => handleSort('custoTotal')} >
                            <div className="thArrow">
                                <span>Custo Total R$</span>
                                <span>
                                    {sortBy === "custoTotal" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('precoC')} >
                            <div className="thArrow">
                                <span>Preço ML C</span>
                                <span>
                                    {sortBy === "precoC" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('precoP')}>
                            <div className="thArrow">
                                <span>Preço ML P</span>
                                <span>
                                    {sortBy === "precoP" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>


                        <th className="th110" onClick={() => handleSort('lucroC')}>
                            <div className="thArrow">
                                <span>Lucro C</span>
                                <span>
                                    {sortBy === "lucroC" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('lucroP')}>
                            <div className="thArrow">
                                <span>Lucro P</span>
                                <span>
                                    {sortBy === "lucroP" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>

                        <th className="th130" onClick={() => handleSort('margemC')}>
                            <div className="thArrow">
                                <span>Margem Liq. C</span>
                                <span>
                                    {sortBy === "margemC" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => handleSort('margemP')}>
                            <div className="thArrow">
                                <span >Margem Liq. P</span>
                                <span>
                                    {sortBy === "margemP" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" >
                            <span>Vencedor</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!isFetching &&
                        catalogos.items
                            .sort(compareValues(sortBy, sortOrder))
                            .map((catalogo, index) => {


                                return (
                                    <ItemTable key={index} catalogo={catalogo} eventKey={index.toString()} onToggle={setExpandedKey} expandedKey={expandedKey} />
                                );
                            })
                    }
                </tbody>

            </Table>
            {isFetching && <FragmentLoading />}
            <Row className="my-3">
                <Col xs className="d-flex">
                    <PaginationComponent<ILoja>
                        items={catalogos.total}
                        pageSize={catalogos.limit}
                        onPageChange={handlePageChange}
                        currentPage={catalogos.page ?? 1}
                    />

                    <Col className="ml-auto mx-3">
                        <Dropdown > Exibir
                            <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-1 limitPagination">
                                {limit}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu">
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 20)}>20</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 50)}>50</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 100)}>100</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 200)}>200</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 400)}>400</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 800)}>800</Dropdown.Item>
                            </Dropdown.Menu>
                            resultados por página
                        </Dropdown>
                    </Col>

                    <span className="ml-2">Mostrando de {catalogos.items.length} até {limit} de {catalogos.total}</span>
                </Col>
            </Row>

        </React.Fragment>
    );
}


interface IPropItensTable {
    catalogo: ICatalogo;
    eventKey: string;
    onToggle: (key: string | null) => void;
    expandedKey: string | null;
}


function ItemTable({ catalogo, eventKey, onToggle, expandedKey }: IPropItensTable) {

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
                                                                href={`https://atacadogames.com/lista-produtos/termo/${competidor.produto.codigo}/1`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={competidor.produto.nome}
                                                            >

                                                                {competidor.produto.nome}
                                                            </a>


                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col xs={4} md={4}>
                                                            <strong>Frete: </strong>
                                                            {formatCurrency(competidor.frete)}
                                                        </Col>
                                                        <Col xs={4} md={4}>
                                                            <strong>Preço U$: </strong>
                                                            {formatCurrency(competidor.produto.preco)}
                                                        </Col>
                                                        <Col xs={4} md={4} >
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