import { CatalogoController, ICatalogo } from "@/datatypes/catalogo";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import useDataTypes from "@/hooks/useDataTypes";
import { abreviaLink } from "@/components/utils/AbreviaLink";
import { useMutation } from "@tanstack/react-query";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";


interface IProps {
    produtoParaguay?: IProdutoLoja;
    onHide: () => void;
}

export function ModalVinculo({ onHide, produtoParaguay }: IProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [filtro, setFiltro] = useState("");

    const {
        isLoading,
        orderBy,
        ordem,
        ordenar,
        data
    } = useDataTypes<ICatalogo>({
        queryKey: ["lojas"],
        queryFn: async () => await CatalogoController.search(1, 10, filtro, ordenar, ordem ? "crescente" : "descrescente", true),
        filtro: filtro,
        defaultOrder: "nome"
    });

    const mutation = useMutation(() => {
        if (!produtoParaguay) throw new Error("Produto Indefinido");
        produtoParaguay.vinculos = [...selectedIds.values()];
        return ProdutoLojaController.update(produtoParaguay);
    }, {
        onSuccess: onHide
    });

    useEffect(() => {
        setSelectedIds(new Set(produtoParaguay?.vinculos ?? []))
    }, [produtoParaguay]);

    const handleCheckboxChange = (id: string) => {
        const update = new Set(selectedIds);
        if (selectedIds.has(id)) {
            update.delete(id);
            setSelectedIds(update);
            return;
        }
        update.add(id);
        setSelectedIds(update);
    };

    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={produtoParaguay?.id !== undefined}
            onHide={onHide}>

            <Modal.Header closeButton>
                <Modal.Title> Vincular Catálogo ao Produto </Modal.Title>
            </Modal.Header>
            <Modal.Body className = "text-center">

                {produtoParaguay?.nome}

                
                <Row className="my-3">
                        <Col xs className="d-flex ">
                            <FloatingLabel className="w-100" label="Pesquisar">
                                <InputSearchDebounce
                                    controlName="sku"
                                    placeholder="pesquisar"
                                    onUpdate={setFiltro}
                                />
                            </FloatingLabel>

                        </Col>
                    </Row>
                
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>


                 
                    <Table  className={isLoading || mutation.isLoading ? "invisible" : ""}>
                        <thead>
                            <tr>
                                <th className="th200" onClick={() => orderBy("nome")}>
                                    <div className="thArrow">
                                        <span>Nome</span>
                                        <span>
                                            {ordenar === "nome" && (ordem ? "▼" : "▲")}
                                        </span>
                                    </div>
                                </th>
                                <th className="th150" >
                                    <div className="thArrow">
                                        <span>Catalogo</span>
                                    </div>
                                </th>
                                <th className="th50">Vincular</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.items.map((catalogoProduto, index) => (
                                <tr key={index}>
                                    <td>{catalogoProduto.nome}</td>
                                    <td>{abreviaLink(catalogoProduto.url_catalogo, 50)}</td>
                                    <td className="td50">
                                        <Form.Check
                                            checked={selectedIds.has(catalogoProduto.id)}
                                            onChange={() => handleCheckboxChange(catalogoProduto.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                    {isLoading || mutation.isLoading && <FragmentLoading />}
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    onClick={() => mutation.mutate()}
                >
                    Confirmar
                </Button>
                <Button
                    className="position"
                    variant="secondary"
                    onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}