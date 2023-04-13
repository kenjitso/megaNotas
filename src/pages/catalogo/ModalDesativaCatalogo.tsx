import { CatalogoController } from "@/datatypes/catalogo";
import useQueryMutation from "@/hooks/useQueryMutation";
import { Button, Modal } from "react-bootstrap";

interface IProps {
    catalogoId?: string,
    onHide: () => void,
}

export function ModalDesativaCatalogo({ onHide, catalogoId }: IProps) {
    const catalogoMutator = useQueryMutation(new CatalogoController(), {
        queryEnabled: !!catalogoId && typeof onHide === 'function',
        queryKey: ["Catalogos", catalogoId ?? ""],
        queryFn: async () => await CatalogoController.get(catalogoId ?? ""),
        onSaveSuccess: onHide,
        saveFn: () => CatalogoController.deactivate(catalogoId ?? ""),
        invalidateKeys: [["Catalogos"]]
    });

    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={catalogoId !== ""}
            onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title> Desativar catalogo </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Confirma desativação do catalogo?
            </Modal.Body>
            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => catalogoMutator.save()}>
                    Confirmar
                </Button>
                <Button className="position" variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}