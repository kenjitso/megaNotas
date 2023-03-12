import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Menu } from "@/pages/Menu";
import { useNavigate, useParams } from "react-router-dom";
import { Produto } from "@/datatypes/produto";
import { ModalLoja } from "./ModalLoja";
import useQueryMutation from "@/hooks/useQueryMutation";
import InputNumero from "@/components/inputs/InputNumero";
import InputTextoEsp from "@/components/inputs/InputTextoEsp";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

export function CadastroProduto() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const produtoMutator = useQueryMutation(new Produto(), {
        queryKey: ["Produtos", id ?? ""],
        queryFn: async () => await Produto.get(id ?? ""),
        saveFn: async (data) => {
            try {
                let response = null;
                if (id) {
                    data.id = id;
                    response = await Produto.update(data);
                } else {

                    const novoProduto = new Produto();
                    novoProduto.comissao_classic = produtoMutator.state.comissao_classic || 0;
                    novoProduto.comissao_premium = produtoMutator.state.comissao_premium || 0;
                    novoProduto.frete = produtoMutator.state.frete || 0;
                    novoProduto.lojas = produtoMutator.state.lojas || [];
                    novoProduto.nome = produtoMutator.state.nome;
                    novoProduto.preco_ml_classic = produtoMutator.state.preco_ml_classic || 0;
                    novoProduto.preco_ml_premium = produtoMutator.state.preco_ml_premium || 0;
                    novoProduto.url_catalogo_classic = produtoMutator.state.url_catalogo_classic || "";
                    novoProduto.url_catalogo_premium = produtoMutator.state.url_catalogo_premium || "";

                    response = await Produto.create(novoProduto);
                }
                if (response && response.id) {
                    toast.success("Produto alterado com sucesso!");
                } else {
                    toast.success("Produto salvo com sucesso!");
                }
                return response;
            } catch (error) {
                toast.error("Ocorreu um erro ao salvar a produto");
                throw error;
            }
        },
        invalidateKeys: [["Produtos"]]
    });

    const produtoQuery = useQuery(
        ["Produtos", id ?? ""],
        async () => await Produto.get(id ?? ""),
        { staleTime: 0 }
    );

    console.log(produtoQuery.data)


    const handleSave = () => {
        if (!produtoMutator.state.nome) {
            toast.info("Por favor, preencha o nome do Produto!");
            return;
        }
        const hasEmptyFields = produtoMutator.state.lojas && produtoMutator.state.lojas.some(
            (loja) => !loja.codigo || !loja.idloja || !loja.preco
        );
        if (hasEmptyFields) {
            toast.info("Preencha todos os campos da lista de Lojas!");
            return;
        }
        produtoMutator.save();
    };

    return (
        <Row>
            <Col className="body text-center">
                <Row className="menuProduto">
                    <Menu
                        links={[
                            { label: "Lista de produtos", url: "/produtos" },
                            { label: "Cadastrar produto", url: "/produtos/novo" }
                        ]}
                        showSearch={false}
                        showCadAtu={true}
                        onHandleSave={handleSave}
                        buttonStats={id ? "Atualiza" : "Cadastra"}
                        onHandleToList={() => { navigate("/produtos") }}

                    />
                </Row>
                <Row className="menuProduto">
                    <Form className="text-start">
                        <Row>
                            <Col>
                                <Form.Group controlId="formNome" className="mb-3">
                                    <Form.Label><b>Nome:</b></Form.Label>
                                    <Form.Control
                                        as={InputTextoEsp}
                                        type="text"
                                        title="Por favor, insira apenas caracteres não numéricos"
                                        value={produtoMutator.state.nome ? produtoMutator.state.nome : ''}
                                        onValueChange={(texto: string) => produtoMutator.update("nome", texto)}
                                        placeholder="Insira o nome do produto"
                                        maxLength={60}

                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <Form.Group controlId="formPrecoMlPremium" className="mb-3">
                                    <Form.Label>
                                        <b style={{ whiteSpace: 'nowrap' }}>
                                            Preço Mercado Livre Premium:
                                        </b>
                                    </Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={produtoMutator.state.preco_ml_premium ? produtoMutator.state.preco_ml_premium : ''}
                                        onValueChange={(numero: number) => produtoMutator.update("preco_ml_premium", numero)}
                                        placeholder="Insira o preço do produto na versão premium do Mercado Livre" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPrecoMlClassic" className="mb-3">
                                    <Form.Label>
                                        <b style={{ whiteSpace: 'nowrap' }}>
                                            Preço Mercado Livre Clássico:
                                        </b>
                                    </Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={produtoMutator.state.preco_ml_classic ? produtoMutator.state.preco_ml_classic : ''}
                                        onValueChange={(numero: number) => produtoMutator.update("preco_ml_classic", numero)}
                                        placeholder="Insira o preço do produto na versão clássica do Mercado Livre" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPrecoFrete" className="mb-3">
                                    <Form.Label>
                                        <b style={{ whiteSpace: 'nowrap' }}>
                                            Preço Frete:
                                        </b>
                                    </Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={produtoMutator.state.frete ? produtoMutator.state.frete : ''}
                                        onValueChange={(numero: number) => produtoMutator.update("frete", numero)}
                                        placeholder="Insira o preço do frete" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formComissaoClassic" className="mb-3">
                                    <Form.Label><b>Comissão Clássico (%):</b></Form.Label >
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={0}
                                        max={100}
                                        value={produtoMutator.state.comissao_classic ? produtoMutator.state.comissao_classic : ''}
                                        onValueChange={(numero: number) => produtoMutator.update("comissao_classic", numero)}
                                        placeholder="Insira a comissão classica" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formComissaoPremium" className="mb-3">
                                    <Form.Label><b>Comissão Premium (%):</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={0}
                                        max={100}
                                        value={produtoMutator.state.comissao_premium ? produtoMutator.state.comissao_premium : ''}
                                        onValueChange={(numero: number) => produtoMutator.update("comissao_premium", numero)}
                                        placeholder="Insira a comissão premium" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>

                            <Form.Group controlId="formUrlCatalogoClassic" className="mb-3">
                                <Form.Label><b>URL Catálogo Mercado Livre Classic:</b></Form.Label>
                                <Form.Control
                                    as={InputTextoEsp}
                                    type="text"
                                    value={produtoMutator.state.url_catalogo_classic ? produtoMutator.state.url_catalogo_classic : ''}
                                    onValueChange={(texto: string) => produtoMutator.update("url_catalogo_classic", texto)}
                                    placeholder="Insira URL catálogo classic" />
                            </Form.Group>
                            <Form.Group controlId="formUrlCatalogoPremium" className="mb-3">
                                <Form.Label><b>URL Catálogo Mercado Livre Premium:</b></Form.Label>
                                <Form.Control
                                    as={InputTextoEsp}
                                    type="text"
                                    value={produtoMutator.state.url_catalogo_premium ? produtoMutator.state.url_catalogo_premium : ''}
                                    onValueChange={(texto: string) => produtoMutator.update("url_catalogo_premium", texto)}
                                    placeholder="Insira URL catálogo premium" />
                            </Form.Group>
                        </Row >
                        <Row className="m-3">

                            <ModalLoja
                                lojas={produtoMutator.state.lojas || []}
                                onUpdate={(lojas) => produtoMutator.update("lojas", lojas)}
                                onHide={() => setShowModal(false)}
                                show={showModal}
                            />

                            <Button variant="secondary" onClick={() => setShowModal(true)}>{id ? "Alterar Loja" : "Adicionar Loja"}</Button>
                        </Row>
                    </Form >
                </Row>
            </Col>
        </Row>
    );
}

