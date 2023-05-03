import InputNumero from "@/components/inputs/InputNumero";
import { LojaController } from "@/datatypes/loja";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ModalDolarProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    cotacaoDolar: string;
}

export function ModalDolar({ showModal, setShowModal, cotacaoDolar }: ModalDolarProps) {

    const [inputDolar, setCotacaoDolar] = useState(0);

    const queryClient = useQueryClient();

    const mutation = useMutation(() => {
        return LojaController.updateCotacao(inputDolar);
    }, {
        onSuccess: () => {

            setShowModal(false);
            setCotacaoDolar(0);
            queryClient.invalidateQueries(["lojas"]);
            queryClient.invalidateQueries(["catalogosHome"]);
        },
    });


    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={showModal}
            onHide={() => { setShowModal(false); setCotacaoDolar(0); }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Inserir cotação do dólar manualmente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCotacao">
                        <Form.Label>Cotação do dólar:</Form.Label>
                        <Form.Control
                            as={InputNumero}
                            type="number"
                            decimals={2}
                            value={(inputDolar)}
                            onValueChange={(value: number) => setCotacaoDolar(value)}
                            placeholder="Insira a cotação"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => { mutation.mutate() }}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
