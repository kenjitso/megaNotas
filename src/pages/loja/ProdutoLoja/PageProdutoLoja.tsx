import React, { Suspense, useMemo, useState } from "react";
import { Row, Col, Table, Button, FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Icons } from "@/components/icons/icons";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/features/FormatCurrency";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ModalSyncVinculos } from "./ModalProdutoLoja/ModalSyncVinculos";
import { ModalAtualizarProdutoLoja } from "./ModalProdutoLoja/ModalAtualizarProdutoLoja";
import { ModalVinculo } from "./ModalProdutoLoja/ModalVinculoCopy";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";
import { ILoja, LojaController } from "@/datatypes/loja";
import { formataXiaomiAtacadoGames } from "@/functions/lojas/atacadoGames/formataProdutos/xiaomi/xiaomi";
import { formataIphoneAtacadoGames } from "@/functions/lojas/atacadoGames/formataProdutos/apple/iphone";
import { formataXiaomiMega } from "@/functions/lojas/mega/formataProdutos/xiaomi/xiaomi";
import { PaginationDown } from "@/components/pagination/PaginationDown";
import { PaginationUp } from "@/components/pagination/PaginationUp";
import { SortableTableHeader } from "@/components/pagination/SortableTableHeader";



export function PageProdutoLoja() {
    const [params, setParams] = useSearchParams();
    const { lojaId } = useParams();
    const navigate = useNavigate();
    const [modalVinculoProduto, setVinculoProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [importProdutoLoja, setImportProdutoLoja] = useState<ILoja | undefined>(undefined);
    const [modalSyncVinculos, setSyncVinculos] = useState<IProdutoLoja[] | undefined>(undefined);
    const [filtro, setFiltro] = useState("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<IProdutoLoja>('nome');
    const [isFilteredDesvinculados, setIsFilteredDesvinculados] = useState(false);
    const [isFilteredVinculados, setIsFilteredVinculados] = useState(false);

    const { isLoading: isLojaLoading, data: lojaData } = useQuery(["loja", lojaId], () => {
        const data = LojaController.get(lojaId ?? "");
        return data;
    }, { enabled: !!lojaId });

    const { isFetching, isLoading: isProdutoLoading, data: produtosData } = useQuery(["produtosloja", lojaData, filtro], async () => {
        const produtosLoja = await ProdutoLojaController.search(lojaId ?? "", filtro);

        return produtosLoja?.map((produtoLoja: IProdutoLoja) => {
            const produtoLojaAtualizado = {
                ...produtoLoja,
                nome_original: produtoLoja.nome,
            };

            if (lojaData?.algoritmo === 1) {
                console.log("??");
                const marca =
                    /XIAOMI/i.test(produtoLoja.nome) ? "XIAOMI" :
                        /APPLE/i.test(produtoLoja.nome) ? "APPLE" :
                            null;

                if (marca === "XIAOMI") {
                    formataXiaomiAtacadoGames(produtoLojaAtualizado);
                }

                if (marca === "APPLE") {
                    formataIphoneAtacadoGames(produtoLojaAtualizado);
                }
            }
            if (lojaData?.algoritmo === 7) {
                const marca =
                    /XIAOMI/i.test(produtoLoja.nome) ? "XIAOMI" :
                        /APPLE/i.test(produtoLoja.nome) ? "APPLE" :
                            null;

                if (marca === "XIAOMI") {
                    formataXiaomiMega(produtoLojaAtualizado);
                }
            }

            return produtoLojaAtualizado;
        }) ?? [];
    });


    const produtosLoja = useMemo(() => {


        let dados = produtosData ?? [];

        if (isFilteredDesvinculados) {
            dados = dados.filter(produto => produto.vinculos === null || produto.vinculos.length === 0);
        }

        if (isFilteredVinculados) {
            dados = dados.filter(produto => produto.vinculos !== null && produto.vinculos.length > 0);
        }

        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const allItems = sortedData;
        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);


        return {
            page, total, limit, items, allItems
        }
    }, [produtosData, page, limit, sortBy, sortOrder, isFilteredDesvinculados, isFilteredVinculados]);




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

    return (
        <React.Fragment>
            <ModalAtualizarProdutoLoja onHide={() => setImportProdutoLoja(undefined)} lojaId={importProdutoLoja} produtoParaguay={produtosData} />
            <ModalSyncVinculos onHide={() => setSyncVinculos(undefined)} lojaId={lojaData} produtoParaguay={modalSyncVinculos} />
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
                        onClick={() => {
                            const produtosSemVinculos = produtosLoja.items.filter(produto => produto.vinculos.length === 0);
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
                            <SortableTableHeader css="th250" displayText="Marca" sortKey="marca" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th250" displayText="Modelo" sortKey="nome" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th250" displayText="Origem" sortKey="origem" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th250" displayText="Cor" sortKey="cor" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th150" displayText="Rede" sortKey="rede" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th150" displayText="Ram" sortKey="ram" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th150" displayText="Capacidade" sortKey="capacidade" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th130" displayText="Preço U$" sortKey="preco" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <SortableTableHeader css="th70" displayText="Vinc." sortKey="vinculos" handleSort={handleSort} sortOrder={sortOrder} sortBy={sortBy} />
                            <th className="th70">
                                <span>Est.</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isFetching && produtosLoja?.items?.map((produtoLoja, index) => <ItemTable key={index} produtoLoja={produtoLoja} onVinculo={setVinculoProduto} lojaData={lojaData} />)}
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
    onVinculo: (idProdutoParaguay: IProdutoLoja) => void,
}

function ItemTable({ produtoLoja, onVinculo, lojaData }: IPropsItensTable) {
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
                        href={lojaData?.algoritmo === 1
                            ? `https://atacadogames.com/lista-produtos/termo/${produtoLoja.codigo}/1`
                            : (lojaData?.algoritmo === 7
                                ? `https://www.megaeletro.com.py/br/p/${produtoLoja.codigo}/1`
                                : '#')}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={produtoLoja.codigo}
                    >
                        {produtoLoja.nome}
                    </a>

                </td>
                <td>
                    {produtoLoja.origem}
                </td>
                <td>
                    {produtoLoja.cor}
                </td>
                <td>
                    {produtoLoja.rede}G
                </td>
                <td>
                    {produtoLoja.ram}
                </td>
                <td>
                    {produtoLoja.capacidade}
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
                    aria-label={`Vinculos: ${produtoLoja.vinculos.length}`}
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
