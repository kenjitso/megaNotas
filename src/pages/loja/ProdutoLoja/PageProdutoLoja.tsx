import React, { useMemo, useState } from "react";
import { Row, Col, Table, Button, FloatingLabel, Form, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Icons } from "@/components/icons/icons";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/features/FormatCurrency";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ModalSyncVinculos } from "./ModalProdutoLoja/ModalSyncVinculos";
import { ModalAtualizarProdutoLoja } from "./ModalProdutoLoja/ModalAtualizarProdutoLoja";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";
import { ILoja, LojaController } from "@/datatypes/loja";
import { PaginationDown } from "@/components/pagination/PaginationDown";
import { PaginationUp } from "@/components/pagination/PaginationUp";
import { SortableTableHeader } from "@/components/pagination/SortableTableHeader";
import { formataSmartPhone } from "@/functions/produtos/formataSmartPhone";
import { formataSmartWatch } from "@/functions/produtos/formataSmartWatch";
import { format } from "date-fns";
import { ModalEditarProdutoLoja } from "./ModalEditarProdutoLoja";
import { ModalDeletaProdutoLoja } from "./ModalDeletaProdutoLoja";
import { ModalTableRemoveVinculo } from "./ModalProdutoLoja/ModalTableRemoveVinculo";
import { buildUrl } from "@/features/UrlLinkLojas";
import { toast } from "react-toastify";
import { SincronizaCatalogosStore } from "@/context/SincronizaCatalogosStore";
import { formataSemCategoria } from "@/functions/produtos/formataSemCategoria";


type Categoria = 'CELULAR' | 'RELOGIO' | 'SEM CATEGORIA';


