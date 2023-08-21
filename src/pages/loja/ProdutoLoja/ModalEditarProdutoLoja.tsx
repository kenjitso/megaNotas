import FragmentLoading from "@/components/fragments/FragmentLoading";
import { isValidForm } from "@/components/utils/ValidForm";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ILoja } from "@/datatypes/loja";
import useQueryMutation from "@/hooks/useQueryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, FloatingLabel, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { formatCurrency } from "@/features/FormatCurrency";

interface IProps {
    lojaId?: ILoja;
    produtoParaguay?: IProdutoLoja;
    onHide: () => void;
    onOpenModalVinculoML?: () => void;

}

export function ModalEditarProdutoLoja({ onHide, produtoParaguay, lojaId }: IProps) {
    const queryClient = useQueryClient();
    const [produtoFormatado, setProdutoFormatado] = useState<IProdutoLoja | null>(null);


    const produtoLojaMutator = useQueryMutation(ProdutoLojaController.createNew(), {
        queryEnabled: Boolean(produtoParaguay),
        queryKey: ["produtosloja", produtoParaguay?.id ?? "function"],
        queryFn: async () => {
            if (produtoParaguay) {
                return await ProdutoLojaController.getProduto(produtoParaguay);
            }
            // Se necessário, você pode retornar algo padrão aqui se produtoParaguay estiver undefined
            throw new Error("produtoParaguay is not defined.");
        },
        onSaveSuccess: () => {
            onHide();
            queryClient.invalidateQueries(["produtosloja"]);
        },
        toasts: {
            saveComplete: `Produto ${produtoParaguay?.codigo} atualizado com sucesso!`
        },

        saveFn: (produto) => ProdutoLojaController.update(produto),
    });





    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={produtoParaguay !== undefined}
            onHide={() => { onHide(); produtoLojaMutator.clear(); }}>

            <Modal.Header closeButton>
                <Modal.Title>Editar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {lojaId && produtoLojaMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (

                    <Row className="gx-5">


                        <Col className="mb-4" xs={12}>
                            <Card>
                                <Card.Header><strong>Codigo:</strong> {produtoParaguay?.codigo}</Card.Header>
                                <Card.Header><strong>Nome original:</strong> {produtoParaguay?.nome_original}</Card.Header>
                                <Card.Body>
                                    <Form>

                                        <Form.Group
                                            controlId="formNomeOriginal"
                                            className="mb-3">
                                            <FloatingLabel controlId="formNomeOriginal" label="Descrição">
                                                <Form.Control
                                                    title="Por favor, insira apenas caracteres não numéricos"
                                                    value={produtoLojaMutator.state.nome_original}

                                                    onChange={(event) => produtoLojaMutator.update("nome_original", event.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Por favor, preencha o campo nome.</div>
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group controlId="formCategoria" className="mb-3">
                                            <FloatingLabel controlId="formCategoria" label="Categoria">
                                                <Form.Select
                                                    title="Por favor, selecione uma categoria"
                                                    value={produtoLojaMutator.state.categoria}
                                                    onChange={(event) => produtoLojaMutator.update("categoria", event.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Selecione uma categoria</option>
                                                    <option value="CELULAR">CELULAR</option>
                                                    <option value="RELOGIO">RELOGIO</option>
                                        
                                                </Form.Select>
                                                <div className="invalid-feedback">Por favor, preencha o campo categoria.</div>
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group controlId="formMarca" className="mb-3">
                                            <FloatingLabel controlId="formMarca" label="Marca">
                                                <Form.Select
                                                    title="Por favor, selecione uma marca"
                                                    value={produtoLojaMutator.state.marca}
                                                    onChange={(event) => produtoLojaMutator.update("marca", event.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Selecione uma marca</option>
                                                    <option value="XIAOMI">XIAOMI</option>
                                                    <option value="APPLE">APPLE</option>
                                                    <option value="SAMSUNG">SAMSUNG</option>
                                                </Form.Select>
                                                <div className="invalid-feedback">Por favor, preencha o campo marca.</div>
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group
                                            controlId="formModelo"
                                            className="mb-3">
                                            <FloatingLabel controlId="formModelo" label="Modelo">
                                                <Form.Control
                                                    title="Por favor, insira apenas caracteres não numéricos"
                                                    value={produtoLojaMutator.state.nome}
                                                    onChange={(event) => produtoLojaMutator.update("nome", event.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Por favor, preencha o campo nome.</div>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group
                                            controlId="formCor"
                                            className="mb-3">
                                            <FloatingLabel controlId="formCor" label="Cor">
                                                <Form.Control
                                                    title="Por favor, insira apenas caracteres não numéricos"
                                                    value={produtoLojaMutator.state.cor}
                                                    onChange={(event) => produtoLojaMutator.update("cor", event.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Por favor, preencha o campo cor.</div>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formRede" className="mb-3">
                                            <FloatingLabel controlId="formRede" label="Rede">
                                                <Form.Select
                                                    title="Por favor, selecione uma rede"
                                                    value={produtoLojaMutator.state.rede}
                                                    onChange={(event) => produtoLojaMutator.update("rede", parseInt(event.target.value))}
                                                    required
                                                >
                                                    <option value="" disabled>Selecione uma rede</option>
                                                    <option value="0">0G</option>
                                                    <option value="4">4G</option>
                                                    <option value="5">5G</option>
                                                </Form.Select>
                                                <div className="invalid-feedback">Por favor, preencha o campo Rede.</div>
                                            </FloatingLabel>
                                        </Form.Group>




                                        {produtoLojaMutator.state.categoria === "CELULAR" && (
                                            <>
                                                <Form.Group controlId="formMemoria" className="mb-3">
                                                    <FloatingLabel controlId="formMemoria" label="Memoria">
                                                        <Form.Select
                                                            title="Por favor, selecione a memoria ram"
                                                            value={produtoLojaMutator.state.ram}
                                                            onChange={(event) => produtoLojaMutator.update("ram", parseInt(event.target.value))}
                                                            required
                                                        >

                                                            <option value="" disabled>Selecione a ram</option>
                                                            <option value="0">0GB</option>
                                                            <option value="1">1GB</option>
                                                            <option value="2">2GB</option>
                                                            <option value="3">3GB</option>
                                                            <option value="4">4GB</option>
                                                            <option value="6">6GB</option>
                                                            <option value="8">8GB</option>
                                                            <option value="12">12GB</option>
                                                            <option value="16">16GB</option>
                                                        </Form.Select>
                                                        <div className="invalid-feedback">Por favor, preencha o campo Rede.</div>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group controlId="formCapacidade" className="mb-3">
                                                    <FloatingLabel controlId="formCapacidade" label="Capacidade">
                                                        <Form.Select
                                                            title="Por favor, selecione a capacidade"
                                                            value={produtoLojaMutator.state.capacidade}
                                                            onChange={(event) => produtoLojaMutator.update("capacidade", parseInt(event.target.value))}
                                                            required
                                                        >

                                                            <option value="" disabled>Selecione a capacidade</option>
                                                            <option value="0">0GB</option>
                                                            <option value="16">16GB</option>
                                                            <option value="32">32GB</option>
                                                            <option value="64">64GB</option>
                                                            <option value="128">128GB</option>
                                                            <option value="256">256GB</option>
                                                            <option value="512">512GB</option>
                                                            <option value="1024">1024GB</option>

                                                        </Form.Select>
                                                        <div className="invalid-feedback">Por favor, preencha o campo Rede.</div>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group controlId="formOrigem" className="mb-3">
                                                    <FloatingLabel controlId="formOrigem" label="Origem">
                                                        <Form.Select
                                                            title="Por favor, selecione a origem"
                                                            value={produtoLojaMutator.state.origem}
                                                            onChange={(event) => produtoLojaMutator.update("origem", event.target.value)}
                                                            required
                                                        >

                                                            <option value="" disabled>Selecione a origem</option>
                                                            <option value="GLOBAL">GLOBAL</option>
                                                            <option value="GLOBAL">CHINA</option>
                                                            <option value="GLOBAL">INDIA</option>
                                                            <option value="GLOBAL">INDONESIA</option>


                                                        </Form.Select>
                                                        <div className="invalid-feedback">Por favor, preencha o campo Rede.</div>
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </>

                                        )}



                                        {produtoLojaMutator.state.categoria === "RELOGIO" && (
                                            <>

                                                <Form.Group controlId="formCaixaMedida" className="mb-3">
                                                    <FloatingLabel controlId="formCaixaMedida" label="Caixa Medida">
                                                        <Form.Select
                                                            title="Por favor, selecione uma caixa medida"
                                                            value={produtoLojaMutator.state.caixaMedida}
                                                            onChange={(event) => produtoLojaMutator.update("caixaMedida", event.target.value)}
                                                            required
                                                        >
                                                            <option value="" disabled>Selecione uma medida</option>
                                                            <option value="0MM">0MM</option>
                                                            <option value="38MM">38MM</option>
                                                            <option value="39MM">39MM</option>
                                                            <option value="40MM">40MM</option>
                                                            <option value="41MM">41MM</option>
                                                            <option value="42MM">42MM</option>
                                                            <option value="43MM">43MM</option>
                                                            <option value="44MM">44MM</option>
                                                            <option value="45MM">45MM</option>
                                                            <option value="46MM">46MM</option>
                                                            <option value="47MM">47MM</option>
                                                            <option value="48MM">48MM</option>
                                                            <option value="49MM">49MM</option>
                                                            <option value="50MM">50MM</option>
                                                        </Form.Select>
                                                        <div className="invalid-feedback">Por favor, preencha o campo caixa medida.</div>
                                                    </FloatingLabel>
                                                </Form.Group>

                                                <Form.Group
                                                    controlId="formPulseira"
                                                    className="mb-3">
                                                    <FloatingLabel controlId="formPulseira" label="Cor da pulseira">
                                                        <Form.Control
                                                            title="Por favor, insira apenas caracteres não numéricos"
                                                            value={produtoLojaMutator.state.tipoPulseira}
                                                            onChange={(event) => produtoLojaMutator.update("tipoPulseira", event.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">Por favor, preencha o campo Nome.</div>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group
                                                    controlId="formPulseira"
                                                    className="mb-3">
                                                    <FloatingLabel controlId="formPulseira" label="Tipo  de Pulseira ex: Esportiva">
                                                        <Form.Control
                                                            title="Por favor, insira apenas caracteres não numéricos"
                                                            value={produtoLojaMutator.state.tipoPulseira}
                                                            onChange={(event) => produtoLojaMutator.update("tipoPulseira", event.target.value)}
                                                            required
                                                        />
                                                        <div className="invalid-feedback">Por favor, preencha o campo Nome.</div>
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </>
                                        )}


                                        <Form.Group
                                            controlId="formPreco"
                                            className="mb-3">
                                            <FloatingLabel controlId="formPreco" label="Preço">
                                                <Form.Control
                                                    title="Por favor, insira apenas caracteres não numéricos"
                                                    value={formatCurrency(produtoLojaMutator.state.preco ?? 0)}
                                                    onChange={(event) => produtoLojaMutator.update("preco", Number(event.target.value))}
                                                    required
                                                />
                                                <div className="invalid-feedback">Por favor, preencha o campo Nome.</div>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    disabled={!produtoParaguay || produtoLojaMutator.isLoading}
                    onClick={() => {
                        if (isValidForm()) {
                            produtoLojaMutator.save();
                        };
                    }}>
                    Atualizar Produto
                </Button>
            </Modal.Footer>
        </Modal>
    );
}