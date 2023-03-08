import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { PaginationComponent } from "../../../datas/PaginationComponent";
import { Menu } from "@/pages/Menu";
import { ILoja, Loja } from "@/datatypes/loja";
import { abreviaLink } from "@/components/AbreviaLink";

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


    const { isLoading, data} = useQuery(["Lojas"], async () => {
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
                    <Col className="styleTitle">
                        <h1 style={{ whiteSpace: 'nowrap' }}>loja Lista Notas 15/02/2023</h1>

                    </Col>
                </Row>
                <Row>
                    <Menu
                        links={[{ label: "Lista de Lojas", url: "/lojas" },
                        { label: "Cadastrar Loja", url: "/lojas/novo" }
                        ]}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                        showSearch={true}
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
        <Table striped bordered hover>
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
                    <th>
                        <div className="th250">
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
                        <div className="th250">
                            <span>URL Cotação:</span>
                            <span onClick={() => handleSort("url_cotacao")} className="headTablesArrows">
                                {sortBy === "url_cotacao" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th250">
                            <span>URL Catálogo:</span>
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
                        .slice(
                            (currentPage - 1) * pageSize, currentPage * pageSize)
                        .concat(
                            Array.from(
                                { length: pageSize - (listLoja.length - (currentPage - 1) * pageSize) },
                                (_, i) => ({
                                    id: 0,
                                    nome: "",
                                    cotacao: 0,
                                    url_cotacao: "",
                                    url_catalogo: "",
                                })
                            ) as unknown as ILoja[]
                        )
                        .map((loja, index) => (
                            <tr className="tablesCss" key={index}>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Number(loja.id) !== 0 && navigate(`/lojas/${loja.id}`);
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td><b>{loja.id}</b></td>
                                <td><b className="th250">{loja.nome}</b></td>
                                <td className="tdValue"><b>R$: {(loja.cotacao / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td><a href={loja.url_cotacao} target="_blank">{abreviaLink(loja.url_cotacao,40)}</a></td>
                                <td><a href={loja.url_catalogo} target="_blank">{abreviaLink(loja.url_catalogo,40)}</a></td>
                            </tr>
                        ))
                    : null}
            </tbody>
        </Table>
    );

}
