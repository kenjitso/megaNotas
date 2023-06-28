import { useState } from "react";
import { Button, Col, FloatingLabel, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { CatalogoController, ICatalogo } from "@/datatypes/catalogo";
import "@/assets/style.css"
import { ModalCadastroCatalogo } from "./ModalCadastroCatalogo";
import ratata from "../../assets/megaPreco.svg";
import React from "react";
import useDataTypes from "@/hooks/useDataTypes";
import { ModalDesativaCatalogo } from "./ModalDesativaCatalogo";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Icons } from "@/components/icons/icons";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { ILoja } from "@/datatypes/loja";
import { ModalLoadingUpdate } from "./ModalLoadingUpdate";

export function PageCatalogo() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [catalogoIdEdit, setEdit] = useState<string | undefined>(undefined);
    const [catalogoLoadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [catalogoIdDelete, setDelete] = useState("");
    const [filtro, setFiltro] = useState("");

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data,
    } = useDataTypes<ICatalogo>({
        queryKey: ["catalogos", page ?? "1", "10"],
        queryFn: async () => await CatalogoController.search(parseInt(page ?? "1"), 10, filtro, ordenar, ordem ? "crescente" : "descrescente", true),
        filtro: filtro,
        defaultOrder: "nome",
    });

    const handlePageChange = (page: number) => {
        navigate(`/catalogos/${page}`);
    };



    return (
        <React.Fragment>

            <ModalDesativaCatalogo onHide={() => setDelete("")} catalogoId={catalogoIdDelete} />
            <ModalCadastroCatalogo onHide={() => setEdit(undefined)} catalogoId={catalogoIdEdit} />
            <ModalLoadingUpdate onHide={() => setLoadingUpdate(false)} isVisible={catalogoLoadingUpdate} catalogos={data?.total} />

            <Row className="my-3">
                <Col xs className="d-flex">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/catalogos/1`}
                        />
                    </FloatingLabel>
                </Col>
                <Col xs className="d-flex justify-content-end">
                    <Button
                        onClick={() => setLoadingUpdate(true)}
                        className="me-3 custom-btn"
                    >
                        <Icons tipo="update" tamanho={23} /> Sincronizar
                    </Button>

                    <Button
                        className="custom-btn "
                        onClick={() => setEdit("")}
                    >
                        <Icons tipo="cadastro" tamanho={23} /> Cadastro
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>
                        <th className="th70" >

                        </th>
                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => orderBy("comissao")}>
                            <div className="thArrow">
                                <span>Comissão</span>
                                <span>
                                    {ordenar === "comissao" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("frete")}>
                            <div className="thArrow">
                                <span>Frete</span>
                                <span>
                                    {ordenar === "frete" && (ordem ? "▼" : "▲")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("preco")}>
                            <div className="thArrow">
                                <span>Preço</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▼" : "▲")}
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
                        !isLoading && data?.items.map((catalogo, index) => <ItemTable key={index} catalogo={catalogo} onEdit={() => setEdit(catalogo.id)} onDelete={() => setDelete(catalogo.id)} />)
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
        </React.Fragment >
    );
}

interface IPropItensTable {
    catalogo: ICatalogo,
    onEdit: () => void,
    onDelete: () => void,
}

function ItemTable({ catalogo, onEdit, onDelete }: IPropItensTable) {
    return (
        <tr>
            <td className="image-cell">
                <img
                    className="responsive-image"
                    src={catalogo.url_thumbnail || ratata}
                    alt="Descrição da imagem"
                />
            </td>
            <td>
                <a style={{ color: "blue" }} href={catalogo.url_catalogo} target="_blank" rel="noopener noreferrer">{catalogo.nome}</a>
            </td>
            <td className="tdValue"> {catalogo.comissao * 100}%</td>
            <td className="tdValue">
                R$: {formatCurrency(catalogo.frete)}
            </td>
            <td className="tdValue">
                R$: {formatCurrency(catalogo.preco)}
            </td>
            <td className="centralize-icon"
                onClick={onEdit}
                role="button"
                aria-label="Editar Catalogo"
            >
                <Icons tipo="edit" />
            </td>
            <td className="centralize-icon"
                onClick={onDelete}
                role="button"
                aria-label="Desativar Catalogo"
            >
                <Icons tipo="trash" />
            </td>
        </tr>
    );
}