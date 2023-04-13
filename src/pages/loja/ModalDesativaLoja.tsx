import { ILoja, LojaController } from "@/datatypes/loja";
import useQueryMutation from "@/hooks/useQueryMutation";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

interface IProps {
    lojaId?: string,
    onHide: () => void,

}

export function ModalDesativaLoja({ onHide, lojaId }: IProps) {

    const lojaMutator = useQueryMutation(new LojaController(), {
        queryEnabled: !!lojaId && typeof onHide === 'function',
        queryKey: ["Lojas", lojaId ?? ""],
        queryFn: async () => await LojaController.get(lojaId ?? ""),
        onSaveSuccess: onHide,
        saveFn: () => LojaController.deactivate(lojaId ?? ""),
        invalidateKeys: [["Lojas"]]
    });

    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={lojaId !== ""}
            onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title> Desativar Loja </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Confirma desativação do loja?
            </Modal.Body>
            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => lojaMutator.save()}>
                    Confirmar
                </Button>
                <Button className="position" variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal >
    );
}