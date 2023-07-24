import { Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React, { useState } from "react";
import { formatCurrency } from "@/features/FormatCurrency";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";

interface IProps {
    listProdutoLoja?: {
        cadastrados: IProdutoLoja[];
        naoCadastrados: IProdutoLoja[];
        naoEncontrados: IProdutoLoja[];
    } | null;
    onListProdutoLoja: (selectedItems: IProdutoLoja[]) => void;
}

export function ModalTableImportarProdutoLoja({ listProdutoLoja, onListProdutoLoja }: IProps) {

    const [selectedProdutoLoja, setSelectedProdutoLoja] = useState<Set<IProdutoLoja>>(new Set());
    const [filtro, setFiltro] = useState("");
    const [lastCheckedIndex, setLastCheckedIndex] = useState<number | null>(null);
    const [checkboxFilter, setCheckboxFilter] = useState(false);
    const [checkboxFilterNaoEncontrados, setCheckboxFilterNaoEncontrados] = useState(false);

    const handleCheckboxFilterChangeCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxFilter(event.target.checked);
    
        const celularItems = new Set(selectedProdutoLoja);
    
        if (event.target.checked) {
            listProdutoLoja?.naoCadastrados.forEach(produtoLoja => {
                if (produtoLoja.nome.toLowerCase().includes('celular')) {
                    celularItems.add(produtoLoja);
                }
                if (produtoLoja.nome.toLowerCase().includes('cel')) {
                    celularItems.add(produtoLoja);
                }
            });
        } else {
            for (let item of celularItems) {
                if (item.nome.toLowerCase().includes('celular') || item.nome.toLowerCase().includes('cel')) {
                    celularItems.delete(item);
                }
            }
        }
    
        setSelectedProdutoLoja(celularItems);
        onListProdutoLoja(Array.from(celularItems));
    };
    

    const handleCheckboxFilterChangeNaoEncontrados = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxFilterNaoEncontrados(event.target.checked);
    };

    let filteredProdutos: IProdutoLoja[] = [];

    if (checkboxFilterNaoEncontrados) {
        filteredProdutos = (listProdutoLoja?.naoEncontrados || []).filter(produtoLoja =>
            (!checkboxFilter || produtoLoja.nome.toLowerCase().includes('celular'))
        );
    } else {
        filteredProdutos = (listProdutoLoja?.naoCadastrados || []).filter(produtoLoja =>
            produtoLoja.nome.toLowerCase().includes(filtro.toLowerCase()) &&
            (!checkboxFilter || produtoLoja.nome.toLowerCase().includes('celular'))
        );
    }

    const handleCheckboxChange = (
        produtoLoja: IProdutoLoja,
        index: number,
        event: React.MouseEvent<HTMLInputElement>
    ) => {
        const update = new Set(selectedProdutoLoja);

        if (event.shiftKey && lastCheckedIndex !== null) {
            const start = Math.min(lastCheckedIndex, index);
            const end = Math.max(lastCheckedIndex, index);
            const itemsToSelect = filteredProdutos.slice(start, end + 1);

            if (itemsToSelect) {
                const isSelecting = !selectedProdutoLoja.has(produtoLoja);

                itemsToSelect.forEach((item) => {
                    if (isSelecting) {
                        update.add(item);
                    } else {
                        update.delete(item);
                    }
                });
            }
        } else {
            if (selectedProdutoLoja.has(produtoLoja)) {
                update.delete(produtoLoja);
            } else {
                update.add(produtoLoja);
            }
            setLastCheckedIndex(index);
        }

        setSelectedProdutoLoja(update);
        onListProdutoLoja(Array.from(update));
    }



    return (
        <React.Fragment>

            <Row className="d-flex align-items-center">
                <Col xs="1" >
                    <Form.Check
                        label="Celular"
                        id="checkbox-celular"
                        checked={checkboxFilter}
                        onChange={handleCheckboxFilterChangeCelular}
                        className="mr-2"
                    />
                </Col>
                <Col className="mx-3" >
                    <Form.Check
                        label="Não encontrados"
                        id="checkbox-nao-encontrados"
                        checked={checkboxFilterNaoEncontrados}
                        onChange={handleCheckboxFilterChangeNaoEncontrados}
                        className="mr-2"
                    />
                </Col>
            </Row>


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
                <Col xs="auto">
                    <span className="selected-items">{listProdutoLoja?.naoCadastrados.length}: Item não Cadastrado's</span>
                </Col>
                <Col xs="auto">
                    <span className="selected-items">{listProdutoLoja?.naoEncontrados.length}: Item não Encontrado's</span>
                </Col>
            </Row>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>



                <Table bordered hover  >
                    <thead>
                        <tr>
                            <th className="th150" >
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
                            <th className="th100" style={{ justifyContent: "center" }} >
                                <div className="thArrow" >
                                    <span>Selecionados</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredProdutos.map((produtoLoja, index) => (
                        <tr key={index} >
                                <td style={{ textAlign: 'left' }}>
                                    {produtoLoja.codigo}
                                </td>
                                <td>

                                <a
                                                                style={{ color: "blue" }}
                                                                href={`https://atacadogames.com/lista-produtos/termo/${produtoLoja.codigo}/1`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={produtoLoja.nome}
                                                            >
                                   {produtoLoja.nome}</a>
                                
                                
                                </td>
                                <td >
                                    U$: {formatCurrency(produtoLoja.preco)}
                                </td>

                                <td>
                                    <Form.Check
                                        checked={selectedProdutoLoja.has(produtoLoja)}
                                        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCheckboxChange(produtoLoja, index, e)}
                                        readOnly
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