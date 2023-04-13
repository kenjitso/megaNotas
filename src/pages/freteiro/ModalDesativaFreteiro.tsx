import { FreteiroController } from "@/datatypes/freteiro";
import useQueryMutation from "@/hooks/useQueryMutation";
import { Button, Modal } from "react-bootstrap";

interface IProps {
    freteiroId?: string,
    onHide: () => void,
}

export function ModalDesativaFreteiro({ onHide, freteiroId }: IProps) {

    const freteiroMutator = useQueryMutation(new FreteiroController(), {
        queryEnabled: !!freteiroId && typeof onHide === 'function',
        queryKey: ["Freteiros", freteiroId ?? ""],
        queryFn: async () => await FreteiroController.get(freteiroId ?? ""),
        onSaveSuccess: onHide,
        saveFn: () => FreteiroController.deactivate(freteiroId ?? ""),
        invalidateKeys: [["Freteiros"]],
    });

    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={freteiroId !== ""}
            onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title> Desativar Freteiro </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Confirma desativação do freteiro?
            </Modal.Body>
            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => freteiroMutator.save()}>
                    Confirmar
                </Button>
                <Button className="position" variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}