import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Row, Table, } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PaginationComponent } from "../../datas/PaginationComponent";
import { ILoja, LojaController } from "@/datatypes/loja";
import React from "react";
import { ModalCadastroLoja } from "./ModalCadastroLoja";
import useDataTypes from "@/hooks/useDataTypes";
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { ModalDesativaLoja } from "./ModalDesativaLoja";

export function PageLoja() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [lojaIdEdit, setEdit] = useState<string | undefined>(undefined)
    const [lojaIdDelete, setDelete] = useState("");
    const [filtro, setFiltro] = useState("");

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data
    } = useDataTypes<ILoja>({
        queryKey: ["lojas", page ?? "1", "10"],
        queryFn: async () => await LojaController.search(parseInt(page ?? "1"), 10, filtro, ordenar, ordem ? "crescente" : "descrescente", true),
        filtro: filtro,
        defaultOrder: "nome"
    });

    const handlePageChange = (page: number) => {
        navigate(`/lojas/${page}`);
    };

    return (
        <React.Fragment>

            <ModalCadastroLoja onHide={() => setEdit(undefined)} lojaId={lojaIdEdit} />
            <ModalDesativaLoja onHide={() => setDelete("")} lojaId={lojaIdDelete} />

            <Row className="my-3">
                <Col xs className="d-flex">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink="/lojas/1"
                        />
                    </FloatingLabel>
                </Col>
                <Col xs className="d-flex justify-content-end">
                    <Button
                        style={{ borderRadius: '30px' }}
                        variant="success"
                        onClick={() => setEdit("")}
                    >
                        Cadastro
                    </Button>
                </Col>
            </Row>

            <Table bordered hover>
                <thead>
                    <tr>

                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("cotacao")}>
                            <div className="thArrow">
                                <span>Cotação</span>
                                <span>
                                    {ordenar === "cotacao" && (ordem ? "▼" : "▲")}
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
                        !isLoading && data?.items.map((loja, index) => <ItemTable key={index} loja={loja} onEdit={() => setEdit(loja.id)} onDelete={() => setDelete(loja.id)} />)
                    }
                </tbody>
            </Table>
            {isLoading && <FragmentLoading />}


            <Row className="mt-2">
                <Col xs>
                    <PaginationComponent<ILoja>
                        items={data?.total ?? 0}
                        pageSize={10}
                        onPageChange={handlePageChange}
                        currentPage={data?.page ?? 1}
                    />

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

    return (
        <React.Fragment>
            <tr >
                <td><span style={{ color: "blue", cursor: 'pointer' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        Number(loja.id) !== 0 && navigate(`/lojas/${loja.id}/produtos/1`);
                    }}>{loja.nome}</span></td>
                <td className="tdValue">R$: {(loja.cotacao / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td
                    onClick={onEdit}
                    role="button"
                    aria-label="Cadastrar Loja">
                    <Icons tipo="edit" />
                </td>
                <td onClick={onDelete}
                    role="button"
                    aria-label="Desativar Loja">
                    <Icons tipo="trash" />
                </td>
            </tr>
        </React.Fragment>
    )

}