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
                    Mostrando de {lojas.items.length} até {limit} de {lojas.total}
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
            <Row className="my-3">
                <Col xs className="d-flex">
                    <PaginationComponent<ILoja>
                        items={lojas.total}
                        pageSize={lojas.limit}
                        onPageChange={handlePageChange}
                        currentPage={lojas.page ?? 1}
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

                    <span className="ml-2">Mostrando de {lojas.items.length} até {limit} de {lojas.total}</span>
                </Col>
            </Row>

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