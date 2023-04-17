import FragmentLoading from "@/components/fragments/FragmentLoading";
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
        queryKey: ["freteiros", freteiroId ?? ""],
        queryFn: async () => await FreteiroController.get(freteiroId ?? ""),
        onSaveSuccess: () => {
            onHide();
            freteiroMutator.clear();
        },
        toasts: {
            saveComplete: `Freteiro desativado com sucesso!`,
        },
        saveFn: () => FreteiroController.deactivate(freteiroId ?? ""),
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
                {freteiroMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
                    <div>Confirma desativação do freteiro?</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={freteiroMutator.isLoading}
                    onClick={() => freteiroMutator.save()}>
                    Confirmar
                </Button>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={freteiroMutator.isLoading}
                    onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}