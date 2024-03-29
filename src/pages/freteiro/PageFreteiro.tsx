import { useMemo, useState } from "react";
import { Button, Col, FloatingLabel, Row, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { FreteiroController, IFreteiro } from "@/datatypes/freteiro";
import { ModalCadastroFreteiro } from "./ModalCadastroFreteiro";
import React from "react";
import "@/assets/style.css"
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { ModalDesativaFreteiro } from "./ModalDesativaFreteiro";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/features/FormatCurrency";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";
import { PaginationUp } from "@/components/pagination/PaginationUp";
import { PaginationDown } from "@/components/pagination/PaginationDown";

export default function PageFreteiro() {
    const [params, setParams] = useSearchParams();
    const [freteiroIdEdit, setEdit] = useState<string | undefined>(undefined);
    const [freteiroIdDelete, setDelete] = useState<string | undefined>("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const [filtro, setFiltro] = useState<string>("");
    const { sortOrder, sortBy, handleSort } = useSort<IFreteiro>('nome');


    const { isFetching, data } = useQuery(["freteiros", filtro], () => {
        const loja = FreteiroController.search(filtro);
        return loja;
    });

    const freteiros = useMemo(() => {

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

    const handlePageChange = (page: number, newLimit?: number) => {
        const limitToUse = newLimit || limit;
        setParams(`?limit=${limitToUse}&page=${page}`);
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

            <PaginationUp
                pageLimitSize={freteiros.limit}
                handlePageChange={handlePageChange}
                itemsTotal={freteiros.total}
                itemsLength={freteiros.items.length}
            />

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
                        !isFetching && freteiros?.items?.map((freteiro, index) => <ItemTable key={index} freteiro={freteiro} onEdit={() => setEdit(freteiro.id)} onDelete={() => setDelete(freteiro.id)} />)
                    }
                </tbody>
            </Table>
            {isFetching && <FragmentLoading />}

            <PaginationDown
                pageLimitSize={freteiros.limit}
                handlePageChange={handlePageChange}
                itemsTotal={freteiros.total}
                currentPage={freteiros.page ?? 1}
                itemsLength={freteiros.items.length}
            />

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