import { useCallback, useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CatalogoController, ICatalogo } from "@/datatypes/catalogo";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { filtrosVinculosXiaomi } from "@/functions/filtrosProdutos/xiaomi/filtrosVinculosXiaomi";
import { filtrosVinculosIphone } from "@/functions/filtrosProdutos/apple/filtrosVinculosIphone";


interface IProps {
    produtoParaguay?: IProdutoLoja[];
    onHide: () => void;
}

export function ModalSyncVinculos({ onHide, produtoParaguay }: IProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const produtoAtualParaguay = produtoParaguay ? produtoParaguay[currentIndex] : null;
    const queryClient = useQueryClient();


    const { isFetching, data, refetch } = useQuery(
        ["catalogosSync", currentIndex],
        async () => {



            if (produtoParaguay && currentIndex >= 0 && currentIndex < produtoParaguay.length) {
                const produto = produtoParaguay[currentIndex];

                let catalogo;


                catalogo = otherSerachs(produto);



                let mostSimilarProduct = null;
                let highestSimilarity = -1;
                let similarity = 0;


                for (const productML of await catalogo) {
                    if (!productML.mobileNetwork) {
                        productML.mobileNetwork = "4G"
                    }
                    if (produto.marca === "XIAOMI") {
                        similarity = filtrosVinculosXiaomi(produto, productML);
                    }

                    if (produto.marca === "APPLE") {
                        similarity = filtrosVinculosIphone(produto, productML);
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
                            similarity = filtrosVinculosXiaomi(produto, productML);
                        }

                        if (produto.marca === "APPLE") {
                            similarity = filtrosVinculosIphone(produto, productML);
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

            let catalogo = await otherSerachs(produto);
            catalogo = [...catalogo, ...(await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " Dual SIM"))];


            let highestSimilarity = -1;
            let similarity = 0;

            for (const productML of catalogo) {
                if (!productML.mobileNetwork) {
                    productML.mobileNetwork = "4G"
                }
                if (produto.marca === "XIAOMI") {
                    similarity = filtrosVinculosXiaomi(produto, productML);
                }

                if (produto.marca === "APPLE") {
                    similarity = filtrosVinculosIphone(produto, productML);
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
                                href={data && data.mostSimilarProduct ? `https://atacadogames.com/lista-produtos/termo/${produtoAtualParaguay.codigo}/1` : '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {produtoAtualParaguay.codigo}
                            </a>
                        </p>

                        {/* Agrupando informações semelhantes */}
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


async function otherSerachs(produto: IProdutoLoja) {

    let catalogo;

    //IPHONE
    if (produto.nome.trim().toUpperCase() === "IPHONE 12 A2402 3J") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 12 " + produto.capacidade + " " + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 12 A2403 LE" && produto.cor.trim().toUpperCase() === "ROXO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 12 (128 GB) - Roxo");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 A2882 HN" && produto.cor.trim().toUpperCase() === "BRANCO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 (128 GB) - Estelar");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 AA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus " + " " + produto.capacidade + " " + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 BE" && produto.cor.trim().toUpperCase() === "AMARELO" && produto.capacidade === 256) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus "+ produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 BE" && produto.cor.trim().toUpperCase() === "AMARELO" && produto.capacidade === 128) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus "+ produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 HN") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus " + produto.capacidade + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO A2892 CH") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro " + produto.capacidade + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2651") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2651" && produto.cor.trim().toUpperCase() === "PRATA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + "PRATEADO");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2893 3J" && produto.cor.trim().toUpperCase() === "PRATA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + "PRATEADO");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2896 CH" && produto.cor.trim().toUpperCase() === "PRATA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + "PRATEADO");

    //XIAOMI
    if (produto.nome.trim().toUpperCase() === "POCO M5") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco M5 (5 Mpx) Dual SIM");
    if (produto.nome.trim().toUpperCase() === "POCO X5") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco X5 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "POCO X5 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco X5 Pro 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI 12") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 12");
    if (produto.nome.trim().toUpperCase() === "REDMI 12C") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 12C Dual SIM 128 GB ocean blue 6 GB RAM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 10 LITE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi note 10 lite Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 10 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 10 Pro");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11 PRO+" && produto.cor.toUpperCase() === "VERDE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11 Pro+ 5G (MediaTek) Dual SIM 256 GB verde 8 GB RAM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11S" && produto.rede === 5) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11S 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11S" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11S Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12" && produto.rede === 5) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 4G Dual SIM "+produto.capacidade+"GB "+produto.cor);
    if (produto.nome.trim().toUpperCase() === "POCO C40") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco C40 Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI A1") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi A1 2022 Dual SIM " + produto.capacidade + " GB" + produto.ram + " GB");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM "+produto.capacidade+"GB "+produto.ram+"GB ");

    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO PLUS" && produto.rede === 5 && produto.capacidade === 256 && produto.cor === "AZUL") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro+ 5G Dual SIM 256 GB iceberg blue 8 GB RAM");

    if (!catalogo) catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.cor + " " + produto.ram + " " + produto.capacidade);

    return catalogo;
}