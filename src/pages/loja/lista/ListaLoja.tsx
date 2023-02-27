import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { PaginationComponent } from "../../../datas/PaginationComponent";
import { Menu } from "@/datas/Menu";
import { ILoja, Loja } from "@/datatypes/loja";



export function ListaLoja() {
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


    const { isLoading, data, isError } = useQuery(["lojas"], async () => {
        const delay = new Promise(res => setTimeout(res, 3000));
        await delay;
        const loja = await Loja.search();
        setListFiltred(loja);
        return loja;
    });

    const [listFiltred, setListFiltred] = useState<Loja[] | null>(data ?? []);

    const listFiltered = (filtered: Loja[]) => {

        setListFiltred(filtered);
    }

    return (

        <Row>
            <Col className='body text-center'>
                <Row>
                    <Col>
                        <h1>loja Lista Notas 15/02/2023</h1>

                    </Col>
                </Row>
                <Row>
                    <Menu
                        links={[{ label: "Lista de Lojas", url: "/lojas" },
                        { label: "Cadastrar Loja", url: "/lojas/novo" }
                        ]}
                        showSearch={true}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                    />
                </Row>
                <Row >
                    {!isLoading && <Tableloja
                        listLoja={listFiltred ?? []}
                        pageSize={pageSize}
                        currentPage={currentPage}
                    />} {isLoading && <FragmentLoading />}
                </Row>
                <Row>
                    {!isLoading && <PaginationComponent<ILoja>
                        items={listFiltred ?? []}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />} {isLoading}

                </Row>
            </Col>
        </Row>
    );

}


interface IProps {
    currentPage: number;
    listLoja: ILoja[] | null;
    pageSize: number;

}

function Tableloja({ listLoja, currentPage, pageSize }: IProps) {

    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<keyof ILoja>("id");


    const handleSort = (newSortBy: keyof ILoja) => {
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

    const sortedList = listLoja
        ? [...listLoja].sort((a, b) => {
            let valueA = a[sortBy];
            let valueB = b[sortBy];
            if (sortBy === "nome") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            } else if (sortBy === "url_cotacao") {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            } else if (sortBy === "url_catalogo") {
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
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className="th100">
                            <span>ID:</span>
                            <span onClick={() => handleSort("id")} className="headTablesArrows">
                                {sortBy === "id" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th100">
                            <span>Nome:</span>
                            <span onClick={() => handleSort("nome")} className="headTablesArrows">
                                {sortBy === "nome" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th100">
                            <span>Cotação:</span>
                            <span onClick={() => handleSort("cotacao")} className="headTablesArrows">
                                {sortBy === "cotacao" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th100">
                            <span>URL Cotação:</span>
                            <span onClick={() => handleSort("url_cotacao")} className="headTablesArrows">
                                {sortBy === "url_cotacao" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th100">
                            <span>URL Cotação:</span>
                            <span onClick={() => handleSort("url_catalogo")} className="headTablesArrows">
                                {sortBy === "url_catalogo" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {listLoja
                    ? sortedList
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .concat(
                            Array.from(
                                { length: pageSize - (listLoja.length - (currentPage - 1) * pageSize) },
                                (_, i) => ({
                                    id: "",
                                    nome: "",
                                    cotacao: "",
                                    url_cotacao: "",
                                    url_catalogo: "",
                                })
                            ) as unknown as ILoja[]
                        )
                        .map((loja, index) => (
                            <tr className="tablesCss" key={index} onClick={() => navigate(`/lojas/${loja.id}`)}>
                                <td><b>{loja.id}</b></td>
                                <td><b className="th250">{loja.nome}</b></td>
                                <td className="tdValue"><b>R$: {loja.cotacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td><b>{loja.url_cotacao}</b></td>
                                <td><b>{loja.url_catalogo}</b></td>
                            </tr>
                        ))
                    : null}
            </tbody>
        </Table>
    );

}
