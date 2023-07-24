import { PaginationComponent } from "@/components/pagination/PaginationComponent";
import { CatalogoController, ICatalogo, } from "@/datatypes/catalogo";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Dropdown, FloatingLabel, OverlayTrigger, Row, Table, Tooltip, } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { FreteiroStore } from "@/context/FreteiroStore";
import { ILoja } from "@/datatypes/loja";
import { Icons } from "@/components/icons/icons";
import * as XLSX from 'xlsx';
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";
import { ItemTable } from "./TablePageHome";



export function PageHome() {
    const [params, setParams] = useSearchParams();
    const [filtro, setFiltro] = useState("");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const { freteiro } = FreteiroStore.useStore();
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<ICatalogo>('nome');
    const [globalFilter, setGlobalFilter] = useState(false);
    const [indiaFilter, setIndiaFilter] = useState(false);



    const { isFetching, data } = useQuery(["catalogoshome", filtro], async () => {
        let catalogo = await CatalogoController.searchCompetidor(filtro);
        return catalogo;
    });






    const catalogos = useMemo(() => {

        let dados = data?.map(catalogo => {

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



        if (indiaFilter) {
            dados = dados.filter(catalogo =>
                catalogo.competidores.every(competidor => 
                    competidor.produto.nome.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').includes("INDIA"))
            );
        }
        if (globalFilter) {
            dados = dados.filter(catalogo =>
                catalogo.competidores.every(competidor =>
                    competidor.produto.nome.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').includes("GLOBAL"))
            );
        }
    


        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));


        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);
        return {
            page, total, limit, items
        }
    }, [data, freteiro, page, limit, sortBy, sortOrder, indiaFilter, globalFilter])

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

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, checkboxSetter: React.Dispatch<React.SetStateAction<boolean>>) {
        checkboxSetter(e.target.checked);
        setParams(`?limit=${limit}&page=1`);
    }
    

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
                    <div className="mx-2">
                        <input type="checkbox" id="globalFilter" checked={globalFilter} onChange={(e) => handleCheckboxChange(e, setGlobalFilter)} />
                        <label htmlFor="globalFilter">Global</label>
                    </div>

                    <div className="mx-2">
                        <input type="checkbox" id="indiaFilter" checked={indiaFilter} onChange={(e) => handleCheckboxChange(e, setIndiaFilter)} />
                        <label htmlFor="indiaFilter">India</label>
                    </div>

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
