import FragmentLoading from "@/components/fragments/FragmentLoading";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ILoja } from "@/datatypes/loja";
import useQueryMutation from "@/hooks/useQueryMutation";
import React from "react";
import { Button, Modal } from "react-bootstrap";




interface IProps {
    lojaId?: ILoja;
    produtoParaguay?: IProdutoLoja;
    onHide: () => void;
    onOpenModalVinculoML?: () => void;

}

export function ModalDeletaProdutoLoja({ onHide, produtoParaguay, lojaId }: IProps) {
    const show = produtoParaguay !== undefined;

    const produtoLojaMutator = useQueryMutation(new ProdutoLojaController(), {
        queryEnabled: false,
        queryKey: ["produtosloja", produtoParaguay?.id ?? "function"],
        queryFn: async () => await ProdutoLojaController.getId(produtoParaguay?.id ?? ""),
        onSaveSuccess: () => {
            onHide();
            produtoLojaMutator.clear();
        },
        toasts: {
            saveComplete: `Produto deletado com sucesso!`,
        },
        saveFn: () => ProdutoLojaController.delete(produtoParaguay?.id ?? ""),
    });

    React.useEffect(() => {
        if (!show) return;
        produtoLojaMutator.refetch();
    }, [show]);


    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={show}
            onHide={() => onHide()}>

            <Modal.Header closeButton>
                <Modal.Title> Desativar Freteiro </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {produtoLojaMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
                    <div>Confirma deletar produto?</div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={produtoLojaMutator.isLoading}
                    onClick={() => produtoLojaMutator.save()}>
                    Confirmar
                </Button>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={produtoLojaMutator.isLoading}
                    onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );


}