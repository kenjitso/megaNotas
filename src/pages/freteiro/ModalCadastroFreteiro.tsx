import InputNumero from "@/components/inputs/InputNumero";
import { FreteiroController } from "@/datatypes/freteiro";
import useQueryMutation from "@/hooks/useQueryMutation";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

interface props {
    freteiroId?: string,
    onHide: () => void,

}

export function ModalCadastroFreteiro({ onHide, freteiroId }: props) {

    const freteiroMutator = useQueryMutation(FreteiroController.createNew(), {
        queryEnabled: !!freteiroId && typeof onHide==='function',
        queryKey: ["freteirositens", freteiroId ?? ""],
        queryFn: async () => await FreteiroController.get(freteiroId ?? ""),
        onSaveSuccess: onHide,
        toasts: {
            saveComplete: freteiroId ? `Freteiro alterado com sucesso!` : `Freteiro cadastrado com sucesso!`,
        },
        saveFn: FreteiroController.save,
        invalidateKeys: [["freteirositens"]]
    });

    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={freteiroId !== undefined}
            onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title> {freteiroId ? "Atualizar Freteiro" : "Cadastrar Freteiro"} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="body text-center">
                        <Row className="menuFreteiro">
                            <Form className="text-start">
                                <Row>
                                    <Form.Group
                                        controlId="formNome"
                                        className="mb-3">
                                        <FloatingLabel
                                            controlId="formNome"
                                            label="Nome">
                                            <Form.Control
                                                title="Por favor, insira apenas caracteres não numéricos"
                                                value={freteiroMutator.state.nome}
                                                onChange={((event) => freteiroMutator.update("nome", event.target.value))}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFixo" className="mb-3">
                                            <Form.Label><b>Valor fixo:</b></Form.Label>
                                            <Form.Control
                                                as={InputNumero}
                                                type="number"
                                                decimals={2}
                                                value={freteiroMutator.state.fixo}
                                                placeholder="Insira o valor fixo" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formValorMin" className="mb-3">
                                            <Form.Label><b>Percentual:</b></Form.Label>
                                            <Form.Control
                                                as={InputNumero}
                                                type="number"
                                                decimals={0}
                                                max={100}
                                                value={freteiroMutator.state.fixo}
                                                placeholder="Insira o Percentual"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>

                        </Row>
                    </Col >
                </Row >
            </Modal.Body>
            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => { freteiroMutator.save() }}>
                    {freteiroId ? "Atualizar Freteiro" : "Cadastrar Freteiro"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}