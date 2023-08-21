import { Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React, { useState } from "react";
import { formatCurrency } from "@/features/FormatCurrency";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { ILoja } from "@/datatypes/loja";
import { buildUrl } from "@/features/UrlLinkLojas";

interface IProps {
    listProdutoLoja?: {
        cadastrados: IProdutoLoja[];
        naoCadastrados: IProdutoLoja[];
        naoEncontrados: IProdutoLoja[];
    } | null;
    lojaId?: ILoja;
    onListProdutoLoja: (selectedItems: IProdutoLoja[]) => void;
}

export function ModalTableImportarProdutoLoja({ listProdutoLoja, lojaId, onListProdutoLoja }: IProps) {

    const [selectedProdutoLoja, setSelectedProdutoLoja] = useState<Set<IProdutoLoja>>(new Set());
    const [filtro, setFiltro] = useState("");
    const [lastCheckedIndex, setLastCheckedIndex] = useState<number | null>(null);
    const [checkboxFilterCelular, setCheckboxFilterCelular] = useState(false);
    const [checkboxFilterRelogio, setCheckboxFilterRelogio] = useState(false);
    const [checkboxFilterNaoEncontrados, setCheckboxFilterNaoEncontrados] = useState(false);

    const handleCheckboxFilterChangeCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxFilterCelular(event.target.checked);

        const celularItems = new Set(selectedProdutoLoja);
        var exclusions = ['PAD', 'CASE', 'CAPA', 'PELICULA', 'CABO', 'CARREGADOR', 'FONE', 'RELOJ','RELOGIO'];

        if (event.target.checked) {
            listProdutoLoja?.naoCadastrados.forEach(produtoLoja => {
                const nomeProdutoUpperCase = produtoLoja.nome.toUpperCase();

                if (nomeProdutoUpperCase.includes('XIAOMI') && nomeProdutoUpperCase.includes('CEL') ||
                    nomeProdutoUpperCase.includes('XIAOMI') && nomeProdutoUpperCase.includes('CELULAR') ||
                    nomeProdutoUpperCase.includes('XIAOMI 13') && nomeProdutoUpperCase.includes('LITE 5G') ||
                    (nomeProdutoUpperCase.includes('XIAOMI REDMI') && !exclusions.some(exclusion => nomeProdutoUpperCase.includes(exclusion))) ||
                    (nomeProdutoUpperCase.includes('XIAOMI NOTE') && !exclusions.some(exclusion => nomeProdutoUpperCase.includes(exclusion))) ||
                    (nomeProdutoUpperCase.includes('XIAOMI POCO') && !exclusions.some(exclusion => nomeProdutoUpperCase.includes(exclusion))) ||
                    nomeProdutoUpperCase.includes('IPHONE') ||
                    nomeProdutoUpperCase.includes('SAMSUNG') && nomeProdutoUpperCase.includes('CEL') ||
                    nomeProdutoUpperCase.includes('SAMSUNG') && nomeProdutoUpperCase.includes('CELULAR')
                ) {
                    celularItems.add(produtoLoja);
                }
            });
        } else {
            const itemsToDelete = [];
            for (let item of celularItems) {
                const nomeProdutoUpperCase = item.nome.toUpperCase();
                if (nomeProdutoUpperCase.includes('XIAOMI') && nomeProdutoUpperCase.includes('CEL') ||
                    nomeProdutoUpperCase.includes('XIAOMI') && nomeProdutoUpperCase.includes('CELULAR') ||
                    nomeProdutoUpperCase.includes('XIAOMI 13') && nomeProdutoUpperCase.includes('LITE 5G') ||
                    (nomeProdutoUpperCase.includes('XIAOMI REDMI') && !exclusions.some(exclusion => nomeProdutoUpperCase.includes(exclusion))) ||
                    (nomeProdutoUpperCase.includes('XIAOMI NOTE') && !exclusions.some(exclusion => nomeProdutoUpperCase.includes(exclusion))) ||
                    (nomeProdutoUpperCase.includes('XIAOMI POCO') && !exclusions.some(exclusion => nomeProdutoUpperCase.includes(exclusion))) ||
                    nomeProdutoUpperCase.includes('IPHONE') ||
                    nomeProdutoUpperCase.includes('SAMSUNG') && nomeProdutoUpperCase.includes('CEL') ||
                    nomeProdutoUpperCase.includes('SAMSUNG') && nomeProdutoUpperCase.includes('CELULAR')
                ) {
                    itemsToDelete.push(item);
                }
            }
            // remove os itens em uma segunda passagem
            itemsToDelete.forEach(item => celularItems.delete(item));
        }

        setSelectedProdutoLoja(celularItems);
        onListProdutoLoja(Array.from(celularItems));
    };


    const handleCheckboxFilterChangeRelogio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxFilterRelogio(event.target.checked);

        const relogioItems = new Set(selectedProdutoLoja);

        if (event.target.checked) {
            listProdutoLoja?.naoCadastrados.forEach(produtoLoja => {
                const relogio = produtoLoja.nome.toUpperCase();
                if (relogio.includes('WATCH') || relogio.includes('RELOGIO')) relogioItems.add(produtoLoja);
            });
        } else {
            const itemsToDelete = [];
            for (let item of relogioItems) {
                const relogio = item.nome.toUpperCase();
                if (relogio.includes('WATCH') || relogio.includes('RELOGIO')) itemsToDelete.push(item);
            }
            // remove os itens em uma segunda passagem
            itemsToDelete.forEach(item => relogioItems.delete(item));
        }

        setSelectedProdutoLoja(relogioItems);
        onListProdutoLoja(Array.from(relogioItems));
    };




    const handleCheckboxFilterChangeNaoEncontrados = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxFilterNaoEncontrados(event.target.checked);
    };

    let filteredProdutos: IProdutoLoja[] = [];


    if (checkboxFilterNaoEncontrados) {
        filteredProdutos = (listProdutoLoja?.naoEncontrados || []).filter(produtoLoja =>
            (!checkboxFilterCelular || produtoLoja.nome.toLowerCase().includes('celular')) &&
            (!produtoLoja.nome.toLowerCase().includes('microfone'))
        );
    } else {
        filteredProdutos = (listProdutoLoja?.naoCadastrados || []).filter(produtoLoja =>
            produtoLoja.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            (checkboxFilterCelular && (produtoLoja.nome.toLowerCase().includes('celular') || produtoLoja.nome.toLowerCase().includes(' cel '))) &&
            (!produtoLoja.nome.toLowerCase().includes('microfone'))
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
                <Col md={3} >
                    <Form.Check
                        label="Celular"
                        id="checkbox-celular"
                        checked={checkboxFilterCelular}
                        onChange={handleCheckboxFilterChangeCelular}
                    />
                </Col>
                <Col md={3} >
                    <Form.Check
                        label="Relogio"
                        id="checkbox-relogio"
                        checked={checkboxFilterRelogio}
                        onChange={handleCheckboxFilterChangeRelogio}
                    />
                </Col>
                <Col md={3}  >
                    <Form.Check
                        label="Não encontrados"
                        id="checkbox-nao-encontrados"
                        checked={checkboxFilterNaoEncontrados}
                        onChange={handleCheckboxFilterChangeNaoEncontrados}
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
                                        href={buildUrl(lojaId?.algoritmo || 0, produtoLoja?.codigo || "")}



                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={produtoLoja.nome}
                                    >
                                        {produtoLoja.nome}
                                    </a>


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