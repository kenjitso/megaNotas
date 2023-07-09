import { useMemo, useState } from "react";
import { Button, Col, Dropdown, FloatingLabel, Row, Table } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { ModalSincronismoUpdate } from "./ModalSincronismoUpdate";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";


export function PageCatalogo() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const [catalogoIdEdit, setEdit] = useState<string | undefined>(undefined);
    const [catalogoSincronismoUpdate, setSincronismoUpdate] = useState<boolean>(false);
    const [catalogoIdDelete, setDelete] = useState("");
    const [filtro, setFiltro] = useState("");
    const { sortOrder, sortBy, handleSort } = useSort<ICatalogo>('nome');


    const { isFetching, data } = useQuery(["catalogos", filtro], () => {
        const catalogos = CatalogoController.search(filtro);
        return catalogos;
    });


    const catalogos = useMemo(() => {

        let dados = data?.map((catalogo: ICatalogo) => {
            return catalogo;
        }) ?? []

        dados = dados.filter(catalogo => catalogo.ativo === true);

        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);
        return {
            page, total, limit, items
        }
    }, [data, page, limit, sortBy, sortOrder])



    const handlePageChange = (page: number) => {
        setParams(`?limit=${limit}&page=${page}`);
    };



    return (
        <React.Fragment>

            <ModalDesativaCatalogo onHide={() => setDelete("")} catalogoId={catalogoIdDelete} />
            <ModalCadastroCatalogo onHide={() => setEdit(undefined)} catalogoId={catalogoIdEdit} />
            <ModalSincronismoUpdate onHide={() => setSincronismoUpdate(false)} isVisible={catalogoSincronismoUpdate} catalogos={catalogos?.total} />

            <Row className="my-3">
                <Col xs className="d-flex">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/catalogos/?limit=${limit}&page=${page}`}
                        />
                    </FloatingLabel>
                </Col>
                <Col xs className="d-flex justify-content-end">
                    <Button
                        onClick={() => setSincronismoUpdate(true)}
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
                        <th className="th200" onClick={() => handleSort("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {sortBy === "nome" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => handleSort("comissao")}>
                            <div className="thArrow">
                                <span>Comissão</span>
                                <span>
                                    {sortBy === "comissao" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort("frete")}>
                            <div className="thArrow">
                                <span>Frete</span>
                                <span>
                                    {sortBy === "frete" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => handleSort("preco")}>
                            <div className="thArrow">
                                <span>Preço</span>
                                <span>
                                    {sortBy === "preco" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
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
                        !isFetching && catalogos?.items?.map((catalogo, index) => <ItemTable key={index} catalogo={catalogo} onEdit={() => setEdit(catalogo.id)} onDelete={() => setDelete(catalogo.id ?? "")} />)
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
                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-3 limitPagination">
                            Mostrando {catalogos.items.length} de {limit}
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