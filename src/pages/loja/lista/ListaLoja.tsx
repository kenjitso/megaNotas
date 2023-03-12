import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { PaginationComponent } from "../../../datas/PaginationComponent";
import { Menu } from "@/pages/Menu";
import { ILoja, Loja } from "@/datatypes/loja";
import { Icons } from "@/components/icons/icons";
import React from "react";

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


    const { isLoading, data } = useQuery(["Lojas"], async () => {
        //     const delay = new Promise(res => setTimeout(res, 1000));
        //await delay;
        const loja = await Loja.search();
        setListFiltred(loja);
        return loja;
    });


    const [listFiltred, setListFiltred] = useState<Loja[] | null>(data ?? []);

    const listFiltered = (filtered: Loja[]) => {

        setListFiltred(filtered);
    }

    return (
        <React.Fragment>
            <Col>
                <Row>
                    <Menu
                        links={[{ label: "Lista de lojas", url: "/lojas" },
                        { label: "Cadastrar loja", url: "/lojas/novo" }
                        ]}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                        showSearch={true}
                        showCadAtu={false}
                    />
                </Row>
                <Row >
                    {!isLoading && (
                        <Tableloja
                            listLoja={listFiltred ?? []}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />)}
                    {isLoading && <FragmentLoading />}
                </Row>
                <Row>
                    {!isLoading && (<PaginationComponent<ILoja>
                        items={listFiltred ?? []}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />)}
                    {isLoading}

                </Row>
            </Col>
        </React.Fragment>
    );
}

interface IProps {
    currentPage: number;
    listLoja: ILoja[] | null;
    pageSize: number;
}

function Tableloja({ listLoja, currentPage, pageSize }: IProps) {

    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [sortBy, setSortBy] = useState<keyof ILoja>("id");


    const handleSort = (newSortBy: keyof ILoja) => {
        if (newSortBy === sortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortOrder("asc");
            setSortBy(newSortBy as keyof ILoja);
        }
    };

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    const sortedList = listLoja
        ? [...listLoja].sort((a, b) => {
            let valueA: string | number = a[sortBy].toString();
            let valueB: string | number = b[sortBy].toString();

            if (sortBy === "id") {
                valueA = parseInt(a[sortBy] as string);
                valueB = parseInt(b[sortBy] as string);
            } else if (sortBy === "cotacao") {
                valueA = parseFloat(a[sortBy] as unknown as string);
                valueB = parseFloat(b[sortBy] as unknown as string);
            } else {
                valueA = capitalizeFirstLetter(a[sortBy] as string);
                valueB = capitalizeFirstLetter(b[sortBy] as string);
            }

            if (sortOrder === "desc") {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueB > valueA ? 1 : -1;
            }
        })
        : [];


    return (
        <Table bordered hover>
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
                    <th className="th110">
                        <div className="thArrow">
                            <span>Cotação</span>
                            <span onClick={() => handleSort("cotacao")} className="headTablesArrows">
                                {sortBy === "cotacao" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
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
                {listLoja
                    ? sortedList
                        .slice(
                            (currentPage - 1) * pageSize, currentPage * pageSize)
                        .concat(
                            Array.from(
                                { length: pageSize - (listLoja.length - (currentPage - 1) * pageSize) },
                                (_, i) => ({
                                    id: 0,
                                    nome: "",
                                    cotacao: 0,
                                })
                            ) as unknown as ILoja[]
                        )
                        .map((loja, index) => (
                            <tr key={index} style={{ cursor: 'pointer' }}>
                                <td>{loja.id}</td>
                                <td>{loja.nome}</td>
                                <td className="tdValue">R$: {(loja.cotacao / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td onClick={(e) => {

                                    Number(loja.id) !== 0 && navigate(`/lojas/${loja.id}`);
                                }}
                                    role="button"
                                    aria-label="Desativar Loja">
                                    <Icons tipo="edit" />
                                </td>
                                <td onClick={(e) => {

                                    Number(loja.id) !== 0 && navigate(`/lojas/${loja.id}`);
                                }}
                                    role="button"
                                    aria-label="Desativar Loja">
                                    <Icons tipo="trash" />
                                </td>
                            </tr>
                        ))
                    : null}
            </tbody>
        </Table>
    );

}
