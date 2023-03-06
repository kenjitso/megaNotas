import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Menu } from "@/pages/Menu";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { IProduto, Produto } from "@/datatypes/produto";
import "@/assets/style.css"

export function ListaProduto() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const page = params.get("page");


    const [currentPage, setCurrentPage] = useState(1);
    var pageSize = 10;


    useEffect(() => {
        if (page !== null) {
            setCurrentPage(Number(page));
        }
    }, [page]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    const { isLoading, data, isError, refetch } = useQuery(["produtos"], async () => {
        const delay = new Promise(res => setTimeout(res, 3000));
        await delay;
        const produtos = await Produto.search();
        setListFiltred(produtos);
        return produtos;

    });

    const [listFiltred, setListFiltred] = useState<Produto[] | null>(data ?? []);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleListRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
        setCurrentPage(1);
    };

    const listFiltered = (filtered: Produto[]) => {
        setListFiltred(filtered);
    }

    return (

        <Row>
            <Col className='body text-center'>
                <Row>
                    <Col>
                        <h1>Produto Lista Notas 15/02/2023</h1>
                    </Col>
                </Row>
                <Row>
                    <Menu
                        links={[
                            { label: "Lista de Produtos", url: "/produtos" },
                            { label: "Cadastrar Produto", url: "/produtos/novo" },
                        ]}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                        onListRefresh={handleListRefresh}
                        showSearch={true}
                    />
                    {!isLoading && !isRefreshing && (
                        <TableProduto
                            listProduto={listFiltred ?? []}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />
                    )}
                    {(isLoading || isRefreshing) && <FragmentLoading />}
                    {!isLoading && !isRefreshing && (
                        <PaginationComponent
                            items={listFiltred ?? []}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )}
                </Row>
            </Col>
        </Row>
    );
}

interface IProps {
    currentPage: number;
    listProduto: IProduto[] | null;
    pageSize: number;
}

function TableProduto({ listProduto, currentPage, pageSize }: IProps) {
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<keyof IProduto>("id");

    const handleSort = (newSortBy: keyof IProduto) => {
        if (newSortBy === sortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortOrder("asc");
            setSortBy(newSortBy);
        }
    };

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const sortedList = listProduto
        ? [...listProduto].sort((a, b) => {
            let valueA: string | number = a[sortBy].toString();
            let valueB: string | number = b[sortBy].toString();
          
            if (sortBy === "id") {
                valueA = parseInt(a[sortBy] as string);
                valueB = parseInt(b[sortBy] as string);
            } else
            if (sortBy === "nome") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            } else if (sortBy === "url_catalogo_classic") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            } else if (sortBy === "url_catalogo_premium") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            }

            if (sortOrder === "asc") {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueB > valueA ? 1 : -1;
            }
        })
        : [];

    return (
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th >
                        <div className="th100">
                            <span>ID:</span>
                            <span onClick={() => handleSort("id")} className="headTablesArrows">
                                {sortBy === "id" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th >
                        <div className="th250">
                            <span>Nome:</span>
                            <span onClick={() => handleSort("nome")} className="headTablesArrows">
                                {sortBy === "nome" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th200">
                            <span>Preço ML Classico:</span>
                            <span onClick={() => handleSort("preco_ml_classic")} className="headTablesArrows">
                                {sortBy === "preco_ml_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>


                    <th>
                        <div className="th200">
                            <span>Preço ML Premium:</span>
                            <span onClick={() => handleSort("preco_ml_premium")} className="headTablesArrows">
                                {sortBy === "preco_ml_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th100">
                            <span>Frete:</span>
                            <span onClick={() => handleSort("frete")} className="headTablesArrows">
                                {sortBy === "frete" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th200">
                            <span>Comissão Classico:</span>
                            <span onClick={() => handleSort("comissao_classic")} className="headTablesArrows">
                                {sortBy === "comissao_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th200">
                            <span>Comissão Premium:</span>
                            <span onClick={() => handleSort("comissao_premium")} className="headTablesArrows">
                                {sortBy === "comissao_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th250">
                            <span>URL Catálogo Clássico:</span>
                            <span onClick={() => handleSort("url_catalogo_classic")} className="headTablesArrows">
                                {sortBy === "url_catalogo_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th150">
                            <span> URL Catálogo Premium:</span>
                            <span onClick={() => handleSort("url_catalogo_premium")} className="headTablesArrows">
                                {sortBy === "url_catalogo_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {listProduto
                    ? sortedList
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .concat(
                            Array.from(
                                { length: pageSize - (listProduto.length - (currentPage - 1) * pageSize) },
                                (_, i) => ({
                                    id: 0,
                                    nome: "",
                                    preco_ml_classic: "",
                                    preco_ml_premium: "",
                                    frete: "",
                                    comissao_classic: "",
                                    comissao_premium: "",
                                    url_catalogo_classic: "",
                                    url_catalogo_premium: "",
                                })
                            ) as unknown as IProduto[]
                        )
                        .map((product, index) => (
                            <tr className="tablesCss" key={index} onClick={() => navigate(`/produtos/${product.id}`)}>
                                <td><b>{product.id}</b></td>
                                <td><b className="th250">{product.nome}</b></td>
                                <td className="tdValue"><b>R$: {product.preco_ml_classic.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>R$: {product.preco_ml_premium.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>R$: {product.frete.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>{product.comissao_classic}%</b></td>
                                <td className="tdValue"><b>{product.comissao_premium}%</b></td>
                                <td><b>{product.url_catalogo_classic}</b></td>
                                <td><b>{product.url_catalogo_premium}</b></td>
                            </tr>
                        ))
                    : null}

            </tbody>
        </Table>
    );
}


