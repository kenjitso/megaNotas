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
import { Icons } from "@/components/icons/icons";

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
      //  const delay = new Promise(res => setTimeout(res, 1000));
      //  await delay;
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
            <Col>
                <Row>
                    <Menu
                        links={[
                            { label: "Lista de produtos", url: "/produtos" },
                            { label: "Cadastrar produto", url: "/produtos/novo" },
                        ]}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                        showSearch={true}
                        showCadAtu={false}                
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
                    <th className="th70">
                        <div className="thArrow">
                            <span>ID</span>
                            <span onClick={() => handleSort("id")} className="headTablesArrows">
                                {sortBy === "id" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th200">
                        <div className="thArrow">
                            <span>Nome</span>
                            <span onClick={() => handleSort("nome")} className="headTablesArrows">
                                {sortBy === "nome" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th170">
                        <div className="thArrow">
                            <span>Preço Classico</span>
                            <span onClick={() => handleSort("preco_ml_classic")} className="headTablesArrows">
                                {sortBy === "preco_ml_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>


                    <th className="th170">
                        <div className="thArrow">
                            <span>Preço Premium</span>
                            <span onClick={() => handleSort("preco_ml_premium")} className="headTablesArrows">
                                {sortBy === "preco_ml_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>



                    <th className="th130">
                        <div className="thArrow">
                            <span>% Classico</span>
                            <span onClick={() => handleSort("comissao_classic")} className="headTablesArrows">
                                {sortBy === "comissao_classic" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th130">
                        <div className="thArrow">
                            <span>% Premium</span>
                            <span onClick={() => handleSort("comissao_premium")} className="headTablesArrows">
                                {sortBy === "comissao_premium" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
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
                                    comissao_classic: "",
                                    comissao_premium: "",
                                })
                            ) as unknown as IProduto[]
                        )
                        .map((produtos, index) => (
                            <tr className="tablesCss" key={index}>
                                <td>{produtos.id}</td>
                                <td>{produtos.nome}</td>
                                <td className="tdValue">R$: {(produtos.preco_ml_classic / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="tdValue">R$: {(produtos.preco_ml_premium / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="tdValue">{produtos.comissao_classic}%</td>
                                <td className="tdValue">{produtos.comissao_premium}%</td>
                                <td onClick={(e) => {
                                    e.stopPropagation();
                                    Number(produtos.id) !== 0 && navigate(`/produtos/${produtos.id}`);
                                }}
                                    role="button"
                                    aria-label="Desativar Loja">
                                    <Icons tipo="edit" />
                                </td>
                                <td onClick={(e) => {
                                    e.stopPropagation();
                                    Number(produtos.id) !== 0 && navigate(`/produtos/${produtos.id}`);
                                }}
                                    role="button"
                                    aria-label="Desativar Produto">
                                    <Icons tipo="trash" />
                                </td>
                            </tr>
                        ))
                    : null}

            </tbody>
        </Table>
    );
}


