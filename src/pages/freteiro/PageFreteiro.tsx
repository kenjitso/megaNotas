import { useState } from "react";
import { Button, Col, FloatingLabel, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { FreteiroController, IFreteiro } from "@/datatypes/freteiro";
import { ModalCadastroFreteiro } from "./ModalCadastroFreteiro";
import React from "react";
import "@/assets/style.css"
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { ModalDesativaFreteiro } from "./ModalDesativaFreteiro";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import useDataTypes from "@/hooks/useDataTypes";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { ILoja } from "@/datatypes/loja";

export function PageFreteiro() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [freteiroIdEdit, setEdit] = useState<string | undefined>(undefined);
    const [freteiroIdDelete, setDelete] = useState<string | undefined>("");
    const [filtro, setFiltro] = useState("");

    const {

        isLoading,
        orderBy,
        ordem,
        ordenar,
        data
    } = useDataTypes<IFreteiro>({
        queryKey: ["freteiros", page ?? "1", "10"],
        queryFn: async () => await FreteiroController.search(parseInt(page ?? "1"), 10, filtro, ordenar, ordem ? "crescente" : "descrescente", true),
        filtro: filtro,
        defaultOrder: "nome"
    })

    const handlePageChange = (page: number) => {
        navigate(`/freteiros/${page}`);
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
                            pageLink="/freteiros/1"
                        />
                    </FloatingLabel>
                </Col>
                <Col xs className="d-flex justify-content-end">
                    <Button
                        variant="success"
                        onClick={() => setEdit("")}
                    >
                        <Icons tipo="cadastro" tamanho={23} /> Cadastro
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover className="rounded-table">
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
                        <th className="th110" onClick={() => orderBy("fixo")}>
                            <div className="thArrow">
                                <span>Fixo</span>
                                <span>
                                    {ordenar === "fixo" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => orderBy("percentual")}>
                            <div className="thArrow">
                                <span>%</span>
                                <span>
                                    {ordenar === "percentual" && (ordem ? "▼" : "▲")}
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
                        !isLoading && data?.items.map((freteiro, index) => <ItemTable key={index} freteiro={freteiro} onEdit={() => setEdit(freteiro.id)} onDelete={() => setDelete(freteiro.id)} />)
                    }
                </tbody>
            </Table>
            {isLoading && <FragmentLoading />}
            <Row className="my-3">
                <Col xs className="d-flex">
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
                <td    className="centralize-icon"
                    onClick={onEdit}
                    role="button"
                    aria-label="Editar Freteiro">
                    <Icons tipo="edit" />
                </td>
                <td    className="centralize-icon"
                    onClick={onDelete}
                    role="button"
                    aria-label="Desativar Freteiro">
                    <Icons tipo="trash" />
                </td>
            </tr>
        </React.Fragment>
    )
}