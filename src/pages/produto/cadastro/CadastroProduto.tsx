import { Col, Row, Table } from "react-bootstrap";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Menu } from "@/pages/Menu";
import { useParams } from "react-router-dom";
import { IProduto, Produto } from "@/datatypes/produto";
import { ModalLoja } from "./ModalLoja";
import useQueryMutation from "@/hooks/useQueryMutation";
import React from "react";
import InputNumero from "@/components/inputs/InputNumero";
import InputTextoEsp from "@/components/inputs/InputTextoEsp";

export function CadastroProduto() {

    const { id } = useParams<{ id: string }>();


    const [showModal, setShowModal] = useState(false);

    const produtoMutator = useQueryMutation(new Produto(), {
        queryKey: ["Produtos", id ?? ""],
        queryFn: async () => await Produto.get(id ?? ""),
        saveFn: async (data) => {
            if (id) {
                data.id = id;
                return await Produto.update(data);
            }
            return await Produto.create(data);
        },
        invalidateKeys: [["Produtos"]]
    });

    const camposLimpos = {
        id: "",
        nome: "",
        url_catalogo_premium: "",
        url_catalogo_classic: "",
        comissao_premium: 0,
        comissao_classic: 0,
        frete: 0,
        preco_ml_premium: 0,
        preco_ml_classic: 0,
        lojas: [
            {
                codigo: "",
                idloja: "",
                preco: 0,
                ultima_atualizacao: "",
            },
        ],
    };

    const [produto, setProduto] = useState<IProduto>(camposLimpos);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        produtoMutator.save();
    };

    const handleReset = () => {
        setProduto(camposLimpos);
    };

    return (
        <Row>
            <Col className="body text-center">
                <Row>
                    <Col>
                        <h1> {id ? "Atualizar Produto 15/02/2023" : "Cadastra Produto 15/02/2023"}</h1>
                    </Col>
                </Row>
                <Row className="menuProduto">
                    <Menu
                        links={[
                            { label: "Lista de Produtos", url: "/produtos" },
                            { label: "Cadastrar Produto", url: "/produtos/novo" }
                        ]}
                        showSearch={false}
                    />
                </Row>
                <Row className="menuProduto border">
                    <Form onSubmit={handleSubmit} className="text-start">
                        <Row>
                            <Row><h1 className="text-center">Produto</h1></Row>
                            <Col>
                                <Form.Group controlId="formNome" className="mb-3">
                                    <Form.Label><b>Nome:</b></Form.Label>
                                    <Form.Control
                                        as={InputTextoEsp}
                                        type="text"
                                        title="Por favor, insira apenas caracteres não numéricos"
                                        value={produtoMutator.state.nome}
                                        onValueChange={(texto: string) => produtoMutator.update("nome", texto)}
                                        placeholder="Insira o nome do produto" 
                                        maxLength={60}
                              
                                        />
                                </Form.Group>
                                <Form.Group controlId="formPrecoMlPremium" className="mb-3">
                                    <Form.Label><b>Preço Mercado Livre Premium:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={produtoMutator.state.preco_ml_premium}
                                        onValueChange={(numero: number) => produtoMutator.update("preco_ml_premium", numero)}
                                        placeholder="Insira o preço do produto na versão premium do Mercado Livre" />
                                </Form.Group>
                                <Form.Group controlId="formPrecoMlClassic" className="mb-3">
                                    <Form.Label><b>Preço Mercado Livre Clássico:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={produtoMutator.state.preco_ml_classic}
                                        onValueChange={(numero: number) => produtoMutator.update("preco_ml_classic", numero)}
                                        placeholder="Insira o preço do produto na versão clássica do Mercado Livre" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formComissaoClassic" className="mb-3">
                                    <Form.Label><b>Comissão Clássico (%):</b></Form.Label >
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={0}
                                        max={100}
                                        value={produtoMutator.state.comissao_classic}
                                        onValueChange={(numero: number) => produtoMutator.update("comissao_classic", numero)}
                                        placeholder="Insira a comissão classica" />
                                </Form.Group>
                                <Form.Group controlId="formComissaoPremium" className="mb-3">
                                    <Form.Label><b>Comissão Premium (%):</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={0}
                                        max={100}
                                        value={produtoMutator.state.comissao_premium}
                                        onValueChange={(numero: number) => produtoMutator.update("comissao_premium", numero)}
                                        placeholder="Insira a comissão premium" />
                                </Form.Group>
                                <Form.Group controlId="formPrecoFrete" className="mb-3">
                                    <Form.Label><b>Preço Frete:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={produtoMutator.state.frete}
                                        onValueChange={(numero: number) => produtoMutator.update("frete", numero)}
                                        placeholder="Insira o preço do frete" />
                                </Form.Group>
                            </Col>
                            <Form.Group controlId="formUrlCatalogoClassic" className="mb-3">
                                <Form.Label><b>URL Catálogo Mercado Livre Classic:</b></Form.Label>
                                <Form.Control
                                    as={InputTextoEsp}
                                    type="text"
                                    value={produtoMutator.state.url_catalogo_classic}
                                    onValueChange={(texto: string) => produtoMutator.update("url_catalogo_classic", texto)}
                                    placeholder="Insira URL catálogo classic" />
                            </Form.Group>
                            <Form.Group controlId="formUrlCatalogoPremium" className="mb-3">
                                <Form.Label><b>URL Catálogo Mercado Livre Premium:</b></Form.Label>
                                <Form.Control
                                    as={InputTextoEsp}
                                    type="text"
                                    value={produtoMutator.state.url_catalogo_premium}
                                    onValueChange={(texto: string) => produtoMutator.update("url_catalogo_premium", texto)}
                                    placeholder="Insira URL catálogo premium" />
                            </Form.Group>
                        </Row >
                        <Row className="m-3">

                            <ModalLoja
                                lojas={produtoMutator.state.lojas}
                                onUpdate={(lojas) => produtoMutator.update("lojas", lojas)}
                                onHide={() => setShowModal(false)}
                                show={showModal}
                            />

                            <Button variant="secondary" onClick={() => setShowModal(true)}>Adicionar Loja</Button>
                        </Row>
                        <center>
                            <Row>
                                <Col>
                                    <Button variant="secondary" type="submit">
                                        {id ? "Atualizar Produto" : "Cadastrar Produto"}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary" onClick={handleReset}>
                                        Limpar Formulario
                                    </Button>
                                </Col>
                            </Row>
                        </center>
                    </Form >
                </Row>
            </Col>
        </Row>
    );
}

