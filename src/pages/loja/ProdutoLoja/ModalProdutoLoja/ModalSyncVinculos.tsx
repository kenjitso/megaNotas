import { useCallback, useEffect, useState } from "react";
import { Modal, Button, Spinner, Col, Row } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { toast } from "react-toastify";
import { ILoja } from "@/datatypes/loja";
import { filtrosVinculosXiaomi } from "@/functions/produtos/xiaomi/filtrosVinculosXiaomi";
import { filtrosVinculosSamsung } from "@/functions/produtos/samsung/filtroVinculosSamsung";
import { filtrosVinculosIphone } from "@/functions/produtos/apple/filtrosVinculosIphone";
import { ICatalogoItem, SearchResponse, otherSearchSmartPhone } from "@/functions/produtos/otherSearchSmartPhone";
import { ModalTableSearchCatalogo } from "./ModalTableSearchCatalogo";
import { CatalogoController } from "@/datatypes/catalogo";
import { buildUrl } from "@/features/UrlLinkLojas";

interface IProps {
    produtosParaguay?: IProdutoLoja[];
    lojaId?: ILoja;
    onHide: () => void;
}



export function ModalSyncVinculos({ onHide, lojaId, produtosParaguay }: IProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const produtoAtualParaguay = produtosParaguay ? produtosParaguay[currentIndex] : null;
    const queryClient = useQueryClient();
    const [produtoML, setProdutoML] = useState<ICatalogoItem | undefined>(undefined);
    const [childIsFetching, setChildIsFetching] = useState(false);
    const [highestSimilarity, setHighestSimilarity] = useState(0);
  
    
    const mutation = useMutation(({ produtoParaguay, url_catalogoML }: { produtoParaguay: IProdutoLoja, url_catalogoML: string }) => {
        if (!produtoParaguay) throw new Error("Produto Indefinido");
        return ProdutoLojaController.updateML(produtoParaguay, url_catalogoML);
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



    const previousProduct = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex, setCurrentIndex]);


    const nextProduct = useCallback(() => {
        if (produtosParaguay && currentIndex < produtosParaguay.length - 1) {
            setCurrentIndex(currentIndex + 1);

        }
    }, [currentIndex, setCurrentIndex, produtosParaguay]);

    const autoLinkProducts = useCallback(async () => {

        if (!produtosParaguay || produtosParaguay.length === 0) return setAutoLinkStatus("Nenhum produto na lista");

        setAutoLinkStatus(`Iniciando vinculação de ${produtosParaguay.length} produtos...`);
        let linkCount = 0;
        let catalogosML;
        for (let i = 0; i < produtosParaguay.length; i++) {
            const produtoParaguay = produtosParaguay[i];

            let searchString = "";

            try {
          
                if (produtoParaguay.categoria === "CELULAR") {
                    searchString = await otherSearchSmartPhone(produtoParaguay);
                    catalogosML = await CatalogoController.searchCatalogoML(searchString) || [];
                }
            } catch (error) {
                console.log("Erro 500 aqui, enviando null para continuar o sistema.");
                catalogosML = null
            }

            let highestSimilarity = -1;
            let similarity = 0;

            for (const catalogoML of catalogosML ?? []) {

                if (produtoParaguay.marca === "XIAOMI") {
                    similarity = filtrosVinculosXiaomi(produtoParaguay, catalogoML);
                }

                if (produtoParaguay.marca === "APPLE") {
                    similarity = filtrosVinculosIphone(produtoParaguay, catalogoML);
                }

                if (produtoParaguay.marca === "SAMSUNG") {
                    similarity = filtrosVinculosSamsung(produtoParaguay, catalogoML);
                }

                if (similarity > highestSimilarity) {
                    highestSimilarity = similarity;

                }

                if (similarity === 6 || similarity > 6) {

                    try {

                        await mutation.mutateAsync({ produtoParaguay, url_catalogoML: `https://www.mercadolivre.com.br/p/${catalogoML.codigo_catalogo}` });
                        linkCount++;
                        setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtosParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);


                    } catch (error) {

                        console.error('Erro na vinculação do produto:', error);
                    }

                } else {
                    setAutoLinkStatus(`Vinculando item ${i + 1} de ${produtosParaguay.length}. ${linkCount} produtos foram vinculados até agora.`);
                }
            }
        }

    }, [mutation, produtosParaguay, setAutoLinkStatus, nextProduct]);

    return (
        <Modal
            size="xl"  // Alterado para um tamanho menor
            centered
            backdrop="static"
            keyboard={false}
            show={produtosParaguay !== undefined}
            onHide={() => {
                setCurrentIndex(0);
                setAutoLinkStatus('');
                onHide();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Vincula Itens {produtosParaguay && currentIndex >= 0 ? `(${currentIndex + 1} de ${produtosParaguay.length})` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        {highestSimilarity && (
                            <p><strong>Similaridade:</strong> {highestSimilarity}</p>
                        )}

                        {produtoAtualParaguay && (
                            <div>
                                <p><strong>Produto do Paraguay </strong></p>
                                <p>
                                    <strong>Codigo: </strong>
                                    <a
                                        className="product-link"
                                        href={buildUrl(lojaId?.algoritmo || 0, produtoAtualParaguay.codigo)}
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
                                    <li><strong>Modelo:</strong> {produtoAtualParaguay.nome.toUpperCase()}</li>
                                    <li><strong>Memoria Interna:</strong> {produtoAtualParaguay.capacidade} GB</li>
                                    <li><strong>Memoria Ram:</strong> {produtoAtualParaguay.ram} GB</li>
                                    <li><strong>Mobile Network:</strong> {produtoAtualParaguay.rede}G</li>
                                    <li><strong>Cor:</strong> {produtoAtualParaguay.cor.toUpperCase()}</li>
                                    {produtoAtualParaguay?.categoria === "RELOGIO" && (
                                        <>
                                            <li><strong>Medida da Caixa:</strong> {produtoAtualParaguay.caixaMedida?.toUpperCase()}</li>
                                            <li><strong>Cor da Pulseira:</strong> {produtoAtualParaguay.corPulseira?.toUpperCase()}</li>
                                            <li><strong>Tipo da Pulseira:</strong> {produtoAtualParaguay.tipoPulseira?.toUpperCase()}</li>
                                        </>

                                    )}
                                </ul>
                            </div>
                        )}
                        <hr />
                        {childIsFetching ? (
                            <div className="text-center"> {/* Estilos CSS personalizados */}
                                <Spinner animation="border" variant="primary" />
                                <p>Carregando...</p>
                            </div>
                        ) : (
                            produtoML && (


                                <div>

                                    <p><strong>Produto Mais Similar</strong></p>
                                    <strong>Codigo: </strong>
                                    <a
                                        style={{ color: "blue" }}
                                        href={produtoML ? `https://www.mercadolivre.com.br/p/${produtoML.codigo_catalogo}` : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {produtoML.codigo_catalogo}
                                    </a>


                                    <p><strong>Detalhes do Produto:</strong></p>
                                    <ul>
                                        <li><strong>Nome:</strong> {produtoML.nome}</li>
                                        <li><strong>Marca:</strong> {produtoML.marca}</li>
                                        <li><strong>Modelo:</strong> {produtoML.modelo?.toUpperCase()}</li>
                                        <li><strong>Memoria Interna:</strong> {produtoML.memoriaInterna}</li>
                                        <li><strong>Memoria Ram:</strong> {produtoML.memoriaRam}</li>
                                        <li><strong>Mobile Network:</strong> {produtoML.mobileNetwork?.toUpperCase()}</li>
                                        <li><strong>Cor:</strong> {produtoML.cor?.toUpperCase()}</li>
                                        {produtoAtualParaguay?.categoria === "RELOGIO" && (
                                            <>
                                                <li><strong>Medida da Caixa:</strong> {produtoML.caixaMedida?.toUpperCase()}</li>
                                                <li><strong>Cor da Pulseira:</strong> {produtoML.corPulseira?.toUpperCase()}</li>
                                                <li><strong>Tipo da Pulseira:</strong> {produtoML.tipoPulseira?.toUpperCase()}</li>
                                            </>

                                        )}
                                    </ul>
                                </div>
                            )
                        )}
                    </Col>
                    <Col>

                        <ModalTableSearchCatalogo produtoParaguay={produtosParaguay} currentIndex={currentIndex} onProdutoML={(produtoML) => { setProdutoML(produtoML) }} onFetchingStateChange={setChildIsFetching} onHighestSimilarity={(highestSimilarity) => { setHighestSimilarity(highestSimilarity)}} />

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={previousProduct}>Anterior</Button>
                <Button onClick={nextProduct}>Próximo</Button>
                {produtoML && (
                    <Button
                        variant="secondary"
                        onClick={() => {
                            if (produtoAtualParaguay && produtoML) {
                                mutation.mutate({
                                    produtoParaguay: produtoAtualParaguay,
                                    url_catalogoML: `https://www.mercadolivre.com.br/p/${produtoML.codigo_catalogo}`
                                });
                            }
                        }}

                        disabled={!produtoML}
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

