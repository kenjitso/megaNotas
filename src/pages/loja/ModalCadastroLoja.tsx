import FragmentLoading from "@/components/fragments/FragmentLoading";
import InputNumero from "@/components/inputs/InputNumero";
import { isValidForm } from "@/components/utils/ValidForm";
import { LojaController } from "@/datatypes/loja";
import useQueryMutation from "@/hooks/useQueryMutation";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

interface IProps {
    lojaId?: string;
    onHide: () => void;
}

export function ModalCadastroLoja({ onHide, lojaId }: IProps) {

    const lojaMutator = useQueryMutation(LojaController.createNew(), {
        queryEnabled: !!lojaId && typeof onHide === 'function',
        queryKey: ["lojas", lojaId ?? ""],
        queryFn: async () => await LojaController.get(lojaId ?? ""),
        onSaveSuccess: () => {
            onHide();
            lojaMutator.clear();
        },
        toasts: {
            saveComplete: lojaId ? `Loja alterado com sucesso!` : `Loja cadastrado com sucesso!`
        },
        saveFn: LojaController.save,
    });



    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={lojaId !== undefined}
            onHide={() => { onHide(); lojaMutator.clear(); }}>

            <Modal.Header closeButton>
                <Modal.Title> {lojaId ? "Atualizar Loja" : "Cadastrar Loja"} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {lojaId && lojaMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
                    <Row>
                        <Col className="body text-center">
                            <Row className="menuloja">
                                <Form className="text-start">
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="formNome"
                                                className="mb-3">
                                                <FloatingLabel controlId="formNome" label="Nome">
                                                    <Form.Control
                                                        title="Por favor, insira apenas caracteres não numéricos"
                                                        value={lojaMutator.state.nome}
                                                        onChange={(event) => lojaMutator.update("nome", event.target.value)}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Por favor, preencha o campo Nome.</div>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group
                                                controlId="formCotacao"
                                                className="mb-3">
                                                <FloatingLabel
                                                    controlId="formCotacao"
                                                    label="Cotação">
                                                    <Form.Control
                                                        as={InputNumero}
                                                        type="number"
                                                        decimals={2}
                                                        value={lojaMutator.state.cotacao}
                                                        onValueChange={(numero: number) => lojaMutator.update("cotacao", numero)}
                                                        placeholder="Insira a cotação"
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="formUrlCotacao"
                                                className="mb-3">
                                                <FloatingLabel
                                                    controlId="formUrlCotacao"
                                                    label="Url Cotação">
                                                    <Form.Control
                                                        value={lojaMutator.state.url_cotacao}
                                                        onChange={(event) => lojaMutator.update("url_cotacao", event.target.value)}
                                                        placeholder="Insira a URL cotação"
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group
                                                controlId="formUrlCatalogo"
                                                className="mb-3">
                                                <FloatingLabel
                                                    controlId="formUrlCatalogo"
                                                    label="Url Catalogo">
                                                    <Form.Control
                                                        type="text"
                                                        value={lojaMutator.state.url_catalogo}
                                                        onChange={(event) => lojaMutator.update("url_catalogo", event.target.value)}
                                                        placeholder="Insira a URL catálogo"
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>

                                            <Form.Group
                                                controlId="formUrlCatalogo"
                                                className="mb-3">
                                                 <Form.Select
                                                    value={lojaMutator.state.algoritmo}
                                                    onChange={(event) => lojaMutator.update("algoritmo", parseInt(event.target.value))}>
                                                    <option value="0">
                                                        Selecione o Algoritimo
                                                    </option>
                                                    <option value="1">
                                                        Atacado Games
                                                    </option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={!!lojaId && lojaMutator.isLoading}
                    onClick={() => {
                         if (isValidForm()){lojaMutator.save();}; 
                         }}>
                    {lojaId ? "Atualizar Loja" : "Cadastrar Loja"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}