export default function PageProdutoLoja() {
    const [params, setParams] = useSearchParams();
    const { lojaId } = useParams();
    const navigate = useNavigate();
    const [modalVinculoProduto, setVinculoProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [modalEditarProduto, setEditarProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [modalDeletaProduto, setDeletaProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [importProdutoLoja, setImportProdutoLoja] = useState<ILoja | undefined>(undefined);
    const [modalSyncVinculos, setSyncVinculos] = useState<IProdutoLoja[] | undefined>(undefined);
    const [filtro, setFiltro] = useState("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<IProdutoLoja>('nome');
    const [isFilteredDesvinculados, setIsFilteredDesvinculados] = useState(false);
    const [isFilteredVinculados, setIsFilteredVinculados] = useState(false);
    const [isCategoria, setCategoria] = useState<Categoria>("CELULAR");

    const { isLoading: isLojaLoading, data: lojaData } = useQuery(["loja", lojaId], () => {
        const data = LojaController.get(lojaId ?? "");
        return data;
    }, { enabled: !!lojaId });

    const { isFetching, isLoading: isProdutoLoading, data: produtosData } = useQuery(["produtosloja", lojaData], async () => {
        const produtosLoja = await ProdutoLojaController.search(lojaId ?? "");

        return produtosLoja?.map((produtoLoja: IProdutoLoja) => {
            const produtoLojaAtualizado = {
                ...produtoLoja,
                nome_original: produtoLoja.nome,
            };

            if (produtoLoja.nome.includes("CELULAR")) formataSmartPhone(produtoLojaAtualizado);
            if (produtoLoja.nome.includes("RELOGIO")) formataSmartWatch(produtoLojaAtualizado);
            if (!produtoLoja.nome.includes("CELULAR") || !produtoLoja.nome.includes("RELOGIO")) formataSemCategoria(produtoLojaAtualizado);

            return produtoLojaAtualizado;
        }) ?? [];
    });

    const produtosLoja = useMemo(() => {
        let dados = produtosData ?? [];

        if (filtro) {
            dados = dados.filter(produto => filterByAttributes(produto, filtro));
        }



        if (isFilteredDesvinculados) {
            dados = dados.filter(produto => !produto.vinculos || produto.vinculos.length === 0);
        }

        if (isFilteredVinculados) {
            dados = dados.filter(produto => produto.vinculos && produto.vinculos.length > 0);
        }

        if (isCategoria !== undefined) {
            if (isCategoria === 'SEM CATEGORIA') {
                dados = dados.filter(produto => !produto.categoria || produto.categoria === '');
            } else {
                dados = dados.filter(produto => produto.categoria === isCategoria);
            }
        }


        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));
        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);

        return {
            page, total, limit, items
        }
    }, [produtosData, page, limit, sortBy, sortOrder, filtro, isFilteredDesvinculados, isFilteredVinculados, isCategoria]);


    const handlePageChange = (page: number, newLimit?: number) => {
        const limitToUse = newLimit || limit;
        setParams(`?limit=${limitToUse}&page=${page}`);
    };

    const handleFilterDesvinculados = () => {
        setIsFilteredDesvinculados(prevState => !prevState);
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }
    const handleFilterVinculados = () => {
        setIsFilteredVinculados(prevState => !prevState);
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }

    const handleFilterCategoria = () => {
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }

    return (
        <React.Fragment>
            <ModalAtualizarProdutoLoja onHide={() => setImportProdutoLoja(undefined)} lojaId={importProdutoLoja} produtoParaguay={produtosData} />
            <ModalSyncVinculos onHide={() => setSyncVinculos(undefined)} lojaId={lojaData} produtosParaguay={modalSyncVinculos} />
            <ModalEditarProdutoLoja onHide={() => setEditarProduto(undefined)} lojaId={lojaData} produtoParaguay={modalEditarProduto} />
            <ModalDeletaProdutoLoja onHide={() => setDeletaProduto(undefined)} lojaId={lojaData} produtoParaguay={modalDeletaProduto} />
            <ModalTableRemoveVinculo onHide={() => setVinculoProduto(undefined)} lojaId={lojaData} produtoParaguay={modalVinculoProduto} />

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
                                    <Col xs={6}>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>

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
                                        </Dropdown.Item>

                                    </Col>
                                    <Col xs={6}>
                                        <Dropdown.Item as='div' onClick={(e) => e.stopPropagation()}>
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
                                        </Dropdown.Item>

                                    </Col>
                                </Row>

                            </Dropdown.Menu>

                        </Dropdown>
                    </OverlayTrigger>

                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="download-tooltip">Categoria</Tooltip>}
                    >
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className=" mx-2 custom-dropdown-categoria">
                                {isCategoria || 'SEM CATEGORIA'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { setCategoria('CELULAR'); handleFilterCategoria(); }}>CELULAR</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setCategoria('RELOGIO'); handleFilterCategoria(); }}>RELOGIO</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setCategoria('SEM CATEGORIA'); handleFilterCategoria(); }}>SEM CATEGORIA</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    </OverlayTrigger>

                </Col>
                <Col xs className="d-flex justify-content-end">
                    <Button
                        onClick={() => {
                            const produtosSemVinculos = produtosLoja.items.filter(produto => produto.vinculos.length === 0);
                            const produtoSemCategoria = produtosSemVinculos.find(produto => !produto.categoria);

                            if (produtoSemCategoria) {
                                toast.info(`Não é possivel vincular produto sem categoria o produto: ${produtoSemCategoria.codigo} não possui categoria.`);
                                return; // interrompe a execução do resto do código
                            }

                            if (produtosSemVinculos.length === 0) {
                                toast.info("Não há produtos sem vínculos.");
                                return;
                            }
                            setSyncVinculos(produtosSemVinculos);
                        }}
                        className="me-3 custom-btn"
                    >
                        <Icons tipo="update" tamanho={22} />  Vinc. Catalogos
                    </Button>


                    <Button
                        className="custom-btn"
                        onClick={() => setImportProdutoLoja(lojaData)}
                    >
                        <Icons tipo="update" tamanho={22} />  Atualizar/Cadastrar
                    </Button>
                </Col>
            </Row>

            <PaginationUp
                pageLimitSize={produtosLoja.limit}
                handlePageChange={handlePageChange}
                itemsTotal={produtosLoja.total}
                itemsLength={produtosLoja.items.length}
            />



            {(isProdutoLoading && isLojaLoading) && <FragmentLoading />}


            {!isProdutoLoading && !isLojaLoading &&

                <Table striped bordered hover className="rounded-table">

                    <thead>
                        <tr>
                            <SortableTableHeader css="th150" displayText="Codigo" sortKey="codigo" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th150" displayText="Marca" sortKey="marca" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th250" displayText="Modelo" sortKey="nome" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            {isCategoria !== "SEM CATEGORIA" && (
                                <>
                                    <SortableTableHeader css="th150" displayText="Rede" sortKey="rede" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                    <SortableTableHeader css="th150" displayText="Cor" sortKey="cor" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                </>
                            )}
                            {isCategoria === "CELULAR" && (
                                <>
                                    <SortableTableHeader css="th150" displayText="Origem" sortKey="origem" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                    <SortableTableHeader css="th100" displayText="Ram" sortKey="ram" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                    <SortableTableHeader css="th85" displayText="Capacidade" sortKey="capacidade" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                </>
                            )}

                            {isCategoria === "RELOGIO" && (
                                <>
                                    <SortableTableHeader css="th150" displayText="Tamanho Caixa" sortKey="caixaMedida" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                    <SortableTableHeader css="th150" displayText="Pulseira" sortKey="tipoPulseira" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                </>
                            )}
                            <SortableTableHeader css="th130" displayText="Preço U$" sortKey="preco" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            {isCategoria !== "SEM CATEGORIA" && (
                                <>
                                    <SortableTableHeader css="th170" displayText="Ult. Att." sortKey="ultima_atualizacao" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                    <SortableTableHeader css="th70" displayText="Vinc." sortKey="vinculos" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                                </>
                            )}
                            <th className="th70">
                                <span></span>
                            </th>
                            <th className="th70">
                                <span></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isFetching && produtosLoja?.items?.map((produtoLoja, index) => <ItemTable key={index} produtoLoja={produtoLoja} onVinculo={setVinculoProduto} onEditar={setEditarProduto} onDelete={setDeletaProduto} lojaData={lojaData} isCategoria={isCategoria} />)}
                    </tbody>
                </Table>

            }

            <PaginationDown
                handlePageChange={handlePageChange}
                itemsTotal={produtosLoja.total}
                pageLimitSize={produtosLoja.limit}
                currentPage={produtosLoja.page ?? 1}
                itemsLength={produtosLoja.items.length}
            />

        </React.Fragment>
    );
}

