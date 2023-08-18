import { CatalogoController, ICatalogo, } from "@/datatypes/catalogo";
import React, { useMemo, useState } from "react";
import { Button, Col, Dropdown, FloatingLabel, Form, OverlayTrigger, Row, Table, Tooltip, } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { FreteiroStore } from "@/context/FreteiroStore";
import { Icons } from "@/components/icons/icons";
import * as XLSX from 'xlsx';
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";
import { ItemTable } from "./TablePageHome";
import { PaginationUp } from "@/components/pagination/PaginationUp";
import { PaginationDown } from "@/components/pagination/PaginationDown";
import { SortableTableHeader } from "@/components/pagination/SortableTableHeader";
import { ModalSincronismoUpdate } from "../catalogo/ModalSincronismoUpdate";


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
    const [chinaFilter, setChinaFilter] = useState(false);
    const [indonesiaFilter, setIndonesiaFilter] = useState(false);
    const [appleFilter, setAppleFilter] = useState(false);
    const [xiaomiFilter, setXiaomiFilter] = useState(false);
    const [samsungFilter, setSamsungFilter] = useState(false);
    const [celularFilter, setCelularFilter] = useState(false);
    const [relogioFilter, setRelogioFilter] = useState(false);
    const [notebookFilter, setNotebookFilter] = useState(false);
    const [catalogoSincronismoUpdate, setSincronismoUpdate] = useState<boolean>(false);

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


        dados = dados
            .map(catalogo => ({
                ...catalogo,
                competidores: catalogo.competidores.filter(competidor => {
                    const nome = competidor.produto.nome.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '');

                    if (indiaFilter && nome.includes("INDIA")) {
                        return true; // Se o filtro India estiver ativado e o nome incluir "INDIA", inclua este competidor.
                    }
                    if (globalFilter && nome.includes("GLOBAL")) {
                        return true; // Se o filtro Global estiver ativado e o nome incluir "GLOBAL", inclua este competidor.
                    }
                    if (chinaFilter && nome.includes("CHINA")) {
                        return true; // Se o filtro CHINA estiver ativado e o nome incluir "CHINA", inclua este competidor.
                    }
                    if (indonesiaFilter && nome.includes("INDONESIA")) {
                        return true; // Se o filtro INDONESIA estiver ativado e o nome incluir "INDONESIA", inclua este competidor.
                    }

                    if (appleFilter && (nome.includes("APPLE") || nome.includes("IPHONE"))) {
                        return true; // Se o filtro apple estiver ativado e o nome incluir "APPLE", inclua este competidor.
                    }
                    if (samsungFilter && nome.includes("SAMSUNG")) {
                        return true; // Se o filtro samsung estiver ativado e o nome incluir "SAMSUNG", inclua este competidor.
                    }
                    if (xiaomiFilter && nome.includes("XIAOMI")) {
                        return true; // Se o filtro xiaomi estiver ativado e o nome incluir "XIAOMI", inclua este competidor.
                    }
                    if (celularFilter && nome.includes("CELULAR")) {
                        return true; // Se o filtro xiaomi estiver ativado e o nome incluir "XIAOMI", inclua este competidor.
                    }
                    if (relogioFilter && nome.includes("RELOGIO")) {
                        return true; // Se o filtro xiaomi estiver ativado e o nome incluir "XIAOMI", inclua este competidor.
                    }
                    if (notebookFilter && nome.includes("NOTEBOOK")) {
                        return true; // Se o filtro xiaomi estiver ativado e o nome incluir "XIAOMI", inclua este competidor.
                    }

                    // Se nenhum filtro estiver ativo, mostre todos. Caso contrário, não mostre o competidor.
                    return !(indiaFilter || globalFilter || chinaFilter || indonesiaFilter || appleFilter || samsungFilter || xiaomiFilter || celularFilter || relogioFilter || notebookFilter);
                }),
            }))
            .filter(catalogo => catalogo.competidores.length > 0); // Remove catálogos que agora estão sem competidores.



        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));


        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);
        return {
            page, total, limit, items
        }
    }, [data, freteiro, page, limit, sortBy, sortOrder, indiaFilter, globalFilter, chinaFilter, indonesiaFilter, appleFilter, samsungFilter, xiaomiFilter,celularFilter,relogioFilter,notebookFilter])

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


            <ModalSincronismoUpdate onHide={() => setSincronismoUpdate(false)} isVisible={catalogoSincronismoUpdate} catalogos={catalogos?.total} />

            <Row className="my-3">
                <Col xs={12} className="d-flex align-items-center">

                    <FloatingLabel className="w-100 mr-custom" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`?limit=20&page=1`}
                        />
                    </FloatingLabel>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="download-tooltip">Filtros</Tooltip>}
                    >
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="no-caret mx-2 custom-dropdown">
                                <Icons tipo="filtro" tamanho={20} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="custom-filter-dropdown-menu">


                                <Row>
                                    <Col xs={4}>
                                        PAISES
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="globalFilter"
                                                checked={globalFilter}
                                                onChange={(e) => handleCheckboxChange(e, setGlobalFilter)}
                                                label="Global"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="indiaFilter"
                                                checked={indiaFilter}
                                                onChange={(e) => handleCheckboxChange(e, setIndiaFilter)}
                                                label="India"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="chinaFilter"
                                                checked={chinaFilter}
                                                onChange={(e) => handleCheckboxChange(e, setChinaFilter)}
                                                label="China"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="indonesiaFilter"
                                                checked={indonesiaFilter}
                                                onChange={(e) => handleCheckboxChange(e, setIndonesiaFilter)}
                                                label="Indonesia"
                                            />
                                        </Dropdown.Item>
                                    </Col>
                                    <Col xs={4}>
                                        MARCA
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="appleFilter"
                                                checked={appleFilter}
                                                onChange={(e) => handleCheckboxChange(e, setAppleFilter)}
                                                label="Apple"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="samsungFilter"
                                                checked={samsungFilter}
                                                onChange={(e) => handleCheckboxChange(e, setSamsungFilter)}
                                                label="Samsung"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="xiaomiFilter"
                                                checked={xiaomiFilter}
                                                onChange={(e) => handleCheckboxChange(e, setXiaomiFilter)}
                                                label="Xiaomi"
                                            />
                                        </Dropdown.Item>
                                    </Col>
                                    <Col xs={4}>
                                        PRODUTOS
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="celularFilter"
                                                checked={celularFilter}
                                                onChange={(e) => handleCheckboxChange(e, setCelularFilter)}
                                                label="CELULAR"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="relogioFilter"
                                                checked={relogioFilter}
                                                onChange={(e) => handleCheckboxChange(e, setRelogioFilter)}
                                                label="RELOGIO"
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
                                            <Form.Check
                                                type="checkbox"
                                                id="notebookFilter"
                                                checked={notebookFilter}
                                                onChange={(e) => handleCheckboxChange(e, setNotebookFilter)}
                                                label="NOTEBOOK"
                                            />
                                        </Dropdown.Item>
                                    </Col>
                                </Row>

                            </Dropdown.Menu>

                        </Dropdown>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="download-tooltip">Exportar para Excel</Tooltip>}
                    >
                        <Button id="dropdown-basic" className="custom-dropdown me-2" onClick={() => exportCatalogoExcel(catalogos.items)}>
                            <Icons tipo="downloadXLSX" tamanho={20} />
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="download-tooltip">Sincronizar Catalogos</Tooltip>}
                    >
                        <Button id="dropdown-basic" className="custom-dropdown" onClick={() => setSincronismoUpdate(true)}

                        >
                            <Icons tipo="update" tamanho={23} />
                        </Button>
                    </OverlayTrigger>

                </Col>
            </Row>


            <PaginationUp
                pageLimitSize={catalogos.limit}
                handlePageChange={handlePageChange}
                itemsTotal={catalogos.total}
                itemsLength={catalogos.items.length}
            />

            <Table striped bordered hover className="rounded-table">


                <thead>
                    <tr>
                        <SortableTableHeader css="th70" />
                        <SortableTableHeader css="th200" displayText="Nome" sortKey="nome" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th110" displayText="Preço U$" sortKey="competidores[0].produto.preco" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th130" displayText="Custo Total" sortKey="custoTotal" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th110" displayText="Preço ML C" sortKey="precoC" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th110" displayText="Preco ML P" sortKey="precoP" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th110" displayText="Lucro C" sortKey="lucroC" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th110" displayText="Lucro P" sortKey="lucroP" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th130" displayText="Margem Liq. C" sortKey="margemC" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th130" displayText="Margem Liq. P" sortKey="margemP" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                        <SortableTableHeader css="th110" displayText="Vencedor" />
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

            <PaginationDown
                handlePageChange={handlePageChange}
                itemsTotal={catalogos.total}
                pageLimitSize={catalogos.limit}
                currentPage={catalogos.page ?? 1}
                itemsLength={catalogos.items.length}
            />

        </React.Fragment>
    );
}
