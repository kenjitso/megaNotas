import { useCallback, useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CatalogoController } from "@/datatypes/catalogo";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { filtrosVinculos } from "@/functions/filtrosVinculos";


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
                const catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.cor + " " + produto.ram + " " + produto.capacidade);

                let mostSimilarProduct = null;
                let highestSimilarity = -1;
                for (const productML of catalogo) {
                    const similarity = filtrosVinculos(produto, productML);

                    if (similarity > highestSimilarity) {
                        highestSimilarity = similarity;
                        mostSimilarProduct = productML;
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
            const catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.cor + " " + produto.ram + " " + produto.capacidade);

            setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtoParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);

            for (const productML of catalogo) {
                const similarity = filtrosVinculos(produto, productML);
                if (similarity === 6) {  // 9 é o máximo de similaridade
                    try {
                        console.log(produto.nome);
                        await mutation.mutateAsync({ produto, url_catalogoML: `https://www.mercadolivre.com.br/p/${productML.codigo_catalogo}` });

                        linkCount++;
                        setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtoParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);
                    } catch (error) {
                        console.error('Erro na vinculação do produto:', error);  // Logar o erro no console
                    }
                    await sleep(2000);
                    break;
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
                            <li><strong>Modelo:</strong> {produtoAtualParaguay.nome}</li>
                            <li><strong>Memoria Interna:</strong> {produtoAtualParaguay.capacidade} GB</li>
                            <li><strong>Memoria Ram:</strong> {produtoAtualParaguay.ram} GB</li>
                            <li><strong>Mobile Network:</strong> {produtoAtualParaguay.rede}G</li>
                            <li><strong>Cor:</strong> {produtoAtualParaguay.cor}</li>
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
                                <li><strong>Modelo:</strong> {data.mostSimilarProduct.modelo}</li>
                                <li><strong>Memoria Interna:</strong> {data.mostSimilarProduct.memoriaInterna}</li>
                                <li><strong>Memoria Ram:</strong> {data.mostSimilarProduct.memoriaRam}</li>
                                <li><strong>Mobile Network:</strong> {data.mostSimilarProduct.mobileNetwork}</li>
                                <li><strong>Cor:</strong> {data.mostSimilarProduct.cor}</li>
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