import { useMemo, useState } from "react";
import { Button, Col, Dropdown, FloatingLabel, Row, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { FreteiroController, IFreteiro } from "@/datatypes/freteiro";
import { ModalCadastroFreteiro } from "./ModalCadastroFreteiro";
import React from "react";
import "@/assets/style.css"
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { ModalDesativaFreteiro } from "./ModalDesativaFreteiro";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";

export function PageFreteiro() {
    const [params, setParams] = useSearchParams();
    const [freteiroIdEdit, setEdit] = useState<string | undefined>(undefined);
    const [freteiroIdDelete, setDelete] = useState<string | undefined>("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const [filtro, setFiltro] = useState("");
    const { sortOrder, sortBy, handleSort } = useSort<IFreteiro>('nome');


    const { isFetching, data } = useQuery(["freteiros", filtro], () => {
        const loja = FreteiroController.search(filtro);
        return loja;
    });

    const freteiro = useMemo(() => {

        let dados = data?.map((freteiro: IFreteiro) => {

            return freteiro;
        }) ?? []

        dados = dados.filter(freteiro => freteiro.ativo === true);

        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);
        return {
            page, total, limit, items
        }


    }, [data, page, limit, sortBy, sortOrder]);

    const handlePageChange = (page: number) => {
        setParams(`?limit=${limit}&page=${page}`);
    };

    return (
        <React.Fragment>
            <ModalDesativaFreteiro onHide={() => setDelete("")} freteiroId={freteiroIdDelete} />
            <ModalCadastroFreteiro onHide={() => setEdit(undefined)} freteiroId={freteiroIdEdit} />

            <Row className="my-3">
                <Col xs className="d-flex ">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/freteiros/?limit=${limit}&page=${page}`}
                        />
                    </FloatingLabel>
                </Col>
                <Col xs className="d-flex justify-content-end">
                    <Button
                        className="custom-btn"
                        onClick={() => setEdit("")}
                    >
                        <Icons tipo="cadastro" tamanho={23} /> Cadastro
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>

                        <th className="th200" onClick={() => handleSort("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {sortBy === "nome" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort("fixo")}>
                            <div className="thArrow">
                                <span>Fixo</span>
                                <span>
                                    {sortBy === "fixo" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => handleSort("percentual")}>
                            <div className="thArrow">
                                <span>%</span>
                                <span>
                                    {sortBy === "percentual" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th40">

                        </th>
                        <th className="th40">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isFetching && freteiro?.items?.map((freteiro, index) => <ItemTable key={index} freteiro={freteiro} onEdit={() => setEdit(freteiro.id)} onDelete={() => setDelete(freteiro.id)} />)
                    }
                </tbody>
            </Table>
            {isFetching && <FragmentLoading />}
            <Row className="my-3">
                <Col xs className="d-flex">
                    <PaginationComponent<IFreteiro>
                        items={freteiro.total}
                        pageSize={freteiro.limit}
                        onPageChange={handlePageChange}
                        currentPage={freteiro.page ?? 1}
                    />

                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-3 limitPagination">
                            Mostrando {freteiro.items.length} de {limit}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=20&page=1"))}>20</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=50&page=1"))}>50</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=100&page=1"))}>100</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=200&page=1"))}>200</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=400&page=1"))}>400</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setParams(new URLSearchParams("limit=800&page=1"))}>800</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </React.Fragment>
    );
}

interface IPropItensTable {
    freteiro: IFreteiro,
    onEdit: () => void,
    onDelete: () => void,
}

function ItemTable({ freteiro, onEdit, onDelete }: IPropItensTable) {

    return (
        <React.Fragment>
            <tr>

                <td>{freteiro.nome}</td>
                <td className="tdValue">
                    R$: {formatCurrency(freteiro.fixo)}
                </td>
                <td className="tdValue">{freteiro.percentual}%</td>
                <td className="centralize-icon"
                    onClick={onEdit}
                    role="button"
                    aria-label="Editar Freteiro">
                    <Icons tipo="edit" />
                </td>
                <td className="centralize-icon"
                    onClick={onDelete}
                    role="button"
                    aria-label="Desativar Freteiro">
                    <Icons tipo="trash" />
                </td>
            </tr>
        </React.Fragment>
    )
}