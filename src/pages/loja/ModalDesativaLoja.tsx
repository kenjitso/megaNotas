import FragmentLoading from "@/components/fragments/FragmentLoading";
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
        queryKey: ["lojas", lojaId ?? ""],
        queryFn: async () => await LojaController.get(lojaId ?? ""),
        onSaveSuccess: () => {
            onHide();
            lojaMutator.clear();
        },
        toasts: {
            saveComplete: `Loja desativado com sucesso!`,
        },
        saveFn: () => LojaController.deactivate(lojaId ?? ""),
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
                {lojaMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
                    <div>Confirma desativação do loja?</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                className="position" 
                variant="secondary" 
                disabled={lojaMutator.isLoading}
                onClick={() => { lojaMutator.save(); }}>
                    Confirmar
                </Button>
                <Button 
                className="position" 
                variant="secondary" 
                disabled={lojaMutator.isLoading}
                onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal >
    );
}