import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { Menu } from "@/pages/Menu";
import { Freteiro, IFreteiro } from "@/datatypes/freteiro";


export function ListaFreteiro() {
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


    const { isLoading, data, isError } = useQuery(["Freteiros"], async () => {
        const freteiro = await Freteiro.search();
        setListFiltred(freteiro);
        return freteiro;
    });

    const [listFiltred, setListFiltred] = useState<Freteiro[] | null>(data ?? []);

    const listFiltered = (filtered: Freteiro[]) => {
        setListFiltred(filtered);
    }

    return (
        <Row>
            <Col className='body text-center'>
                <Row>
                    <Col  className="styleTitle">
                        <h1 style={{ whiteSpace: 'nowrap' }}>Freteiro Lista Notas 15/02/2023</h1>
                    </Col>
                </Row>
                <Row>
                    <Menu
                        links={[{ label: "Lista de Freteiros", url: "/freteiro" },
                        { label: "Cadastrar Freteiro", url: "/freteiro/novo" }
                        ]}
                        showSearch={true}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                    />


                    {!isLoading && (
                        <TableFreteiro
                            listFreteiro={listFiltred ?? []}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />
                    )}
                    {isLoading && <FragmentLoading />}
                    {!isLoading && (
                        <PaginationComponent<IFreteiro>
                            items={listFiltred ?? []}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )} {isLoading}

                </Row>
            </Col>
        </Row>
    );

}

interface IProps {
    currentPage: number;
    listFreteiro: IFreteiro[] | null;
    pageSize: number;

}

function TableFreteiro({ listFreteiro, currentPage, pageSize }: IProps) {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [sortBy, setSortBy] = useState<keyof IFreteiro>("id");
    const navigate = useNavigate();



    const handleSort = (newSortBy: keyof IFreteiro) => {
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

    const sortedList = listFreteiro
        ? [...listFreteiro].sort((a, b) => {
            let valueA: string | number = a[sortBy].toString();
            let valueB: string | number = b[sortBy].toString();

            if (sortBy === "id") {
                valueA = parseInt(a[sortBy] as string);
                valueB = parseInt(b[sortBy] as string);
            } else if (sortBy === "fixo" || sortBy === "percentual" || sortBy === "prioridade" || sortBy === "valor_min" || sortBy === "valor_max") {
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
                    <th>
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
                        <div className="th150">
                            <span>Fixo:</span>
                            <span onClick={() => handleSort("fixo")} className="headTablesArrows">
                                {sortBy === "fixo" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th150">
                            <span>Percentual:</span>
                            <span onClick={() => handleSort("percentual")} className="headTablesArrows">
                                {sortBy === "percentual" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th150">
                            <span>Prioridade:</span>
                            <span onClick={() => handleSort("prioridade")} className="headTablesArrows">
                                {sortBy === "prioridade" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th150">
                            <span>Valor Minimo:</span>
                            <span onClick={() => handleSort("valor_min")} className="headTablesArrows">
                                {sortBy === "valor_min" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th150">
                            <span>Valor Maximo:</span>
                            <span onClick={() => handleSort("valor_max")} className="headTablesArrows">
                                {sortBy === "valor_max" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="th150">
                            <span>Global:</span>
                            <span onClick={() => handleSort("global")} className="headTablesArrows">
                                {sortBy === "global" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {listFreteiro
                    ? sortedList
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .concat(
                            Array.from(
                                { length: pageSize - (listFreteiro.length - (currentPage - 1) * pageSize) },
                                (_, i) => ({
                                    id: 0,
                                    nome: "",
                                    fixo: 0,
                                    percentual: 0,
                                    prioridade: 0,
                                    valor_min: 0,
                                    valor_max: 0,
                                    global: false,
                                })
                            ) as unknown as IFreteiro[]
                        )
                        .map((freteiro, index) => (
                            <tr className="tablesCss" key={index}>
                                    <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            Number(freteiro.id) !== 0 && navigate(`/freteiros/${freteiro.id}`);
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td><b>{freteiro.id}</b></td>
                                <td><b className="th250">{freteiro.nome}</b></td>
                                <td className="tdValue"><b>R$: {(freteiro.fixo / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>{freteiro.percentual}%</b></td>
                                <td><b>{freteiro.prioridade}</b></td>
                                <td className="tdValue"><b>R$: {(freteiro.valor_min / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>R$: {(freteiro.valor_max / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td><b>{freteiro.global === true ? "Sim" : freteiro.global === false ? "Não" : ""}</b></td>
                            </tr>
                        ))
                    : null}

            </tbody>
        </Table>

    );

}
