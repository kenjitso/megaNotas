import FragmentLoading from "@/components/fragments/FragmentLoading";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import ratata from "../../../../assets/ratata.svg";
import InputSearchVinculoCatalogo from "@/components/inputs/InputSearchVinculoCatalogo";
import { ILoja } from "@/datatypes/loja";

import { filtrosVinculosXiaomi } from "@/functions/produtos/xiaomi/filtrosVinculosXiaomi";
import { filtrosVinculosSamsung } from "@/functions/produtos/samsung/filtroVinculosSamsung";
import { filtrosVinculosSmartWatch } from "@/functions/produtos/apple/filtrosVinculosWatch";
import { filtrosVinculosIphone } from "@/functions/produtos/apple/filtrosVinculosIphone";
import { ICatalogoItem, otherSearchSmartPhone } from "@/functions/produtos/otherSearchSmartPhone";
import React from "react";
import { CatalogoController } from "@/datatypes/catalogo";
import { otherSearchSmartWatch } from "@/functions/produtos/otherSearchSmartWatch";


interface IProps {
    lojaId?: ILoja;
    produtoParaguay?: IProdutoLoja[];
    onProdutoML: (produto: ICatalogoItem) => void;
    onOpenModalVinculoML?: () => void;
    onFetchingStateChange?: (fetching: boolean) => void;
    currentIndex: number;
    onHighestSimilarity: (onHighestSimilarity: number) => void;
}


export function ModalTableSearchCatalogo({ produtoParaguay, currentIndex, onProdutoML, onFetchingStateChange, onHighestSimilarity }: IProps) {

    const produtoAtualParaguay = produtoParaguay ? produtoParaguay[currentIndex] : null;
    const [selectedProduct, setSelectedProduct] = useState<ICatalogoItem | null>(null);
    const [initialSearchString, setInitialSearchString] = useState("");


    let searchString = "";

    const [filtro, setFiltro] = useState("");

    const { isFetching, data } = useQuery(["catalogosML", filtro], async () => {
        // Usando a variável do produto atual diretamente aqui.
        const produto = produtoAtualParaguay;
        let catalogosML = null;
        // Certifique-se de que o produto está definido.
        if (!produto) return null;

        let searchString = filtro;

        if (!initialSearchString) setInitialSearchString(searchString);

        try {
            catalogosML = await CatalogoController.searchCatalogoML(searchString) || [];
        } catch (error) {
            console.log("Erro 500 aqui, enviando null para continuar o sistema.");
            catalogosML = null
        }

        const mostSimilarProduct = findMostSimilarProduct(produto, catalogosML ?? []);
        const highestSimilarity = mostSimilarProduct ? calculateProductSimilarity(produto, mostSimilarProduct) : -1;

        return { catalogosML, mostSimilarProduct, highestSimilarity };
    }, { enabled: !!filtro || (produtoAtualParaguay?.categoria === "CELULAR") || (produtoAtualParaguay?.categoria === "RELOGIO") });




    React.useEffect(() => {
        async function fetchInitialSearchString() {
            let searchValue = "";
            if (produtoAtualParaguay?.categoria === "CELULAR") {
                searchValue = await otherSearchSmartPhone(produtoAtualParaguay);

            }

            if (produtoAtualParaguay?.categoria === "RELOGIO") {
                searchValue = await otherSearchSmartWatch(produtoAtualParaguay);

            }
            setInitialSearchString(searchValue);
        }

        fetchInitialSearchString();
    }, [produtoAtualParaguay]);


    React.useEffect(() => {
        if (data?.highestSimilarity) {
            onHighestSimilarity(data.highestSimilarity);
        }
    }, [data?.highestSimilarity]);

    React.useEffect(() => {
        if (data?.mostSimilarProduct) {
            onProdutoML(data.mostSimilarProduct);
            setSelectedProduct(data.mostSimilarProduct);
        }
    }, [data?.mostSimilarProduct]);

    React.useEffect(() => {
        if (onFetchingStateChange) {
            onFetchingStateChange(isFetching);
        }
    }, [isFetching, onFetchingStateChange]);


    return (
        <>

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

                            initial={initialSearchString}

                        />
                    </FloatingLabel>

                </Col>
            </Row>

            <div style={{ maxHeight: '590px', overflowY: 'auto' }}>



                <Table className={isFetching ? "invisible" : ""}>

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
                        {data?.catalogosML?.map((catalogoProduto, index) => {

                            const currentProductUrl = `https://www.mercadolivre.com.br/p/${catalogoProduto.codigo_catalogo}`;

                            return (
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
                                            href={currentProductUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={catalogoProduto.nome}
                                        >
                                            {catalogoProduto.nome}
                                        </a>
                                    </td>
                                    <td className="td50">
                                        <Form.Check
                                            checked={catalogoProduto.codigo_catalogo === selectedProduct?.codigo_catalogo}
                                            onChange={() => {
                                                setSelectedProduct(catalogoProduto);
                                                if (onProdutoML) {
                                                    onProdutoML(catalogoProduto);
                                                }

                                                if (produtoAtualParaguay) {
                                                    const similarityForSelectedProduct = calculateProductSimilarity(produtoAtualParaguay, catalogoProduto);
                                                    onHighestSimilarity(similarityForSelectedProduct);
                                                }
                                            }}
                                        />


                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {isFetching || isFetching && <FragmentLoading />}
            </div><br />
        </>
    );

}





function findMostSimilarProduct(produto: IProdutoLoja, catalogosML: ICatalogoItem[]): ICatalogoItem | undefined {
    let mostSimilarProduct: ICatalogoItem | undefined;
    let highestSimilarity = -1;

    for (const catalogoML of catalogosML) {
        const currentSimilarity = calculateProductSimilarity(produto, catalogoML);

        if (currentSimilarity > highestSimilarity) {
            highestSimilarity = currentSimilarity;
            mostSimilarProduct = catalogoML;
        }
    }

    return mostSimilarProduct;
}


function calculateProductSimilarity(produto: IProdutoLoja, catalogoML: ICatalogoItem): number {
    let similarity = 0;




    if (produto.marca === "XIAOMI" && produto.categoria === "CELULAR") {
        similarity = filtrosVinculosXiaomi(produto, catalogoML);
    } else if (produto.marca === "APPLE" && produto.categoria === "CELULAR") {
        similarity = filtrosVinculosIphone(produto, catalogoML);
    } else if (produto.marca === "SAMSUNG" && produto.categoria === "CELULAR") {
        similarity = filtrosVinculosSamsung(produto, catalogoML);
    } else if ((produto.marca === "APPLE" || produto.marca === "XIAOMI") && produto.categoria === "RELOGIO") {
        similarity = filtrosVinculosSmartWatch(produto, catalogoML);
    }




    return similarity;
}
