import { Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";

interface IProps {
    listProdutoLoja?: IProdutoLoja[] | null;
    onListProdutoLoja: (selectedItems: IProdutoLoja[]) => void;
}

export function ModalTableCadastroProdutoLoja({ listProdutoLoja, onListProdutoLoja }: IProps) {
    const [selectedProdutoLoja, setSelectedProdutoLoja] = useState<Set<IProdutoLoja>>(new Set());
    const [filtro, setFiltro] = useState("");



    const filteredProdutoLoja = listProdutoLoja?.filter(produtoLoja =>
        produtoLoja.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    const handleCheckboxChange = (produtoLoja: IProdutoLoja) => {
        const update = new Set(selectedProdutoLoja);
        if (selectedProdutoLoja.has(produtoLoja)) {
            update.delete(produtoLoja);
        } else {
            update.add(produtoLoja);
        }

        setSelectedProdutoLoja(update);
        onListProdutoLoja(Array.from(update));
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
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col xs="auto">
                    <span className="selected-items">{selectedProdutoLoja.size}: Item selecionado's</span>
                </Col>
            </Row>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>



                <Table bordered hover >
                    <thead>
                        <tr>
                            <th className="th70">
                                <div className="thArrow">
                                    <span>Codigo</span>
                                </div>
                            </th>
                            <th className="th250" >
                                <div className="thArrow">
                                    <span>Nome</span>
                                </div>
                            </th>
                            <th className="th110" >
                                <div className="thArrow">
                                    <span>Preço</span>
                                </div>
                            </th>
                            <th className="th100" style={{ display: "flex", justifyContent: "center" }} >
                                <div className="thArrow" >
                                    <span>Selecionados</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProdutoLoja?.slice(0, 20).map((produtoLoja, index) => (
                            <tr key={index} >
                                <td>
                                    {produtoLoja.codigo}
                                </td>
                                <td>
                                    {produtoLoja.nome}
                                </td>
                                <td >
                                    U$: {formatCurrency(produtoLoja.preco)}
                                </td>

                                <td>
                                    <Form.Check
                                        checked={selectedProdutoLoja.has(produtoLoja)}
                                        onChange={() => handleCheckboxChange(produtoLoja)}
                                    />
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
}