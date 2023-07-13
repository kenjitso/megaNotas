import FragmentLoading from "@/components/fragments/FragmentLoading";
import InputNumero from "@/components/inputs/InputNumero";
import { isValidForm } from "@/components/utils/ValidForm";
import { FreteiroController } from "@/datatypes/freteiro";
import useQueryMutation from "@/hooks/useQueryMutation";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

interface props {
    freteiroId?: string,
    onHide: () => void,

}

export function ModalCadastroFreteiro({ onHide, freteiroId }: props) {

    const freteiroMutator = useQueryMutation(FreteiroController.createNew(), {
        queryEnabled: !!freteiroId && typeof onHide === 'function',
        queryKey: ["freteiros", freteiroId ?? ""],
        queryFn: async () => await FreteiroController.get(freteiroId ?? ""),
        onSaveSuccess: () => {
            onHide();
            freteiroMutator.clear();
        },
        toasts: {
            saveComplete: freteiroId ? `Freteiro alterado com sucesso!` : `Freteiro cadastrado com sucesso!`,
        },
        saveFn: (freteiroArray) => {
            const freteiroObject = {
                id: freteiroArray.id ?? "",
                ativo: freteiroArray.ativo ?? true,
                nome: freteiroArray.nome,
                fixo: freteiroArray.fixo,
                percentual: freteiroArray.percentual,
            }
      
            return FreteiroController.save(freteiroObject);
        },
    });


    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={freteiroId !== undefined}
            onHide={() => { onHide(); freteiroMutator.clear(); }}>

            <Modal.Header closeButton>
                <Modal.Title> {freteiroId ? "Atualizar Freteiro" : "Cadastrar Freteiro"} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {freteiroId && freteiroMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
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
                                                    value={freteiroMutator.state.nome??""}
                                                    onChange={((event) => freteiroMutator.update("nome", event.target.value))}
                                                    required
                                                />
                                                <div className="invalid-feedback">Por favor, preencha o campo Nome.</div>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="formFixo"
                                                className="mb-3">
                                                <FloatingLabel
                                                    controlId="formFixo"
                                                    label="Fixo">
                                                    <Form.Control
                                                        as={InputNumero}
                                                        type="number"
                                                        decimals={2}
                                                        value={freteiroMutator.state.fixo??0}
                                                        onValueChange={(numero: number) => freteiroMutator.update("fixo", numero)}
                                                        placeholder="Insira o valor fixo"
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group
                                                controlId="formValorMin"
                                                className="mb-3">
                                                <FloatingLabel
                                                    controlId="formValorMin"
                                                    label="Percentual">
                                                    <Form.Control
                                                        as={InputNumero}
                                                        type="number"
                                                        decimals={2}
                                                        max={100}
                                                        value={freteiroMutator.state.percentual??0}
                                                        onValueChange={(numero: number) => freteiroMutator.update("percentual", numero)}
                                                        placeholder="Insira o Percentual"
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>

                            </Row>
                        </Col >
                    </Row >
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={!!freteiroId && freteiroMutator.isLoading}
                    onClick={() => {
                        if (isValidForm()) { freteiroMutator.save(); };
                    }}>
                    {freteiroId ? "Atualizar Freteiro" : "Cadastrar Freteiro"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}