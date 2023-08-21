import FragmentLoading from "@/components/fragments/FragmentLoading";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { useSort, compareValues } from "@/components/utils/FilterArrows";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ICatalogo, CatalogoController } from "@/datatypes/catalogo";
import { ILoja } from "@/datatypes/loja";
import { abreviaLink } from "@/features/AbreviaLink";
import { buildUrl } from "@/features/UrlLinkLojas";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { Modal, Button, Row, Col, FloatingLabel, Table, Form } from "react-bootstrap";

interface IProps {
    lojaId?: ILoja;
    produtoParaguay?: IProdutoLoja;
    onHide?: () => void;
    onOpenModalVinculoML?: () => void;

}

export function ModalTableRemoveVinculo({ onHide, produtoParaguay, lojaId }: IProps) {
    return (
        <Modal
            size="lg"
            backdrop="static"
            keyboard={false}
            show={produtoParaguay?.id !== undefined}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title> Vincular Catálogo ao Produto do Paraguay</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <a
                    style={{ color: "blue" }}
                    href={buildUrl(lojaId?.algoritmo || 0, produtoParaguay?.codigo || "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={produtoParaguay?.codigo}
                >
                    {produtoParaguay?.marca + " "}
                    {produtoParaguay?.nome + " "}
                    {produtoParaguay?.cor + " "}
                    {produtoParaguay?.rede + "G "}
                    {produtoParaguay?.ram + "RAM "}
                    {produtoParaguay?.capacidade + "GB "}
                    {"(" + produtoParaguay?.origem + ")"}
                </a>



                <br />
                <br /><br />
                <TableVinculoManual produtoParaguay={produtoParaguay} onHide={onHide} />
            </Modal.Body>
        </Modal>
    );
}




export function TableVinculoManual({ produtoParaguay, onHide }: IProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [filtro, setFiltro] = useState("");
    const [lastCheckedIndex, setLastCheckedIndex] = useState<number>(0);
    const queryClient = useQueryClient();
    const { sortOrder, sortBy, handleSort } = useSort<ICatalogo>('nome');



    const { isFetching, data } = useQuery(["lojamanual", filtro], () => {
        const catalogoVinculos = CatalogoController.search(filtro, true);
        return catalogoVinculos
    });


    const catalogoVinculos = useMemo(() => {

        let dados = data?.map((catalogo: ICatalogo) => {

            return catalogo;
        }) ?? []

        dados = dados.filter(catalogo => catalogo.ativo === true);

        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const total = sortedData.length;
        const items = sortedData;
        return {
            total, items
        }


    }, [data, sortBy, sortOrder]);


    const mutation = useMutation(() => {
        if (!produtoParaguay) throw new Error("Produto Indefinido");
        produtoParaguay.vinculos = [...selectedIds.values()];

       
            // Verifica e ajusta os campos corPulseira e tipoPulseira se necessário
            if (produtoParaguay.corPulseira === "n/a") produtoParaguay.corPulseira = "";
            if (produtoParaguay.tipoPulseira === "n/a") produtoParaguay.tipoPulseira = "";
            if (produtoParaguay.cor === "n/a") produtoParaguay.cor = "";

            // Ajusta o nome com base na categoria
            if (produtoParaguay.categoria === "CELULAR") {
                produtoParaguay.nome = produtoParaguay.categoria + " " + produtoParaguay.marca + " " + produtoParaguay.nome + " #* " + produtoParaguay.cor + " " + produtoParaguay.rede + "G R" + produtoParaguay.ram + "GB C" + produtoParaguay.capacidade + "GB ";
            }
            if (produtoParaguay.categoria === "RELOGIO") {
                produtoParaguay.nome = produtoParaguay.categoria + " " + produtoParaguay.marca + " " + produtoParaguay.nome + " #* " + produtoParaguay.cor + " " + produtoParaguay.rede + "G " + produtoParaguay.caixaMedida + " " + produtoParaguay.corPulseira + " " + produtoParaguay.tipoPulseira;
            }

            // Após realizar os ajustes, chama a atualização no ProdutoLojaController
            return ProdutoLojaController.update(produtoParaguay);
      
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["catalogoshome"]);
            queryClient.invalidateQueries(["produtosloja"]);
            queryClient.invalidateQueries(["catalogos"]);
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
            const idsToSelect = catalogoVinculos?.items?.map((item) => item.id ?? "").slice(start, end + 1);

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


    return (
        <>

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



                <Table className={isFetching || mutation.isLoading ? "invisible" : ""}>
                    <thead>
                        <tr>
                            <th className="th200" onClick={() => handleSort("nome")}>
                                <div className="thArrow">
                                    <span>Nome</span>
                                    <span>
                                        {sortBy === "nome" ? (sortOrder ? "▲" : "▼") : ""}
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
                        {catalogoVinculos?.items?.map((catalogoProduto, index) => (
                            <tr key={index}>


                                <td>

                                    {catalogoProduto.nome}

                                </td>

                                <td>
                                    <a
                                        style={{ color: "blue" }}

                                        href={catalogoProduto.url_catalogo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={produtoParaguay?.codigo}
                                    >
                                        {abreviaLink(catalogoProduto.url_catalogo, 50)}
                                    </a>
                                </td>
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
                {isFetching || mutation.isLoading && <FragmentLoading />}
            </div><br />
            <Button
                className="position mx-2"
                variant="secondary"
                onClick={onHide}>
                Cancelar
            </Button>
            <Button
                className="position"
                variant="secondary"
                onClick={() => mutation.mutate()}
            >
                Confirmar Manual
            </Button>
        </>
    );
}
