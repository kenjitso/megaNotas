import { useCallback, useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CatalogoController } from "@/datatypes/catalogo";
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
                //IPHONE
                if (produto.nome.trim().toUpperCase() === "IPHONE 12 A2402 3J") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 12 " + produto.capacidade + " " + produto.cor);
                if (produto.nome.trim().toUpperCase() === "IPHONE 12 A2403 LE" && produto.cor.trim().toUpperCase() === "ROXO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 12 (128 GB) - Roxo");
                if (produto.nome.trim().toUpperCase() === "IPHONE 14 A2882 HN" && produto.cor.trim().toUpperCase() === "BRANCO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 (128 GB) - Estelar");
                if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 AA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus " + " " + produto.capacidade + " " + produto.cor);
                if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 BE" && produto.cor.trim().toUpperCase() === "AMARELO" && produto.capacidade === 128) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus " + produto.ram + " " + produto.cor);
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
                if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 4G Dual SIM");
                
                if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.capacidade === 128 && produto.ram === 8) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM 128GB 8GB");
                if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.capacidade === 256 && produto.ram === 8) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM 256GB 8GB");
                
             //   if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.capacidade === 256 && produto.ram === 6) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM 256 GB " + produto.cor + " 6 GB RAM");
             //   if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.capacidade === 128 && produto.ram === 6) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM 128 GB " + produto.cor + " 6 GB RAM");

                if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO PLUS" && produto.rede === 5 && produto.capacidade === 256 && produto.cor === "AZUL") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro+ 5G Dual SIM 256 GB iceberg blue 8 GB RAM");

                if (!catalogo) catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.cor + " " + produto.ram + " " + produto.capacidade);

                //  if (!catalogo) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11 Pro+ Dual SIM");


                //  let catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " Dual SIM");
                // let catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome); //(achou os xiaomi 12 lite)


                let mostSimilarProduct = null;
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
                        mostSimilarProduct = productML;
                    }
                }

                if (highestSimilarity < 6) {

                    // alterar a ordem de pesquisa e tentar novamente
                    //  catalogo = await CatalogoController.searchCatalogoML(produto.capacidade + " " + produto.ram + " " + produto.cor + " " + produto.nome + " " + produto.marca);
                    //catalogo = await CatalogoController.searchCatalogoML(produto.nome);
                    //catalogo = await CatalogoController.searchCatalogoML("12 lite");
                    //  catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome); //(achou os xiaomi 12 lite)
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


    const nextProduct = useCallback(() => {
        if (produtoParaguay && currentIndex < produtoParaguay.length - 1) {
            setCurrentIndex(currentIndex + 1);

        }
    }, [currentIndex, setCurrentIndex, produtoParaguay]);


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

    const autoLinkProducts = useCallback(async () => {
        if (!produtoParaguay) return;
        setAutoLinkStatus(`Iniciando vinculação de ${produtoParaguay.length} produtos...`);
        let linkCount = 0;
        for (let i = 0; i < produtoParaguay.length; i++) {
            const produto = produtoParaguay[i];
            let catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.cor + " " + produto.ram + " " + produto.capacidade);

            setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtoParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);

            for (const productML of catalogo) {

                let similarity = 0;

                if (produto.marca === "XIAOMI") {
                    similarity = filtrosVinculosXiaomi(produto, productML);
                }

                if (produto.marca === "APPLE") {
                    similarity = filtrosVinculosIphone(produto, productML);
                }

                if (similarity === 6) {
                    try {
                        console.log("1");
                        await mutation.mutateAsync({ produto, url_catalogoML: `https://www.mercadolivre.com.br/p/${productML.codigo_catalogo}` });
                        linkCount++;
                        setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtoParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);
                    } catch (error) {
                        console.error('Erro na vinculação do produto:', error);
                    }
                    await sleep(2000);
                    break;
                } else if (similarity !== 6 && i === catalogo.length - 1) {  // Adicionei essa condição
                    console.log("2");
                    catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.rede + " " + produto.ram + " " + produto.cor + " " + produto.capacidade);
                    i = 0; // Reseta o índice do loop para iterar sobre o novo catálogo
                }
            }
        }
        setAutoLinkStatus(`Vinculação concluída. ${linkCount} produtos foram vinculados.`);
    }, [mutation, produtoParaguay]);



    return (
        <Modal
            size="lg"  // Alterado para um tamanho menor
            centered
            backdrop="static"
            keyboard={false}
            show={produtoParaguay !== undefined}
            onHide={() => onHide()}
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