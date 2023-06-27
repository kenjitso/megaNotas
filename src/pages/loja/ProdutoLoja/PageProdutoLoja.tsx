import React, { useState } from "react";
import { Row, Col, Table, Button, FloatingLabel, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Icons } from "@/components/icons/icons";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { PaginationComponent } from "@/datas/PaginationComponent";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import useDataTypes from "@/hooks/useDataTypes";

import { ModalCadastroProdutoLoja } from "./ModalProdutoLoja/ModalCadastroProdutoLoja";
import { ModalImportProdutoLoja } from "./ModalProdutoLoja/ModalImportProdutoLoja";
import { ModalVinculo } from "./ModalProdutoLoja/ModalVinculo";

export function PageProdutoLoja() {
    const { lojaId } = useParams();
    const navigate = useNavigate();
    const { page } = useParams();
    const [modalVinculoProduto, setVinculoProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [importProdutoLoja, setImportProdutoLoja] = useState<string | undefined>(undefined);
    const [cadastroProdutoLoja, setCadastroProdutoLoja] = useState<string | undefined>(undefined);
    const [filtro, setFiltro] = useState("");

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data
    } = useDataTypes<IProdutoLoja>({
        queryKey: ["produtosloja", page ?? "1", "10"],
        queryFn: async () => await ProdutoLojaController.search(lojaId ?? "", parseInt(page ?? "1"), 10, filtro, ordenar, ordem ? "crescente" : "descrescente", true),
        filtro: filtro,
        defaultOrder: "nome"
    });

    const handlePageChange = (page: number) => {
        navigate(`/lojas/${lojaId}/produtos/${page}`);
    };

    return (
        <React.Fragment>

            <ModalImportProdutoLoja onHide={() => setImportProdutoLoja(undefined)} lojaId={importProdutoLoja} />
            <ModalCadastroProdutoLoja onHide={() => setCadastroProdutoLoja(undefined)} lojaId={cadastroProdutoLoja} />
            <ModalVinculo onHide={() => setVinculoProduto(undefined)} produtoParaguay={modalVinculoProduto} />

            <Row className="my-3">

                <Col xs className="d-flex" >
                    <Button
                        className="me-3 d-flex align-items-center justify-content-center custom-btn"

                        onClick={() => navigate("/lojas")}
                    >
                        <Icons tipo="voltar" tamanho={22} />   Voltar
                    </Button>

                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`/lojas/${lojaId}/produtos/1`}
                        />
                    </FloatingLabel>
                </Col>

                <Col xs className="d-flex justify-content-end">
                    <Button
                        onClick={() => setCadastroProdutoLoja(lojaId)}
                        className="me-3 custom-btn"
                    >
<<<<<<< HEAD
                         <Icons tipo="import" tamanho={22} />  Importar
=======
                        <Icons tipo="download" tamanho={22} />  Cadastrar
>>>>>>> fdd2ca622d4f53e9c6830e3701c6f50465a02747
                    </Button>
                    <Button
                        className="custom-btn"
                        onClick={() => setImportProdutoLoja(lojaId)}
                    >
                        <Icons tipo="update" tamanho={22} />  Atualizar
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover className="rounded-table">

                <thead>
                    <tr>
                        <th className="th150" >
                            <div className="thArrow">
                                <span>Codigo</span>
                            </div>
                        </th>
                        <th className="th250" onClick={() => orderBy("nome")}>
                            <div className="thArrow">
                                <span>Nome</span>
                                <span>
                                    {ordenar === "nome" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => orderBy("preco")}>
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {ordenar === "preco" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => orderBy("vinculos")}>
                            <div className="thArrow">
                                <span>Vinc.</span>
                                <span>
                                    {ordenar === "vinculos" && (ordem ? "▲" : "▼")}
                                </span>
                            </div>
                        </th>
                        <th className="th70">
                            <span>Est.</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isLoading && data?.items.map((produtoLoja, index) => <ItemTable key={index} produtoLoja={produtoLoja} onVinculo={setVinculoProduto} />)
                    }
                </tbody>
            </Table>
            {isLoading && <FragmentLoading />}

            <Row className="mt-2">
                <Col xs>
                    <PaginationComponent<IProdutoLoja>
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

interface IPropsItensTable {
    produtoLoja: IProdutoLoja,
    onVinculo: (idProdutoParaguay: IProdutoLoja) => void,
}

function ItemTable({ produtoLoja, onVinculo }: IPropsItensTable) {
    return (

        <React.Fragment>
            <tr>
                <td>
                    {produtoLoja.codigo}
                </td>
                <td>
                    {produtoLoja.nome}
                </td>
                <td>
                    U$: {formatCurrency(produtoLoja.preco)}
                </td>
                <td
                    className="centralize-icon"
                    style={{
                        backgroundColor: produtoLoja.vinculos && produtoLoja.vinculos.length > 0 ? "green" : "red"
                    }}
                    onClick={() => { onVinculo(produtoLoja); }}
                    role="button"
                    aria-label="Vincular Produto"
                >
                    <Icons tipo="link" />
                </td>
                <td className="centralize-icon">
                    <Form.Check
                        checked={produtoLoja.estoque}
                        readOnly
                    />
                </td>
            </tr>
        </React.Fragment >
    );
}
