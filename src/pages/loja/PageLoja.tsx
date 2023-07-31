import { useMemo, useState } from "react";
import { Button, Col, Dropdown, FloatingLabel, Row, Table, } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PaginationComponent } from "../../components/pagination/PaginationComponent";
import { ILoja, LojaController } from "@/datatypes/loja";
import React from "react";
import { ModalCadastroLoja } from "./ModalCadastroLoja";
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { ModalDesativaLoja } from "./ModalDesativaLoja";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "@/features/FormatCurrency";
import { compareValues, useSort } from "@/components/utils/FilterArrows";
import { PaginationDown } from "@/components/pagination/PaginationDown";
import { PaginationUp } from "@/components/pagination/PaginationUp";


export function PageLoja() {
    const [params, setParams] = useSearchParams();
    const [lojaIdEdit, setEdit] = useState<string | undefined>(undefined)
    const [lojaIdDelete, setDelete] = useState("");
    const [filtro, setFiltro] = useState("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<ILoja>('nome');


    const { isFetching, data } = useQuery(["lojas", filtro], () => {
        const loja = LojaController.search(filtro);
        return loja;
    });

    const lojas = useMemo(() => {

        let dados = data?.map((loja: ILoja) => {

            return loja;
        }) ?? []

        dados = dados.filter(loja => loja.ativo === true);

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
        <React.Fragment >

            <ModalCadastroLoja onHide={() => setEdit(undefined)} lojaId={lojaIdEdit} />
            <ModalDesativaLoja onHide={() => setDelete("")} lojaId={lojaIdDelete} />

            <Row className="my-3" >
                <Col xs className="d-flex">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/lojas/?limit=${limit}&page=${page}`}
                        />
                    </FloatingLabel>




                </Col>
                <Col xs className="d-flex justify-content-end ">
                    <Button
                        className="custom-btn"
                        onClick={() => setEdit("")}
                    >
                        <Icons tipo="cadastro" tamanho={23} />  Cadastro
                    </Button>
                </Col>
            </Row>


            <PaginationUp
                pageLimitSize={lojas.limit}
                handlePageChange={handlePageChange}
                itemsTotal={lojas.total}
                itemsLength={lojas.items.length}
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
                        <th className="th110" onClick={() => handleSort("cotacao")}>
                            <div className="thArrow">
                                <span>Cotação</span>
                                <span>
                                    {sortBy === "cotacao" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
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
                        !isFetching && lojas?.items?.map((loja, index) => <ItemTable key={index} loja={loja} onEdit={() => setEdit(loja.id)} onDelete={() => setDelete(loja.id)} />)
                    }
                </tbody>
            </Table>
            {isFetching && <FragmentLoading />}

            <PaginationDown
                handlePageChange={handlePageChange}
                itemsTotal={lojas.total}
                pageLimitSize={lojas.limit}
                currentPage={lojas.page ?? 1}
                itemsLength={lojas.items.length}
            />

        </React.Fragment>
    );
}


interface IPropsItensTable {
    loja: ILoja,
    onEdit: () => void,
    onDelete: () => void,
}

function ItemTable({ loja, onEdit, onDelete }: IPropsItensTable) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return (
        <React.Fragment>
            <tr >
                <td>
                    <span
                        style={{ color: "blue", cursor: 'pointer' }}
                        onClick={() => {
                            if (Number(loja.id) !== 0) {
                                queryClient.invalidateQueries(["produtosloja"]);
                                navigate(`/lojas/${loja.id}/produtos/1`);
                            }
                        }}
                    >
                        {loja.nome}
                    </span>
                </td>

                <td className="tdValue">
                    R$: {formatCurrency(loja.cotacao)}
                </td>
                <td className="centralize-icon"
                    onClick={onEdit}
                    role="button"
                    aria-label="Cadastrar Loja">
                    <Icons tipo="edit" />
                </td>
                <td className="centralize-icon"
                    onClick={onDelete}
                    role="button"
                    aria-label="Desativar Loja">
                    <Icons tipo="trash" />
                </td>
            </tr>
        </React.Fragment>
    )

}