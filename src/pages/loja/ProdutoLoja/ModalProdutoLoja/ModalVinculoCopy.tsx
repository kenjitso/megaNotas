import FragmentLoading from "@/components/fragments/FragmentLoading";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { CatalogoController, ICatalogo } from "@/datatypes/catalogo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import ratata from "../../../../assets/ratata.svg";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import useDataTypes from "@/hooks/useDataTypes";
import { abreviaLink } from "@/components/utils/AbreviaLink";
interface IProps {
    produtoParaguay?: IProdutoLoja;
    onHide?: () => void;
    onOpenModalVinculoML?: () => void;

}

export function ModalVinculo({ onHide, produtoParaguay }: IProps) {
    const [selectedTable, setSelectedTable] = useState<string | null>(null);

    return (
        <Modal
            size="lg"
            backdrop="static"
            keyboard={false}
            show={produtoParaguay?.id !== undefined}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title> Vincular Catálogo ao Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">

                {produtoParaguay?.marca + " "}
                {produtoParaguay?.nome + " "}
                {produtoParaguay?.origem + " "}
                {produtoParaguay?.cor + " "}
                {produtoParaguay?.rede + "G "}
                {produtoParaguay?.ram + "RAM "}
                {produtoParaguay?.capacidade + "GB "}
                <br />
                <br /><br />
                <Button className="mx-2" onClick={() => setSelectedTable('ML')}> Catalogos - Mercado Livre</Button>
                <Button onClick={() => setSelectedTable('Manual')}>Catalogos - Manual</Button>
                {selectedTable === 'ML' && <TableVinculoML produtoParaguay={produtoParaguay} onHide={onHide} />}
                {selectedTable === 'Manual' && <TableVinculoManual produtoParaguay={produtoParaguay} onHide={onHide} />}
            </Modal.Body>
        </Modal>
    );
}




