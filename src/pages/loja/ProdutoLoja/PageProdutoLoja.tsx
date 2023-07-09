import React, { useMemo, useState } from "react";
import { Row, Col, Table, Button, FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Icons } from "@/components/icons/icons";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ModalCadastroProdutoLoja } from "./ModalProdutoLoja/ModalCadastroProdutoLoja";
import { ModalImportProdutoLoja } from "./ModalProdutoLoja/ModalImportProdutoLoja";
import { ModalVinculo } from "./ModalProdutoLoja/ModalVinculo";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";


export function PageProdutoLoja() {
    const [params, setParams] = useSearchParams();
    const { lojaId } = useParams();
    const navigate = useNavigate();
    const [modalVinculoProduto, setVinculoProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [importProdutoLoja, setImportProdutoLoja] = useState<string | undefined>(undefined);
    const [cadastroProdutoLoja, setCadastroProdutoLoja] = useState<string | undefined>(undefined);
    const [filtro, setFiltro] = useState("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<IProdutoLoja>('nome');
    const [isFilteredDesvinculados, setIsFilteredDesvinculados] = useState(false);
    const [isFilteredVinculados, setIsFilteredVinculados] = useState(false);
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(9999);



    const { isFetching, data } = useQuery(["produtoloja", lojaId, filtro], () => {
        const produtoLoja = ProdutoLojaController.search(lojaId ?? "", filtro);
        return produtoLoja;
    });



    const produtosLoja = useMemo(() => {


        let dados = data?.map((produtoLoja: IProdutoLoja) => {
            return produtoLoja;
        }) ?? []

        dados = dados.filter((_, index) => index >= minRange && index < maxRange);

        if (isFilteredDesvinculados) {
            dados = dados.filter(produto => produto.vinculos === null || produto.vinculos.length === 0);
        }

        if (isFilteredVinculados) {
            dados = dados.filter(produto => produto.vinculos !== null && produto.vinculos.length > 0);

        }

        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);
        return {
            page, total, limit, items
        }
    }, [data, page, limit, sortBy, sortOrder, isFilteredDesvinculados, isFilteredVinculados, minRange, maxRange])

    const handlePageChange = (page: number) => {
        setParams(`?limit=${limit}&page=${page}`);
    };

    const handleFilterDesvinculados = () => {
        setIsFilteredDesvinculados(prevState => !prevState);
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }
    const handleFilterVinculados = () => {
        setIsFilteredVinculados(prevState => !prevState);
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }






    return (
        <React.Fragment>

            <ModalImportProdutoLoja onHide={() => setImportProdutoLoja(undefined)} lojaId={importProdutoLoja} />
            <ModalCadastroProdutoLoja onHide={() => setCadastroProdutoLoja(undefined)} lojaId={cadastroProdutoLoja} />
            <ModalVinculo onHide={() => setVinculoProduto(undefined)} produtoParaguay={modalVinculoProduto} />

            <Row className="my-3">
                <Col xs={6} className="d-flex">
                    <Button
                        className="me-3 d-flex align-items-center justify-content-center custom-btn"
                        onClick={() => navigate("/lojas")}
                    >
                        <Icons tipo="voltar" tamanho={22} />   Voltar
                    </Button>

                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`?limit=20&page=1`}
                        />
                    </FloatingLabel>

                </Col>
                <Col>
                    <div className="d-flex my-2">
                        <Form.Switch
                            type="checkbox"
                            label="Vinculado"
                            checked={isFilteredVinculados}
                            onChange={() => { }}
                            onMouseDown={e => {
                                e.preventDefault();
                                handleFilterVinculados();
                            }}
                            className="me-3 custom-switch"  // Adicionado a classe custom-switch

                        />

                        <Form.Switch
                            type="checkbox"
                            label="Não Vinculado"
                            checked={isFilteredDesvinculados}
                            onChange={() => { }}
                            onMouseDown={e => {
                                e.preventDefault();
                                handleFilterDesvinculados();
                            }}
                            className="me-3 custom-switch"
                        />
                    </div>
                </Col>


                <Col xs className="d-flex justify-content-end">
                    <Button
                        onClick={() => setCadastroProdutoLoja(lojaId)}
                        className="me-3 custom-btn"
                    >

                        <Icons tipo="import" tamanho={22} />  Importar

                    </Button>
                    <Button
                        className="custom-btn"
                        onClick={() => setImportProdutoLoja(lojaId)}
                    >
                        <Icons tipo="update" tamanho={22} />  Atualizar
                    </Button>
                </Col>
            </Row>


            <Table striped bordered hover className="rounded-table">

                <thead>
                    <tr>
                        <th className="th150" onClick={() => handleSort('codigo')} >
                            <div className="thArrow">
                                <span>Codigo</span>
                                <span>
                                    {sortBy === "codigo" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th250" onClick={() => handleSort('nome')} >
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {sortBy === "nome" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => handleSort('preco')}>
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {sortBy === "preco" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => handleSort('vinculos')}>
                            <div className="thArrow">
                                <span>Vinc.</span>
                                <span>
                                    {sortBy === "vinculos" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th70">
                            <span>Est.</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isFetching && produtosLoja?.items?.map((produtoLoja, index) => <ItemTable key={index} produtoLoja={produtoLoja} onVinculo={setVinculoProduto} />)
                    }
                </tbody>
            </Table>
            {isFetching && <FragmentLoading />}
            <Row className="my-3">
                <Col xs className="d-flex">
                    <PaginationComponent<IProdutoLoja>
                        items={produtosLoja?.total}
                        pageSize={produtosLoja.limit}
                        onPageChange={handlePageChange}
                        currentPage={produtosLoja.page ?? 1}
                    />

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-3 limitPagination">
                            Mostrando {produtosLoja.items.length} de {limit}
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
                    { /*  <Row className="my-3">
                        <Col xs>
                            <FloatingLabel className="w-100" label="Min">
                                <Form.Control type="number" min="0" value={minRange} onChange={(e) => setMinRange(parseInt(e.target.value))} />
                            </FloatingLabel>
                        </Col>
                        <Col xs>
                            <FloatingLabel className="w-100" label="Max">
                                <Form.Control type="number" min="0" value={maxRange} onChange={(e) => setMaxRange(parseInt(e.target.value))} />
                            </FloatingLabel>
                        </Col>
                    </Row>
*/}
                </Col>
            </Row>
        </React.Fragment>
    );
}

interface IPropsItensTable {
    produtoLoja: IProdutoLoja,
    onVinculo: (idProdutoParaguay: IProdutoLoja) => void,
}

function ItemTable({ produtoLoja, onVinculo }: IPropsItensTable) {
    return (

        <React.Fragment>
            <tr>
                <td>
                    {produtoLoja.codigo}
                </td>
                <td>
                    {produtoLoja.nome}
                </td>
                <td>
                    U$: {formatCurrency(produtoLoja.preco)}
                </td>
                <td
                    className="centralize-icon"
                    style={{
                        backgroundColor: produtoLoja.vinculos && produtoLoja.vinculos.length > 0 ? "green" : "red"
                    }}
                    onClick={() => { onVinculo(produtoLoja); }}
                    role="button"
                    aria-label="Vincular Produto"
                >
                    <Icons tipo="link" />
                </td>
                <td className="centralize-icon">
                    <Form.Check
                        checked={produtoLoja.estoque}
                        readOnly
                    />
                </td>
            </tr>
        </React.Fragment >
    );
}
