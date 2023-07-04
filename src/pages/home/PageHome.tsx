import {
    PaginationComponent,
} from "@/datas/PaginationComponent";
import {
    CatalogoController, ICatalogo,
} from "@/datatypes/catalogo";
import React, { useMemo, useState } from "react";
import {
    Accordion,
    Button,
    Card,
    Col,
    Dropdown,
    FloatingLabel,
    ListGroup,
    Row,
    Table,
} from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { useNavigate, useParams } from "react-router-dom";
import useDataTypes from "@/hooks/useDataTypes";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { FreteiroStore } from "@/context/FreteiroStore";
import { ILoja } from "@/datatypes/loja";
import { Icons } from "@/components/icons/icons";


export function PageHome() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [filtro, setFiltro] = useState("");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const { freteiro } = FreteiroStore.useStore();
    const [itemsPerPage, setItemsPerpage] = useState(10);

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data,
    } = useDataTypes<ICatalogo>({
        queryKey: ["catalogosHome", page ?? "1", itemsPerPage.toString()],
        queryFn: async () =>

            await CatalogoController.searchCompetidor(
                freteiro,
                parseInt(page ?? "1"),
                itemsPerPage,
                filtro,
            ),
        filtro: filtro,
        defaultOrder: "margem",
    });

    const catalogos = useMemo(() => {

        return data?.items.map(catalogo => {
            for (const competidor of catalogo.competidores) {
                const frete = freteiro ? competidor.produto.preco * competidor.loja.cotacao * freteiro.percentual / 100 + freteiro.fixo : 0;
                competidor.frete = frete;
            }
            //to do calcular lucro , margem , preco

            let precoC = Number.MAX_SAFE_INTEGER;
            let precoP = Number.MAX_SAFE_INTEGER;

            for (const competidor of catalogo.competicaoML) {
                if (competidor.premium) {
                    precoP = Math.min(competidor.preco, precoP);
                    continue;
                }
                precoC = Math.min(competidor.preco, precoC);
            }

            catalogo.precoC = precoC !== Number.MAX_SAFE_INTEGER ? precoC : 0;
            catalogo.precoP = precoP !== Number.MAX_SAFE_INTEGER ? precoP : 0;


            const vencedor = catalogo.competidores[0];


            if (vencedor) {
                catalogo.custoTotal = vencedor.produto.preco * vencedor.loja.cotacao + vencedor.frete;


                catalogo.margemC = (catalogo.precoC !== 0) ? (catalogo.lucroC / catalogo.precoC) * 100 : 0;
                catalogo.margemP = (catalogo.precoP !== 0) ? (catalogo.lucroP / catalogo.precoP) * 100 : 0;
                catalogo.lucroC = (catalogo.precoC !== 0) ? (catalogo.precoC - (catalogo.precoC * 0.11) - 20 - catalogo.custoTotal) : 0;
                catalogo.lucroP = (catalogo.precoP !== 0) ? (catalogo.precoP - (catalogo.precoP * 0.16) - 20 - catalogo.custoTotal) : 0;

            }

            return catalogo;

        })

    }, [data, freteiro])


    const handlePageChange = (page: number) => {
        navigate(`/${page}`);
    };



    return (
        <React.Fragment>

            <Row className="my-3">
                <Col xs={12} className="d-flex">


                    <FloatingLabel className="w-100 mr-custom" label="Pesquisar" >
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/1`}
                        />


                    </FloatingLabel>

                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown  justify-content-end my-1">
                            <Icons tipo="filtro" tamanho={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setItemsPerpage(10)}>10</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setItemsPerpage(25)}>25</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setItemsPerpage(50)}>50</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setItemsPerpage(100)}>100</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => setItemsPerpage(200)}>200</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                </Col>

            </Row>




            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>
                        <th className="th70" >
                            <div className="thArrow">
                                <span></span>
                            </div>
                        </th>
                        <th className="th200" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" >
                            <div className="thArrow">
                                <span>Preço U$</span>

                            </div>
                        </th>
                        <th className="th130" >
                            <div className="thArrow">
                                <span>Custo Total R$</span>

                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("precoC")}>
                            <div className="thArrow">
                                <span>Preço ML C</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("precoP")} >
                            <div className="thArrow">
                                <span>Preço ML P</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>


                        <th className="th110" onClick={() => orderBy("lucroC")}>
                            <div className="thArrow">
                                <span>Lucro C</span>
                                <span>
                                    {ordenar === "lucro" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("lucroP")}>
                            <div className="thArrow">
                                <span>Lucro P</span>
                                <span>
                                    {ordenar === "lucro" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>

                        <th className="th130" onClick={() => orderBy("margemC")}>
                            <div className="thArrow">
                                <span>Margem Liq. C</span>
                                <span>
                                    {ordenar === "margem" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => orderBy("margemP")}>
                            <div className="thArrow">
                                <span >Margem Liq. P</span>
                                <span>
                                    {ordenar === "margem" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" >
                            <span>Vencedor</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {!isLoading &&
                        catalogos?.map((catalogo, index) => (
                            <ItemTable key={index} catalogo={catalogo} eventKey={index.toString()} onToggle={setExpandedKey} expandedKey={expandedKey} />
                        ))}
                </tbody>
            </Table>

            {isLoading && <FragmentLoading />}
            <Row className="my-3">
                <Col xs className="d-flex">
                    <PaginationComponent<ILoja>
                        items={data?.total ?? 0}
                        pageSize={itemsPerPage}
                        onPageChange={handlePageChange}
                        currentPage={data?.page ?? 1}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}


interface IPropItensTable {
    catalogo: ICatalogo;
    eventKey: string;
    onToggle: (key: string | null) => void;
    expandedKey: string | null;
}





function ItemTable({ catalogo, eventKey, onToggle, expandedKey }: IPropItensTable) {

    return (
        <React.Fragment>
            <tr onClick={() => onToggle(expandedKey === eventKey ? null : eventKey)}>
                <td className="acordionStyle">
                    <img
                        className="responsive-image"
                        src={catalogo.url_thumbnail || ratata}
                        alt="Descrição da imagem"
                    />
                </td>
                <td className="th200">
                    <a
                        style={{ color: "blue" }}
                        href={catalogo.url_catalogo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={catalogo.nome}
                    >
                        {catalogo.nome}
                    </a>
                </td>
                <td className="th110" style={{ textAlign: "center" }}>
                    U${" "}
                    {formatCurrency(catalogo.competidores[0]?.produto.preco ?? 0)}
                </td>
                <td className="th130" style={{ textAlign: "center" }}>
                    R$ {" "}
                    {formatCurrency(catalogo.custoTotal)}
                </td>
                <td className="th130" style={{ textAlign: "center" }}>
                    R$ {" "}
                    {formatCurrency(catalogo.precoC)}
                </td>
                <td className="th110" style={{ textAlign: "center" }}>
                    R${" "}
                    {formatCurrency(catalogo.precoP)}
                </td>
                <td className="th110" style={{ textAlign: "center" }}>
                    R${" "}
                    {formatCurrency(catalogo.lucroC)}
                </td>

                <td className="th110" style={{ textAlign: "center" }}>
                    R${" "}
                    {formatCurrency(catalogo.lucroP)}
                </td>
                <td className="th130" style={{ textAlign: "center" }}>
                    {catalogo.margemC.toFixed(2)}%
                </td>

                <td className="th130" style={{ textAlign: "center" }}>
                    {catalogo.margemP.toFixed(2)}%
                </td>
                <td className="th110" >
                    {catalogo.competidores[0]?.loja.nome ?? ""}
                    <br />
                    {catalogo.competidores[0]?.produto.codigo ?? ""}
                </td>
            </tr>
            <tr >
                <td colSpan={11} style={{ height: 0, padding: 0 }}>
                    <Accordion activeKey={expandedKey} >
                        <Accordion.Item eventKey={eventKey} >
                            <Accordion.Header ></Accordion.Header>
                            <Accordion.Body>
                                <ListGroup >
                                    {catalogo.competidores.map((competidor, i) => (
                                        <ListGroup.Item key={i}>


                                            <Card >
                                                <Card.Header >
                                                    <strong>Loja:</strong> {competidor.loja.nome}
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col xs={4} md={2} >
                                                            <strong>Código:</strong> {competidor.produto.codigo}
                                                        </Col>
                                                        <Col xs={8} md={10}>
                                                            <strong>Produto:</strong> {competidor.produto.nome}
                                                        </Col>
                                                    </Row>
                                                    <Row >
                                                        <Col xs={4} md={4}>
                                                            <strong>Frete: </strong>
                                                            {formatCurrency(competidor.frete)}
                                                        </Col>
                                                        <Col xs={4} md={4}>
                                                            <strong>Preço U$: </strong>
                                                            {formatCurrency(competidor.produto.preco)}
                                                        </Col>
                                                        <Col xs={4} md={4} >
                                                            <strong>Preço R$: </strong>
                                                            {formatCurrency(competidor.produto.preco * competidor.loja.cotacao)}
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </td>
            </tr>
        </React.Fragment>
    );
}