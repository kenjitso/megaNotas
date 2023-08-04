import { useCallback, useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CatalogoController } from "@/datatypes/catalogo";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { toast } from "react-toastify";
import { filtrosVinculosIphoneAtacadoGames } from "@/functions/produtos/apple/filtrosVinculosIphone";
import { otherSearchAtacadoGames } from "@/functions/produtos/otherSearchAtacadoGames";
import { ILoja } from "@/datatypes/loja";
import { filtrosVinculosXiaomiAtacadoGames } from "@/functions/produtos/xiaomi/filtrosVinculosXiaomi";
import { filtrosVinculosSamsungAtacadoGames } from "@/functions/produtos/samsung/filtroVinculosSamsung";

interface IProps {
    produtoParaguay?: IProdutoLoja[];
    lojaId?: ILoja;
    onHide: () => void;
}

export function ModalSyncVinculos({ onHide, lojaId, produtoParaguay }: IProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const produtoAtualParaguay = produtoParaguay ? produtoParaguay[currentIndex] : null;
    const queryClient = useQueryClient();


    const { isFetching, data, refetch } = useQuery(
        ["catalogosSync", currentIndex],
        async () => {



            if (produtoParaguay && currentIndex >= 0 && currentIndex < produtoParaguay.length) {
                const produto = produtoParaguay[currentIndex];

                let catalogo;


                catalogo = otherSearchAtacadoGames(produto);



                let mostSimilarProduct = null;
                let highestSimilarity = -1;
                let similarity = 0;


                for (const productML of await catalogo) {
                    if (!productML.mobileNetwork) {
                        productML.mobileNetwork = "4G"
                    }
                    if (produto.marca === "XIAOMI") {
                        similarity = filtrosVinculosXiaomiAtacadoGames(produto, productML);
                    }
                    if (produto.marca === "APPLE") {
                        similarity = filtrosVinculosIphoneAtacadoGames(produto, productML);
                    }
                    if (produto.marca === "SAMSUNG") {
                        similarity = filtrosVinculosSamsungAtacadoGames(produto, productML);
                    }


                    if (similarity > highestSimilarity) {
                        highestSimilarity = similarity;
                        mostSimilarProduct = productML;
                    }
                }

                if (highestSimilarity < 6) {

                    catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " Dual SIM"); //(achou os xiaomi 12 pro)

                    for (const productML of catalogo) {
                        if (!productML.mobileNetwork) {
                            productML.mobileNetwork = "4G"
                        }
                        if (produto.marca === "XIAOMI") {
                            similarity = filtrosVinculosXiaomiAtacadoGames(produto, productML);
                        }

                        if (produto.marca === "APPLE") {
                            similarity = filtrosVinculosIphoneAtacadoGames(produto, productML);
                        }
                        if (produto.marca === "SAMSUNG") {
                            similarity = filtrosVinculosSamsungAtacadoGames(produto, productML);
                        }


                        if (similarity > highestSimilarity) {
                            highestSimilarity = similarity;
                            mostSimilarProduct = productML;
                        }
                    }
                }

                return { data: catalogo, mostSimilarProduct, highestSimilarity };
            }
            return null;
        },
        { enabled: currentIndex >= 0 }
    );




    const mutation = useMutation(({ produto, url_catalogoML }: { produto: IProdutoLoja, url_catalogoML: string }) => {
        if (!produto) throw new Error("Produto Indefinido");
        return ProdutoLojaController.updateML(produto, url_catalogoML);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["catalogoshome"]);
            queryClient.invalidateQueries(["produtosloja"]);
            queryClient.invalidateQueries(["catalogos"]);
            queryClient.invalidateQueries(["lojamanual"]);
            toast.success(`Produto vinculado com sucesso!`);
        },
        onError: (error) => {
            toast.error(`Não foi possivel vincular!`);
        },
        onSettled: () => {
            nextProduct();
        }
    });

    const [autoLinkStatus, setAutoLinkStatus] = useState('');
    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        if (produtoParaguay !== undefined) {
            refetch();
        }
    }, [produtoParaguay, refetch]);


    const previousProduct = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex, setCurrentIndex]);


    const nextProduct = useCallback(() => {
        if (produtoParaguay && currentIndex < produtoParaguay.length - 1) {
            setCurrentIndex(currentIndex + 1);

        }
    }, [currentIndex, setCurrentIndex, produtoParaguay]);

    const autoLinkProducts = useCallback(async () => {

        if (!produtoParaguay || produtoParaguay.length === 0) return setAutoLinkStatus("Nenhum produto na lista");

        setAutoLinkStatus(`Iniciando vinculação de ${produtoParaguay.length} produtos...`);
        let linkCount = 0;

        for (let i = 0; i < produtoParaguay.length; i++) {
            const produto = produtoParaguay[i];

            let catalogo = await otherSearchAtacadoGames(produto);
            catalogo = [...catalogo, ...(await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " Dual SIM"))];


            let highestSimilarity = -1;
            let similarity = 0;

            for (const productML of catalogo) {
                if (!productML.mobileNetwork) {
                    productML.mobileNetwork = "4G"
                }
                if (produto.marca === "XIAOMI") {
                    similarity = filtrosVinculosXiaomiAtacadoGames(produto, productML);
                }

                if (produto.marca === "APPLE") {
                    similarity = filtrosVinculosIphoneAtacadoGames(produto, productML);
                }

                if (produto.marca === "SAMSUNG") {
                    similarity = filtrosVinculosSamsungAtacadoGames(produto, productML);
                }

                if (similarity > highestSimilarity) {
                    highestSimilarity = similarity;

                }

                if (similarity === 6 || similarity > 6) {

                    try {

                        await mutation.mutateAsync({ produto, url_catalogoML: `https://www.mercadolivre.com.br/p/${productML.codigo_catalogo}` });
                        linkCount++;
                        setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtoParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);


                    } catch (error) {

                        console.error('Erro na vinculação do produto:', error);
                    }

                } else {
                    setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtoParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);
                }
            }
        }

    }, [mutation, produtoParaguay, refetch, setAutoLinkStatus, nextProduct]);



    return (
        <Modal
            size="lg"  // Alterado para um tamanho menor
            centered
            backdrop="static"
            keyboard={false}
            show={produtoParaguay !== undefined}
            onHide={() => {
                setCurrentIndex(0);
                setAutoLinkStatus('');
                onHide();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Vincula Itens {produtoParaguay && currentIndex >= 0 ? `(${currentIndex + 1} de ${produtoParaguay.length})` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data && data.highestSimilarity && (
                    <p><strong>Similaridade:</strong> {data.highestSimilarity}</p>
                )}

                {produtoAtualParaguay && (
                    <div>
                        <p><strong>Produto do Paraguai</strong></p>
                        <p>
                            <strong>Codigo: </strong>
                            <a
                                style={{ color: "blue" }}
                                href={lojaId?.algoritmo === 1
                                    ? `https://atacadogames.com/lista-produtos/termo/${produtoAtualParaguay.codigo}/1`
                                    : (lojaId?.algoritmo === 7
                                        ? `https://www.megaeletro.com.py/br/p/${produtoAtualParaguay.codigo}/1`
                                        : (lojaId?.algoritmo === 5
                                            ? `https://www.madridcenter.com/produtos?q=${produtoAtualParaguay.codigo}`
                                            : (lojaId?.algoritmo === 4
                                                ? `https://cellshop.com/catalogsearch/result/?q=${produtoAtualParaguay.codigo}`
                                                : (lojaId?.algoritmo === 8
                                                    ? `https://www.mobilezone.com.br/search/q?search=${produtoAtualParaguay.codigo}`
                                                    : (lojaId?.algoritmo === 3
                                                        ? `https://www.bestshop.com.py/buscar/${produtoAtualParaguay.codigo}`
                                                        : (lojaId?.algoritmo === 6
                                                            ? ` https://stargamesparaguay.com/?s=${produtoAtualParaguay.codigo}`
                                                            : '#'))))))}

                                target="_blank"
                                rel="noopener noreferrer"
                                title={produtoAtualParaguay.codigo}
                            >
                                {produtoAtualParaguay.codigo}
                            </a>
                        </p>

                        <p><strong>Detalhes do Produto:</strong></p>
                        <ul>
                            <li><strong>Nome:</strong> {produtoAtualParaguay.nome_original}</li>
                            <li><strong>Marca:</strong> {produtoAtualParaguay.marca}</li>
                            <li><strong>Modelo:</strong> {produtoAtualParaguay.nome.toLocaleUpperCase()}</li>
                            <li><strong>Memoria Interna:</strong> {produtoAtualParaguay.capacidade} GB</li>
                            <li><strong>Memoria Ram:</strong> {produtoAtualParaguay.ram} GB</li>
                            <li><strong>Mobile Network:</strong> {produtoAtualParaguay.rede}G</li>
                            <li><strong>Cor:</strong> {produtoAtualParaguay.cor.toUpperCase()}</li>
                        </ul>
                    </div>
                )}
                <hr />
                {isFetching ? (
                    <div className="text-center"> {/* Estilos CSS personalizados */}
                        <Spinner animation="border" variant="primary" />
                        <p>Carregando...</p>
                    </div>
                ) : (
                    data && data.mostSimilarProduct && (
                        <div>
                            <p><strong>Produto Mais Similar</strong></p>
                            <strong>Codigo: </strong>
                            <a
                                style={{ color: "blue" }}
                                href={data && data.mostSimilarProduct ? `https://www.mercadolivre.com.br/p/${data.mostSimilarProduct.codigo_catalogo}` : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {data.mostSimilarProduct.codigo_catalogo}
                            </a>

                            {/* Agrupando informações semelhantes */}
                            <p><strong>Detalhes do Produto:</strong></p>
                            <ul>
                                <li><strong>Nome:</strong> {data.mostSimilarProduct.nome}</li>
                                <li><strong>Marca:</strong> {data.mostSimilarProduct.marca}</li>
                                <li><strong>Modelo:</strong> {data.mostSimilarProduct.modelo?.toLocaleUpperCase()}</li>
                                <li><strong>Memoria Interna:</strong> {data.mostSimilarProduct.memoriaInterna}</li>
                                <li><strong>Memoria Ram:</strong> {data.mostSimilarProduct.memoriaRam}</li>
                                <li><strong>Mobile Network:</strong> {data.mostSimilarProduct.mobileNetwork}</li>
                                <li><strong>Cor:</strong> {data.mostSimilarProduct.cor?.toLocaleUpperCase()}</li>
                            </ul>
                        </div>
                    )
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={previousProduct}>Anterior</Button>
                <Button onClick={nextProduct}>Próximo</Button>
                {data && data.mostSimilarProduct && (
                    <Button
                        variant="secondary"
                        onClick={() => {
                            if (produtoAtualParaguay && data?.mostSimilarProduct) {
                                mutation.mutate({
                                    produto: produtoAtualParaguay,
                                    url_catalogoML: `https://www.mercadolivre.com.br/p/${data.mostSimilarProduct.codigo_catalogo}`
                                });
                            }
                        }}

                        disabled={!data?.mostSimilarProduct}
                    >
                        Vincular
                    </Button>

                )}


                <Button variant="secondary" onClick={autoLinkProducts}>
                    Vincular Automaticamente
                </Button>
                <p>{autoLinkStatus}</p>

            </Modal.Footer>
        </Modal >
    );
}

