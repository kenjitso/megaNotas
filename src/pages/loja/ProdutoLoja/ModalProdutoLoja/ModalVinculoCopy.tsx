import FragmentLoading from "@/components/fragments/FragmentLoading";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { CatalogoController, ICatalogo } from "@/datatypes/catalogo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useMemo } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import ratata from "../../../../assets/ratata.svg";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { abreviaLink } from "@/features/AbreviaLink";
import InputSearchVinculoCatalogo from "@/components/inputs/InputSearchVinculoCatalogo";
import { compareValues, useSort } from "@/components/utils/FilterArrows";



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
                <a
                    style={{ color: "blue" }}
                    href={`https://atacadogames.com/lista-produtos/termo/${produtoParaguay?.codigo}/1`}
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


export function TableVinculoML({ produtoParaguay, onHide }: IProps) {

    const [selectedUrl, setSelectedUrl] = useState<string>("");
    const [filtro, setFiltro] = useState("");
    const queryClient = useQueryClient();
    const [checkMarca, setCheckMarca] = useState(true);
    const [checkModelo, setCheckModelo] = useState(true);
    const [checkCor, setCheckCor] = useState(true);
    const [checkRede, setCheckRede] = useState(false);
    const [checkRam, setCheckRam] = useState(true);
    const [checkCapacidade, setCheckCapacidade] = useState(true);


    const { isFetching,
        data,
        refetch,

    } = useQuery(["catalogosML", filtro], () => {
        const catalogo = CatalogoController.searchCatalogoML(filtro);
        return catalogo;
    }, { enabled: filtro ? true : false });

    const mutation = useMutation((url_catalogoML: string) => {
        if (!produtoParaguay) throw new Error("Produto Indefinido");
        return ProdutoLojaController.updateML(produtoParaguay, url_catalogoML);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["catalogoshome"]);
            queryClient.invalidateQueries(["produtosloja"]);
            queryClient.invalidateQueries(["catalogos"]);
            queryClient.invalidateQueries(["lojamanual"]);
           
        }
    });


    useEffect(() => {
        setSelectedUrl(produtoParaguay?.vinculos ? produtoParaguay.vinculos[0] : "");

        let novoFiltro = "";

        if (checkMarca && produtoParaguay?.marca) {
            novoFiltro += produtoParaguay.marca + " ";
        }

        if (checkModelo && produtoParaguay?.nome) {
            novoFiltro += produtoParaguay.nome + " ";
        }


        if (checkCapacidade && produtoParaguay?.capacidade) {
            novoFiltro += produtoParaguay.capacidade + " ";
        }

  
        if (checkCor && produtoParaguay?.cor) {
            novoFiltro += produtoParaguay.cor + " ";
        }

        if (checkRam && produtoParaguay?.ram) {
            novoFiltro += produtoParaguay.ram + " ";
        }

        setFiltro(novoFiltro.trim());
    }, [produtoParaguay, checkMarca, checkModelo, checkCor, checkRam]);


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
                                setFiltro(filtro + (filtro.length > 0 ? ' ' : '') + produtoParaguay?.marca);
                            } else {
                                setFiltro(filtro.split(' ').filter(word => word !== produtoParaguay?.marca).join(' '));
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
                                setFiltro(filtro + (filtro.length > 0 ? ' ' : '') + produtoParaguay?.nome);
                            } else {
                                setFiltro(filtro.replace(produtoParaguay?.nome ?? "", "").trim());

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
                                setFiltro(filtro + (filtro.length > 0 ? ' ' : '') + produtoParaguay?.cor);
                            } else {
                                setFiltro(filtro.replace(produtoParaguay?.cor ?? "", "").trim());
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
                                setFiltro(filtro + (filtro.length > 0 ? ' ' : '') + produtoParaguay?.rede);
                            } else {
                                setFiltro(filtro.replace(produtoParaguay?.rede.toString() ?? "", "").trim());

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
                                setFiltro(filtro + (filtro.length > 0 ? ' ' : '') + produtoParaguay?.ram);
                            } else {
                                setFiltro(filtro.replace(produtoParaguay?.ram.toString() ?? "", "").trim());

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
                                setFiltro(filtro + (filtro.length > 0 ? ' ' : '') + produtoParaguay?.capacidade);
                            } else {
                                setFiltro(filtro.replace(produtoParaguay?.capacidade.toString() ?? "", "").trim());
                            }
                        }}
                    />

                </Col>
            </Row>
            <Row className="my-3">
                <Col xs className="d-flex ">
                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchVinculoCatalogo
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={(value) => {
                                setFiltro(value);
                            }

                            }

                            initial={filtro} // Aqui!

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