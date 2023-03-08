import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Menu } from "@/pages/Menu";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { IProduto, Produto } from "@/datatypes/produto";
import "@/assets/style.css"
import { abreviaLink } from "@/components/AbreviaLink";

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

    const { isLoading, data, isError } = useQuery(["Produtos"], async () => {
        const delay = new Promise(res => setTimeout(res, 3000));
        await delay;
        const produtos = await Produto.search();
        setListFiltred(produtos);
        return produtos;

    });

    const [listFiltred, setListFiltred] = useState<Produto[] | null>(data ?? []);

    const listFiltered = (filtered: Produto[]) => {
        setListFiltred(filtered);
    }

    return (

        <Row>
            <Col className='body text-center'>
                <Row>
                    <Col className="styleTitle">
                        <h1 style={{ whiteSpace: 'nowrap' }}>Produto Lista Notas 15/02/2023</h1>
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
                        showSearch={true}
                    />
                </Row><Row>
                    {!isLoading && (
                        <TableProduto
                            listProduto={listFiltred ?? []}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />
                    )}
                    {isLoading && <FragmentLoading />}
                </Row>
                <Row>
                    {!isLoading && (<PaginationComponent<IProduto>
                        items={listFiltred ?? []}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />)}
                    {isLoading}

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
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
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
            let valueC = a[sortBy];
            let valueD = b[sortBy];

            if (sortBy === "id") {
                valueA = parseInt(a[sortBy] as string);
                valueB = parseInt(b[sortBy] as string);
            } else if (sortBy === "nome") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            } else if (sortBy === "url_catalogo_classic") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            } else if (sortBy === "url_catalogo_premium") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            }

            if (sortOrder === "desc") {
                return typeof valueC === 'number' && typeof valueD === 'number'
                    ? valueC > valueD ? 1 : -1
                    : valueA > valueB ? 1 : -1;
            } else {
                return typeof valueC === 'number' && typeof valueD === 'number'
                    ? valueD > valueC ? 1 : -1
                    : valueB > valueA ? 1 : -1;
            }
        })
        : [];

    return (
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th >
                        <div className="th100">
                            <span>Editar:</span>
                        </div>
                    </th>
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
                        <div className="th150">
                            <span>Preço ML Classico:</span>
                            <span onClick={() => handleSort("preco_ml_classic")} className="headTablesArrows">
                                {sortBy === "preco_ml_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>


                    <th>
                        <div className="th150">
                            <span>Preço ML Premium:</span>
                            <span onClick={() => handleSort("preco_ml_premium")} className="headTablesArrows">
                                {sortBy === "preco_ml_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th150">
                            <span>Frete:</span>
                            <span onClick={() => handleSort("frete")} className="headTablesArrows">
                                {sortBy === "frete" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th100">
                            <span>Comissão Classico:</span>
                            <span onClick={() => handleSort("comissao_classic")} className="headTablesArrows">
                                {sortBy === "comissao_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th100">
                            <span>Comissão Premium:</span>
                            <span onClick={() => handleSort("comissao_premium")} className="headTablesArrows">
                                {sortBy === "comissao_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>

                    <th>
                        <div className="th250">
                            <span >URL Catálogo Clássico:</span>
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
                        .map((produtos, index) => (
                            <tr className="tablesCss" key={index}>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Number(produtos.id) !== 0 && navigate(`/produtos/${produtos.id}`);
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td><b>{produtos.id}</b></td>
                                <td><b className="th250">{produtos.nome}</b></td>
                                <td className="tdValue"><b>R$: {(produtos.preco_ml_classic / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>R$: {(produtos.preco_ml_premium / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>R$: {(produtos.frete / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>{produtos.comissao_classic}%</b></td>
                                <td className="tdValue"><b>{produtos.comissao_premium}%</b></td>
                                <td><a href={produtos.url_catalogo_classic} target="_blank">{abreviaLink(produtos.url_catalogo_classic,30)}</a></td>
                                <td><a href={produtos.url_catalogo_premium} target="_blank">{abreviaLink(produtos.url_catalogo_premium,30)}</a></td>
                            </tr>
                        ))
                    : null}

            </tbody>
        </Table>
    );
}


