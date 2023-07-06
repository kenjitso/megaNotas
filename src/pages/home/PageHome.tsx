import {
    PaginationComponent,
} from "@/datas/PaginationComponent";
import {
    CatalogoController, ICatalogo,
} from "@/datatypes/catalogo";
import React, { useMemo, useState, useEffect } from "react";
import {
    Accordion,
    Button,
    Card,
    Col,
    Dropdown,
    FloatingLabel,
    ListGroup,
    Row,
    Table,
} from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { FreteiroStore } from "@/context/FreteiroStore";
import { ILoja } from "@/datatypes/loja";
import { Icons } from "@/components/icons/icons";
import * as XLSX from 'xlsx';
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";



export function PageHome() {
    const [params, setParams] = useSearchParams();
    const [filtro, setFiltro] = useState("");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const { freteiro } = FreteiroStore.useStore();
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "10");
    const { sortOrder, sortBy, handleSort } = useSort<ICatalogo>('nome');



    const { isFetching, data } = useQuery(["catalogoHome", filtro], () => {
        const catalogo = CatalogoController.searchCompetidor(filtro);
        return catalogo;
    });

    const [listFiltred, setListFiltred] = useState<ICatalogo[] | null>(data ?? []);

    const listFiltered = (filtered: ICatalogo[]) => {
        setListFiltred(filtered);
    }

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

                catalogo.margemC = (catalogo.precoC !== 0) ? (catalogo.lucroC / catalogo.precoC) * 100 : 0;
                catalogo.margemP = (catalogo.precoP !== 0) ? (catalogo.lucroP / catalogo.precoP) * 100 : 0;
                catalogo.lucroC = (catalogo.precoC !== 0) ? (catalogo.precoC - (catalogo.precoC * 0.11) - catalogo.frete - catalogo.custoTotal) : 0;
                catalogo.lucroP = (catalogo.precoP !== 0) ? (catalogo.precoP - (catalogo.precoP * 0.16) - catalogo.frete - catalogo.custoTotal) : 0;
            

                
            }

            return catalogo;

        }) ?? []


        const sortedData = [...dados].sort((a, b) => compareValues(a[sortBy], b[sortBy], sortOrder));

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


    const handlePageChange = (page: number) => {
        setParams(`?limit=${limit}&page=${page}`);
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
                            pageLink={`?limit=10&page=1`}
                        />

                    </FloatingLabel>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown  justify-content-end my-1 mr-custom" >
                            <Icons tipo="filtro" tamanho={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <center>
                                Filtro 1<br />
                                Filtro 2<br />
                                Filtro 3<br />
                                Filtro 4<br />
                                Filtro 5<br />
                            </center>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown  justify-content-end my-1 mr-custom">
                            <Icons tipo="listLimitPage" tamanho={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=10&page=1"))}>10</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=25&page=1"))}>25</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=50&page=1"))}>50</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=100&page=1"))}>100</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=200&page=1"))}>200</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown  justify-content-end my-1" onClick={() => exportCatalogoExcel(catalogos.items)}>
                        <Icons tipo="downloadXLSX" tamanho={20} />
                    </Dropdown.Toggle>
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
                                    {sortBy === "nome" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th200" onClick={()=> handleSort('frete')}>
                            <div className="thArrow">
                                <span>Frete</span>
                                <span>
                                    {sortBy === "frete" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('preco')} >
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {sortBy === "preco" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => handleSort('custoTotal')} >
                            <div className="thArrow">
                                <span>Custo Total R$</span>
                                <span>
                                    {sortBy === "custoTotal" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('precoC')} >
                            <div className="thArrow">
                                <span>Preço ML C</span>
                                <span>
                                    {sortBy === "precoC" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('precoP')}>
                            <div className="thArrow">
                                <span>Preço ML P</span>
                                <span>
                                    {sortBy === "precoP" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>


                        <th className="th110" onClick={() => handleSort('lucroC')}>
                            <div className="thArrow">
                                <span>Lucro C</span>
                                <span>
                                    {sortBy === "lucroC" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort('lucroP')}>
                            <div className="thArrow">
                                <span>Lucro P</span>
                                <span>
                                    {sortBy === "lucroP" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>

                        <th className="th130" onClick={() => handleSort('margemC')}>
                            <div className="thArrow">
                                <span>Margem Liq. C</span>
                                <span>
                                    {sortBy === "margemC" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => handleSort('margemP')}>
                            <div className="thArrow">
                                <span >Margem Liq. P</span>
                                <span>
                                    {sortBy === "margemP" ? (sortOrder === "asc" ? "▲" : "▼") : "▲"}
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
                        catalogos.items.map((catalogo, index) => {
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
                <td className="th130" style={{ textAlign: "center" }}>
                    R$ {" "}
                    {formatCurrency(catalogo.frete)}
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
                <td className="th110" style={{ textAlign: "center" }}>
                    R${" "}
                    {formatCurrency(catalogo.lucroC)}
                </td>

                <td className="th110" style={{ textAlign: "center" }}>
                    R${" "}
                    {formatCurrency(catalogo.lucroP)}
                </td>
                <td className="th130" style={{ textAlign: "center" }}>
                    {catalogo.margemC.toFixed(2)}%
                </td>

                <td className="th130" style={{ textAlign: "center" }}>
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
                                                            <strong>Código:</strong> {competidor.produto.codigo}
                                                        </Col>
                                                        <Col xs={8} md={10}>
                                                            <strong>Produto:</strong> {competidor.produto.nome}
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