import FragmentLoading from "@/components/fragments/FragmentLoading";
import { CatalogoController } from "@/datatypes/catalogo";
import useQueryMutation from "@/hooks/useQueryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "react-bootstrap";

interface IProps {
    catalogoId?: string,
    onHide: () => void,
}

export function ModalDesativaCatalogo({ onHide, catalogoId }: IProps) {

    const queryClient = useQueryClient();

    const catalogoMutator = useQueryMutation(new CatalogoController(), {
        queryEnabled: !!catalogoId && typeof onHide === 'function',
        queryKey: ["catalogos", catalogoId ?? ""],
        queryFn: async () => await CatalogoController.get(catalogoId ?? ""),
        onSaveSuccess: () => {
            onHide();
            queryClient.invalidateQueries(["catalogoshome"]);
            queryClient.invalidateQueries(["lojamanual"]);
            catalogoMutator.clear();
        },
        toasts: {
            saveComplete: `Catalogo desativado com sucesso!`,
        },
        saveFn: () => CatalogoController.deactivate(catalogoId ?? ""),
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
                {catalogoMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
                    <div>Confirma desativação do catalogo?</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={catalogoMutator.isLoading}
                    onClick={() => catalogoMutator.save()}>
                    Confirmar
                </Button>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={catalogoMutator.isLoading}
                    onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}