interface IPropsItensTable {
    produtoLoja: IProdutoLoja,
    lojaData?: ILoja,
    isCategoria: string;
    onVinculo: (idProdutoParaguay: IProdutoLoja) => void,
    onEditar: (idProdutoParaguay: IProdutoLoja) => void,
    onDelete: (idProdutoParaguay: IProdutoLoja) => void,
}

function ItemTable({ produtoLoja, onVinculo, onEditar, onDelete, lojaData, isCategoria }: IPropsItensTable) {
    return (

        <React.Fragment>

            <tr>
                <td>
                    {produtoLoja.codigo}
                </td>
                <td>
                    {produtoLoja.marca}
                </td>
                <td>
                    <a
                        style={{ color: "blue" }}
                        href={buildUrl(lojaData?.algoritmo || 0, produtoLoja?.codigo || "")}

                        target="_blank"
                        rel="noopener noreferrer"
                        title={produtoLoja.codigo}
                    >
                        {produtoLoja.nome}
                    </a>
                </td>

                {isCategoria !== "SEM CATEGORIA" && (
                    <>
                        <td>{produtoLoja.cor}</td>
                        <td>{produtoLoja.rede === 0 ? "N/A" : produtoLoja.rede + "G"}</td>
                    </>
                )}
                {isCategoria === "CELULAR" && (
                    <>
                        <td>{produtoLoja.origem}</td>
                        <td>{produtoLoja.ram}</td>
                        <td>{produtoLoja.capacidade}</td>
                    </>
                )}

                {isCategoria === "RELOGIO" && (
                    <>
                        <td>{produtoLoja.caixaMedida}</td>
                        <td>{produtoLoja.tipoPulseira}</td>
                    </>
                )}

                <td>U$: {formatCurrency(produtoLoja.preco)}</td>
                {isCategoria !== "SEM CATEGORIA" && (
                    <>
                        <td>{format(produtoLoja.ultima_atualizacao, 'dd/MM/yyyy HH:mm')}</td>
                        <td
                            className="centralize-icon"
                            style={{
                                backgroundColor: produtoLoja.vinculos && produtoLoja.vinculos.length > 0 ? "green" : "red"
                            }}
                            onClick={() => { onVinculo(produtoLoja); }}
                            role="button"
                            aria-label={`Vinculos: ${produtoLoja.vinculos.length}`}
                        >

                            <Icons tipo="link" />
                        </td>
                    </>
                )}
                <td
                    className="centralize-icon"

                    onClick={() => { onEditar(produtoLoja); }}
                    role="button"
                >
                    <Icons tipo="edit" />
                </td>

                <td
                    className="centralize-icon"
                    onClick={() => { onDelete(produtoLoja); }}
                    role="button"
                >
                    <Icons tipo="trash" />
                </td>

            </tr>
        </React.Fragment >
    );
}


function filterByAttributes(produto: IProdutoLoja, filtro: string) {
    const loweredFiltro = filtro.toLowerCase();
    return produto.codigo.toLowerCase().includes(loweredFiltro) ||
        produto.marca.toLowerCase().includes(loweredFiltro) ||
        produto.nome.toLowerCase().includes(loweredFiltro) ||
        produto.cor.toLowerCase().includes(loweredFiltro);
}