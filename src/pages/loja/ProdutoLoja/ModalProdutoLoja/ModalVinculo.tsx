import { CatalogoController, ICatalogo } from "@/datatypes/catalogo";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import React, { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import useDataTypes from "@/hooks/useDataTypes";
import { abreviaLink } from "@/components/utils/AbreviaLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";

interface IProps {
    produtoParaguay?: IProdutoLoja;
    onHide: () => void;
}

export function ModalVinculo({ onHide, produtoParaguay }: IProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [filtro, setFiltro] = useState("");
    const [lastCheckedIndex, setLastCheckedIndex] = useState<number>(0);
    const queryClient = useQueryClient();



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
        onSuccess: () => {
            onHide();
            queryClient.invalidateQueries(["catalogosHome"]);
        }
    });

    useEffect(() => {
        setSelectedIds(new Set(produtoParaguay?.vinculos ?? []))
    }, [produtoParaguay]);

    const handleCheckboxChange = (
        id: string,
        index: number,
        event: React.MouseEvent<HTMLInputElement>
    ) => {
        const update = new Set(selectedIds);

        if (event.shiftKey && selectedIds.has(id) !== null) {
            const start = Math.min(lastCheckedIndex, index);
            const end = Math.max(lastCheckedIndex, index);
            const idsToSelect = data?.items.map((item) => item.id ?? "").slice(start, end + 1);

            if (idsToSelect) {
                const isSelecting = !selectedIds.has(id);
                idsToSelect.forEach((item) => {
                    if (isSelecting) {
                        update.add(item);
                    } else {
                        update.delete(item);
                    }
                });
            }

            setSelectedIds(update);
        } else {
            if (selectedIds.has(id)) {
                update.delete(id);
            } else {
                update.add(id);
            }
            setLastCheckedIndex(index);
            setSelectedIds(update);
        }
    }

    const formataDados = (nome: string | null): string[] => {
        let tamanho: string;
        let valores: string[];

        const regex = /(64|128|256|512)/; // Expressão regular para detectar "64G" ou "128G"

        if (!nome) return ['']; // Retorna um array vazio se o nome for nulo ou indefinido

        if (regex.test(nome)) {
            valores = nome.split(regex);
            tamanho = valores[1]; // O segundo item será "64G" ou "128G"
        } else {
            return [nome]; // Retorna o nome original como um array se não houver "64G" ou "128G" no texto
        }

        return valores;
    };



    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={produtoParaguay?.id !== undefined}
            onHide={onHide}
        >

            <Modal.Header closeButton>
                <Modal.Title> Vincular Catálogo ao Produto </Modal.Title>
            </Modal.Header>


            <Modal.Body className="text-center">

                {formataDados(produtoParaguay?.nome ?? "")[0]}
                <span className="text-info">
                    {formataDados(produtoParaguay?.nome ?? "")[1]}
                </span>
                {formataDados(produtoParaguay?.nome ?? "")[2]}

                <br />
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



                    <Table className={isLoading || mutation.isLoading ? "invisible" : ""}>
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
                                    <td>
                                        {catalogoProduto.nome}
                                    </td>
                                    <td>{abreviaLink(catalogoProduto.url_catalogo, 50)}</td>
                                    <td className="td50">
                                        <Form.Check
                                            checked={selectedIds.has(catalogoProduto.id ?? "")}
                                            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleCheckboxChange(catalogoProduto.id ?? "", index, e)}
                                            readOnly
                                        />
                                    </td>
                                </tr>
                            ))}
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