import { Col, Row, Table } from "react-bootstrap";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Menu } from "@/datas/Menu";
import { useParams } from "react-router-dom";
import { IProduto, Produto } from "@/datatypes/produto";
import { ModalLoja } from "./ModalLoja";
import useQueryMutation from "@/hooks/useQueryMutation";
import useQueryNotification from "@/hooks/useQueryNotification";
import React from "react";
import InputNumero from "@/components/inputs/InputNumero";


export function CadastroProduto() {

    const { id } = useParams<{ id: string }>();

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
                    {inputCadastroProduto()}
                </Row>
            </Col>
        </Row>
    );
}

function inputCadastroProduto() {
    const [selectedLoja, setSelectedLoja] = useState<LojaModal[]>([]);
    const { id } = useParams();

    const produtoMutator = useQueryMutation(new Produto(), {
        queryKey: ["Produtos", id ?? ""],
        queryFn: async () => await Produto.get(id ?? ""),
        saveFn: async (data) => {
            if (id) {
                return await Produto.update(data);
            }
            return await Produto.create(data);
        },
        invalidateKeys: [["Produtos"]]
    });

    const produtosQuery = useQueryNotification({
        queryKey: ["Produtos"],
        queryFn: async () => await Produto.search(),
    });

    const produtoEncontrado = produtosQuery.data?.find(produto => produto.id === id);

    //   LojasQuery.data?.filter
    //produtoMutator.update("nome","kenji");

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

    interface LojaModal {
        id: string;
        codigo: string;
        preco: number;
        nome: string;
        cotacao: number;
        ultima_atualizacao: string;

    }

    const handleLojaSelect = (loja: LojaModal[]) => {
        setSelectedLoja(loja);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const parsedValue = isNaN(Number(value)) ? value : Number(value);
        setProduto(prevProduto => ({ ...prevProduto, [name]: parsedValue }));
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = Produto.create(produto);
    };

    const handleReset = () => {
        setProduto(camposLimpos);
        setSelectedLoja([]); // Reset selected lojas
    };

    return (
        <React.Fragment>

            <Form onSubmit={handleSubmit} className="text-start">
                <Row>
                    <Row><h1 className="text-center">Produto</h1></Row>
                    <Col>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label><b>Nome:</b></Form.Label>
                            <Form.Control
                                type="text"
                                pattern="[A-Za-zÀ-ú\s]+"
                                title="Por favor, insira apenas caracteres não numéricos"
                                name="nome"
                                value={produtoEncontrado?.nome ?? produto.nome}
                                onChange={handleChange}
                                placeholder="Insira o nome do produto"
                                required />
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
                                type="number"
                                name="comissao_classic"
                                value={produtoEncontrado?.comissao_classic ?? produto.comissao_classic}
                                onChange={handleChange} placeholder="Insira a comissão classica" />
                        </Form.Group>
                        <Form.Group controlId="formComissaoPremium" className="mb-3">
                            <Form.Label><b>Comissão Premium (%):</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="comissao_premium"
                                value={produtoEncontrado?.comissao_premium ?? produto.comissao_premium}
                                onChange={handleChange}
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
                            type="text"
                            name="url_catalogo_classic"
                            value={produtoEncontrado?.url_catalogo_classic ?? produto.url_catalogo_classic}
                            onChange={handleChange} placeholder="Insira URL catálogo classic" />
                    </Form.Group>
                    <Form.Group controlId="formUrlCatalogoPremium" className="mb-3">
                        <Form.Label><b>URL Catálogo Mercado Livre Premium:</b></Form.Label>
                        <Form.Control
                            type="text"
                            name="url_catalogo_premium"
                            value={produtoEncontrado?.url_catalogo_premium ?? produto.url_catalogo_premium}
                            onChange={handleChange}
                            placeholder="Insira URL catálogo premium" />
                    </Form.Group>
                </Row >
                <Row >
                    {selectedLoja && selectedLoja.length > 0 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Preço</th>
                                    <th>Nome</th>
                                    <th>Cotação</th>

                                </tr>
                            </thead>
                            <tbody>
                                {selectedLoja.map((loja, index) => (
                                    <tr key={index}>
                                        <td>{loja.codigo}</td>
                                        <td>{loja.preco}</td>
                                        <td>{loja.nome}</td>
                                        <td>{loja.cotacao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>Nenhuma loja adicionada</div>
                    )}
                </Row>
                <Row className="m-3">
                    <ModalLoja
                        onLojaSelect={handleLojaSelect}
                    />
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

        </React.Fragment>
    );
}

