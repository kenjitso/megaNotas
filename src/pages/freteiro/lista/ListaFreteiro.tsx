import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { Menu } from "@/pages/Menu";
import { Freteiro, IFreteiro } from "@/datatypes/freteiro";
import { Icons } from "@/components/icons/icons";


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
          //  const delay = new Promise(res => setTimeout(res, 1000));
      //  await delay;
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
            <Col>
                <Row>
                    <Menu
                        links={[{ label: "Lista de Freteiros", url: "/freteiro" },
                        { label: "Cadastrar Freteiro", url: "/freteiro/novo" }
                        ]}
                        showSearch={true}
                        listSearch={data ?? []}
                        onListSearch={listFiltered}
                        showCadAtu={false}          
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
                    <th className="th70" >
                        <div className="thArrow">
                            <span>ID:</span>
                            <span onClick={() => handleSort("id")} className="headTablesArrows">
                                {sortBy === "id" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th200">
                        <div className="thArrow">
                            <span>Nome:</span>
                            <span onClick={() => handleSort("nome")} className="headTablesArrows">
                                {sortBy === "nome" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th110">
                        <div className="thArrow">
                            <span>Fixo:</span>
                            <span onClick={() => handleSort("fixo")} className="headTablesArrows">
                                {sortBy === "fixo" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th70">
                        <div className="thArrow">
                            <span>%:</span>
                            <span onClick={() => handleSort("percentual")} className="headTablesArrows">
                                {sortBy === "percentual" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
                            </span>
                        </div>
                    </th>
                    <th className="th70">
                        <div className="thArrow">
                            <span>Prioridade:</span>
                            <span onClick={() => handleSort("prioridade")} className="headTablesArrows">
                                {sortBy === "prioridade" ? (sortOrder === "asc" ? "▲" : "▼") : "▼"}
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
                                })
                            ) as unknown as IFreteiro[]
                        )
                        .map((freteiro, index) => (
                            <tr className="tablesCss" key={index}>

                                <td><b>{freteiro.id}</b></td>
                                <td><b className="th250">{freteiro.nome}</b></td>
                                <td className="tdValue"><b>R$: {(freteiro.fixo / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                                <td className="tdValue"><b>{freteiro.percentual}%</b></td>
                                <td className="tdValue"><b>{freteiro.prioridade}</b></td>
                              <td onClick={(e) => {
                                    e.stopPropagation();
                                    Number(freteiro.id) !== 0 && navigate(`/freteiros/${freteiro.id}`);
                                }}
                                    role="button"
                                    aria-label="Desativar Freteiro">
                                    <Icons tipo="edit" />
                                </td>
                                <td onClick={(e) => {
                                    e.stopPropagation();
                                    Number(freteiro.id) !== 0 && navigate(`/freteiros/${freteiro.id}`);
                                }}
                                    role="button"
                                    aria-label="Desativar Freteiro">
                                    <Icons tipo="trash" />
                                </td>
                            </tr>
                        ))
                    : null}

            </tbody>
        </Table>

    );

}