export function TableVinculoManual({ produtoParaguay, onHide }: IProps) {
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
        queryFn: async () => await CatalogoController.searchVinculo(1, 10, filtro, ordenar, ordem ? "crescente" : "descrescente", true),
        filtro: filtro,
        defaultOrder: "nome"
    });






    const mutation = useMutation(() => {
        if (!produtoParaguay) throw new Error("Produto Indefinido");
        produtoParaguay.vinculos = [...selectedIds.values()];
        return ProdutoLojaController.update(produtoParaguay);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["catalogosHome"]);
            queryClient.invalidateQueries(["produtosloja"]);
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
            const idsToSelect = data?.items?.map((item) => item.id ?? "").slice(start, end + 1);

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
                        {data?.items?.map((catalogoProduto, index) => (
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


export function TableVinculoML({ produtoParaguay, onHide }: IProps) {


    const [selectedUrl, setSelectedUrl] = useState<string>("");
    const [filtro, setFiltro] = useState("");
    const queryClient = useQueryClient();
    const [checkMarca, setCheckMarca] = useState(false);
    const [checkModelo, setCheckModelo] = useState(false);
    const [checkOrigem, setCheckOrigem] = useState(false);
    const [checkCor, setCheckCor] = useState(false);
    const [checkRede, setCheckRede] = useState(false);
    const [checkRam, setCheckRam] = useState(false);
    const [checkCapacidade, setCheckCapacidade] = useState(false);

    const resetForm = () => {
        setFiltro("");
        setCheckMarca(false);
        setCheckModelo(false);
        setCheckOrigem(false);
        setCheckCor(false);
        setCheckRede(false);
        setCheckRam(false);
        setCheckCapacidade(false);
    }


    const { isFetching,
        data,
        refetch,

    } = useQuery(["lojas", filtro], () => {
        const catalogo = CatalogoController.searchCatalogoML(filtro);
        return catalogo;
    }, { enabled: filtro ? true : false });

    const mutation = useMutation((url_catalogoML: string) => {
        if (!produtoParaguay) throw new Error("Produto Indefinido");
        return ProdutoLojaController.updateML(produtoParaguay, url_catalogoML);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["catalogosHome"]);
            queryClient.invalidateQueries(["produtosloja"]);
        }
    });


    useEffect(() => {
        setSelectedUrl(produtoParaguay?.vinculos ? produtoParaguay.vinculos[0] : "");
    }, [produtoParaguay]);



    return (
        <>
            <Row className="my-3">
                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Marca"
                        checked={checkMarca}
                        onChange={(e) => {
                            setCheckMarca(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.marca);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.marca ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.marca ?? "", ""))
                            }
                        }}
                    />

                </Col>

                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Modelo"
                        checked={checkModelo}
                        onChange={(e) => {
                            setCheckModelo(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.nome);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.nome ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.nome ?? "", ""))
                            }
                        }}
                    />

                </Col>

                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Origem"
                        checked={checkOrigem}
                        onChange={(e) => {
                            setCheckOrigem(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.origem);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.origem ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.origem ?? "", ""))
                            }
                        }}
                    />

                </Col>

                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Cor"
                        checked={checkCor}
                        onChange={(e) => {
                            setCheckCor(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.cor);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.cor ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.cor ?? "", ""))
                            }
                        }}
                    />

                </Col>

                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Rede"
                        checked={checkRede}
                        onChange={(e) => {
                            setCheckRede(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.rede);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.rede.toString() ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.rede.toString() ?? "", ""))
                            }
                        }}
                    />

                </Col>

                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Ram"
                        checked={checkRam}
                        onChange={(e) => {
                            setCheckRam(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.ram);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.ram.toString() ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.ram.toString() ?? "", ""))
                            }
                        }}
                    />

                </Col>

                <Col xs className="d-flex">
                    <Form.Check
                        type="checkbox"
                        label="Capacidade"
                        checked={checkCapacidade}
                        onChange={(e) => {
                            setCheckCapacidade(e.target.checked);
                            if (e.target.checked) {
                                setFiltro(filtro + " " + produtoParaguay?.capacidade);
                            } else {
                                setFiltro(filtro.replace(" " + produtoParaguay?.capacidade.toString() ?? "", ""))
                                setFiltro(filtro.replace(produtoParaguay?.capacidade.toString() ?? "", ""))
                            }
                        }}
                    />

                </Col>
            </Row>
            <Row className="my-3">
                <Col xs className="d-flex ">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={(value) => {
                                setFiltro(value);
                                refetch();
                            }
                            }
                            externalValue={filtro.trimStart().trimEnd().replace(/\s+/g, ' ')}

                        />
                    </FloatingLabel>

                </Col>
            </Row>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>



                <Table className={isFetching || mutation.isLoading ? "invisible" : ""}>
                    <thead>
                        <tr>

                            <th className="th70" >
                                <div className="thArrow">
                                    <span></span>
                                </div>
                            </th>
                            <th className="th200" >
                                <div className="thArrow">
                                    <span>Nome</span>
                                    <span>

                                    </span>
                                </div>
                            </th>
                            <th className="th50">Vincular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((catalogoProduto, index) => (

                            <tr key={index}>
                                <td>

                                    <img
                                        className="responsive-image"
                                        src={catalogoProduto.url_Imagem || ratata}
                                        alt="Descrição da imagem"
                                    />
                                </td>

                                <td className="th200">
                                    <a
                                        style={{ color: "blue" }}
                                        href={`https://www.mercadolivre.com.br/p/${catalogoProduto.codigo_catalogo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={catalogoProduto.nome}
                                    >
                                        {catalogoProduto.nome}
                                    </a>
                                </td>
                                <td className="td50">
                                    <Form.Check
                                        checked={selectedUrl === `https://www.mercadolivre.com.br/p/${catalogoProduto.codigo_catalogo}`}
                                        onClick={() => setSelectedUrl(`https://www.mercadolivre.com.br/p/${catalogoProduto.codigo_catalogo}`)}
                                        readOnly
                                    />
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </Table>
                {isFetching || mutation.isLoading && <FragmentLoading />}
            </div><br />
            {mutation.isError && <span>O catalogo Informado não pode ser vinculado.</span>}

            <Button
                className="position mx-2"
                variant="secondary"
                onClick={onHide}>
                Cancelar
            </Button>
            <Button
                className="position"
                variant="secondary"
                onClick={() => mutation.mutate(selectedUrl)}
            >
                Confirmar - Mercado Livre
            </Button>

        </>
    );




}