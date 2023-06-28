import {
    PaginationComponent,
} from "@/datas/PaginationComponent";
import {
    CatalogoController,
    ICatalogoCompetidor,
} from "@/datatypes/catalogo";
import React, { useMemo, useState } from "react";
import {
    Accordion,
    Card,
    Col,
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

export function PageHome() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [filtro, setFiltro] = useState("");
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const { freteiro } = FreteiroStore.useStore();

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data,
    } = useDataTypes<ICatalogoCompetidor>({
        queryKey: ["catalogosHome", page ?? "1", "10"],
        queryFn: async () =>

            await CatalogoController.searchCompetidor(
                freteiro,
                parseInt(page ?? "1"),
                10,
                filtro,
                ordenar,
                ordem ? "descrescente" : "crescente"
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
            catalogo.lucro = catalogo.lucro - catalogo.competidores[0]?.frete ?? 0;
            if (catalogo.preco > 0) catalogo.margem = catalogo.lucro / catalogo.preco;
            return {
                ...catalogo
            }
        })

    }, [data, freteiro]
    )


    const handlePageChange = (page: number) => {
        navigate(`/${page}`);
    };



    return (
        <React.Fragment>

            <Row className="my-3">
                <Col xs className="d-flex">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/1`}
                        />
                    </FloatingLabel>
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
                        <th className="th110" onClick={() => orderBy("preco")}>
                            <div className="thArrow">
                                <span>Preço ML C</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("preco")} >
                            <div className="thArrow">
                                <span>Preço ML P</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>


                        <th className="th110" onClick={() => orderBy("lucro")}>
                            <div className="thArrow">
                                <span>Lucro C</span>
                                <span>
                                    {ordenar === "lucro" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th110" onClick={() => orderBy("lucro")}>
                            <div className="thArrow">
                                <span>Lucro P</span>
                                <span>
                                    {ordenar === "lucro" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>

                        <th className="th130" onClick={() => orderBy("margem")}>
                            <div className="thArrow">
                                <span>Margem Liq. C</span>
                                <span>
                                    {ordenar === "margem" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => orderBy("margem")}>
                            <div className="thArrow">
                                <span>Margem Liq. P</span>
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
                        pageSize={10}
                        onPageChange={handlePageChange}
                        currentPage={data?.page ?? 1}
                    />
                </Col>

            </Row>

        </React.Fragment>
    );
}


interface IPropItensTable {
    catalogo: ICatalogoCompetidor;
    eventKey: string;
    onToggle: (key: string | null) => void;
    expandedKey: string | null;
}





function ItemTable({ catalogo, eventKey, onToggle, expandedKey }: IPropItensTable) {
    const freteiro = FreteiroStore.useStore().freteiro;
    const percentual_freteiro = freteiro?.percentual ?? 0;
    const custo_produto = catalogo.vencedor?.produto.preco ?? 0;
    const custo_freteiro = percentual_freteiro * custo_produto / 100;
    const cotacao = catalogo.vencedor?.loja.cotacao ?? 1;
    const custo_total = (custo_freteiro + custo_produto) * cotacao;
    const valoresML = CatalogoController.getValoresML(catalogo, custo_total);


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
                <td className="th110" style={{ textAlign: "right" }}>
                    U${" "}
                    {formatCurrency(catalogo.vencedor?.produto.preco ?? 0)}
                </td>



                <td className="th130" style={{ textAlign: "right" }}>
                    R$ {" "}
                    {formatCurrency(custo_total)}
                </td>



                <td className="th130" style={{ textAlign: "right" }}>
                    R$ {" "}
                    {formatCurrency(valoresML.precoC)}
                </td>

                <td className="th110" style={{ textAlign: "right" }}>
                    R${" "}
                    {formatCurrency(valoresML.precoP)}
                </td>


                <td className="th110" style={{ textAlign: "right" }}>
                    R${" "}
                    {formatCurrency(valoresML.lucroC)}
                </td>

                <td className="th110" style={{ textAlign: "right" }}>
                    R${" "}
                    {formatCurrency(valoresML.lucroP)}
                </td>
                <td className="th130" style={{ textAlign: "right" }}>
                    {(valoresML.lucroC / valoresML.precoP * 100).toFixed(2)}%
                </td>

                <td className="th130" style={{ textAlign: "right" }}>
                    {(valoresML.lucroP / valoresML.precoP * 100).toFixed(2)}%
                </td>






                <td className="th110" >
                    {catalogo.vencedor?.loja.nome ?? ""}
                    <br />
                    {catalogo.vencedor?.produto.codigo ?? ""}
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