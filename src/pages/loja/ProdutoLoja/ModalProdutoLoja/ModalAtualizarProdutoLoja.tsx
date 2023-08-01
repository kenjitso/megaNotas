import { ILoja, LojaController } from "@/datatypes/loja";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { AtacadoGamesFormat, updateFiltro } from "@/functions/lojas/atacadoGames/atacadoGames";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState, useEffect } from "react";
import { Modal, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import * as pdfjsLib from "pdfjs-dist";
import { ModalTableAtualizarProdutoLoja } from "./ModalTableAtualizarProdutoLoja";
import { ModalTableImportarProdutoLoja } from "./ModalTableImportarProdutoLoja";
import { MegaFormat } from "@/functions/lojas/mega/mega";
import { MadridFormat } from "@/functions/lojas/madridCenter/madridCenter";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface IProps {
    produtoParaguay?: IProdutoLoja[];
    onHide: () => void,
    lojaId?: ILoja,
}

export function ModalAtualizarProdutoLoja({ onHide, lojaId, produtoParaguay }: IProps) {

    const [formattedList, setFormattedList] = useState<{ cadastrados: IProdutoLoja[], naoCadastrados: IProdutoLoja[], naoEncontrados: IProdutoLoja[] }>({ cadastrados: [], naoCadastrados: [], naoEncontrados: [] });
    const [isModalImportVisible, setIsModalImportVisible] = useState(true);
    const [isModalRenameVisible, setIsModalRenameVisible] = useState(false);
    const [isModalStatusBar, setIsModalStatusBar] = useState(false);
    const [isModalTotalItens, setIsModalTotalItens] = useState(false);
    const [listToSave, setListToSave] = useState<IProdutoLoja[]>([]);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [excelData, setExcelData] = useState<unknown[]>([]);
    const [isFileRenamed, setIsFileRenamed] = useState(false);
    const [isItensNotRegistered, setIsItensNotRegistered] = useState(false);
    const [statusAtualizacao, setStatusAtualizacao] = useState(0);


    const defaultSettings = () => {
        setIsModalTotalItens(false);
        setIsModalRenameVisible(false);
        setIsItensNotRegistered(false);
        setIsLoading(false);
        setIsFileRenamed(false);
        setFormattedList({ cadastrados: [], naoCadastrados: [], naoEncontrados: [] })
        setStatusAtualizacao(0);
        setIsModalImportVisible(true);
    }


    const mutationAtualizaCadastrados = useMutation((produtos: IProdutoLoja[]) => {

        if (!lojaId) throw new Error("Loja Indefinido");
        return atualizarProdutosEmBlocos(produtos);
    }, {
        onSuccess: () => {
            setIsModalTotalItens(true);
            queryClient.invalidateQueries(["produtosloja"]);
            toast.success("Valores dos produtos atualizados com sucesso!");

        }
    });

    async function atualizarProdutosEmBlocos(produtos: IProdutoLoja[]) {
        const totalProdutos = produtos.length;
        for (let i = 0; i < totalProdutos; i += 15) {
            const blocos = produtos.slice(i, i + 15);
            await ProdutoLojaController.importar(blocos);
            setStatusAtualizacao(Math.min(i + 15, totalProdutos));
        }

    }

    const mutationCadastraNaoCadastrados = useMutation(() => {

        if (!lojaId) throw new Error("Loja Indefinido");

        return ProdutoLojaController.cadastro(listToSave);
    }, {
        onSuccess: () => {
            onHide();
            setFormattedList({ cadastrados: [], naoCadastrados: [], naoEncontrados: [] })
            queryClient.invalidateQueries(["produtosloja"]);
            defaultSettings();
        }
    });

    const { isLoading: atualizaCadastradosIsLoading } = mutationAtualizaCadastrados;
    const { isLoading: cadastraIsLoading } = mutationCadastraNaoCadastrados;
    const onDropImport = useCallback((acceptedFiles: File[]) => {
        setIsLoading(true);
        acceptedFiles.forEach((file) => {
            if (!file) return;
            if (
                file.type === "text/plain" ||
                file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/pdf"
            ) {
                const reader = new FileReader();
                reader.onload = () => {
                    const fileData = reader.result;

                    if (fileData) {
                        if (file.type === "application/pdf") {
                            // Use pdfjs-dist to parse the PDF file
                            const arrayBuffer = reader.result as ArrayBuffer;
                            const uint8Array = new Uint8Array(arrayBuffer);
                            pdfjsLib.getDocument(uint8Array).promise.then(async (pdf) => {
                                // Extract text and other information from the PDF file

                                const numPages = pdf.numPages;
                                const allPagesText: string[] = [];

                                for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
                                    const page = await pdf.getPage(pageIndex);
                                    const textContent = await page.getTextContent();

                                    const dataList = textContent.items
                                        .filter((item) => 'str' in item)
                                        .map((item) => (item as any).str);

                                    allPagesText.push(...dataList);
                                }

                                if (lojaId?.algoritmo === 1) {

                                    setFormattedList(AtacadoGamesFormat(lojaId?.id ?? "", allPagesText, [], produtoParaguay));
                                    mutationAtualizaCadastrados.mutate(AtacadoGamesFormat(lojaId.id ?? "", allPagesText, [], produtoParaguay).cadastrados);
                                    setIsModalImportVisible(false);
                                    setIsLoading(false);
                                    setIsModalStatusBar(true);
                                } else if (lojaId?.algoritmo === 7) {

                                    setFormattedList(MegaFormat(lojaId.id ?? "", allPagesText, [], produtoParaguay));
                                    mutationAtualizaCadastrados.mutate(MegaFormat(lojaId.id ?? "", allPagesText, [], produtoParaguay).cadastrados);
                                    setIsModalImportVisible(false);
                                    setIsLoading(false);
                                    setIsModalStatusBar(true);
                                } else if (lojaId?.algoritmo === 5) {

                                    setFormattedList(MadridFormat(lojaId.id ?? "", allPagesText, [], produtoParaguay));
                                    mutationAtualizaCadastrados.mutate(MadridFormat(lojaId.id ?? "", allPagesText, [], produtoParaguay).cadastrados);
                                    setIsModalImportVisible(false);
                                    setIsLoading(false);
                                    setIsModalStatusBar(true);

                                } else {
                                    toast.info("Loja não formatada!");

                                }








                            });


                        } else {
                            const workbook = XLSX.read(fileData, { type: "binary" });
                            const sheetName = workbook.SheetNames[0];
                            const worksheet = workbook.Sheets[sheetName];
                            const dataList: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
                                header: 1,
                            });

                            //////////////////////////////////////////////////////////////////////

                        }
                    }


                };
                reader.readAsArrayBuffer(file);
            } else {
                toast.info("Tipo de arquivo não suportado, precisa ser excel ou PDF");
                setIsLoading(false);
            }
        });
    }, [onHide, lojaId]);


    const { getRootProps: getRootPropsImport, getInputProps: getInputPropsImport } = useDropzone({ onDrop: onDropImport });

    const onDropExcel = useCallback((acceptedFiles: File[]) => {

        setIsLoading(true);
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const bstr = e.target?.result;
                if (typeof bstr === "string") {
                    const workbook = XLSX.read(bstr, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    // Aqui você chama a função updateNaoCadastrados
                    const { updatedNaoCadastrados, updatedNaoEncontrados } = updateFiltro(data, formattedList.naoCadastrados, formattedList.naoEncontrados);


                    setFormattedList(prevState => ({
                        ...prevState,
                        naoCadastrados: updatedNaoCadastrados,
                        naoEncontrados: updatedNaoEncontrados
                    }));

                    setExcelData(data); // Atualizando o estado com os dados do Excel
                    setIsModalRenameVisible(false);
                    setIsItensNotRegistered(true);
                    setIsLoading(false);
                }
            };
            reader.readAsBinaryString(file);
        });
        setIsFileRenamed(true);
    }, [formattedList.naoCadastrados]); // Adiciona a dependência aqui



    const dropzone = useDropzone({ onDrop: onDropExcel });


    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={lojaId !== undefined}
            onHide={() => {
                onHide();
                defaultSettings();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{
                    <>
                        {formattedList.cadastrados.length > 0
                            ? `Atualizar - `
                            : `Atualizar - Arraste um arquivo de
                       `
                        }
                        <a
                            style={{ color: "blue" }}
                            href={`https://atacadogames.com/lista-produtos/1`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={lojaId?.nome}
                        >
                            {" " + lojaId?.nome.toLocaleUpperCase() + " "}
                        </a>

                    </>
                }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>


                    {isModalImportVisible && formattedList.cadastrados.length === 0 && (
                        <Col className="body text-center">
                            <div {...getRootPropsImport()} className="dropzone">
                                <input {...getInputPropsImport()} />
                                {isLoading ? (
                                    <FragmentLoading />
                                ) : (
                                    <p style={{ cursor: "pointer" }}>
                                        <b> Arquivo do vendedor </b><br /><br />
                                        Arraste e solte um arquivo <b>pdf</b> ou <b>excel</b> referente a loja ou clique para selecionar o arquivo <br /><br />
                                        <Icons tipo="CiImport" tamanho={55} />
                                    </p>
                                )}
                            </div>
                        </Col>
                    )}

                    {!isLoading && isModalTotalItens && (
                        <Col className="body text-center">
                            <ModalTableAtualizarProdutoLoja listProdutoLoja={formattedList} />
                        </Col>
                    )}





                    {isModalRenameVisible && (
                        <Col className="body text-center">
                            <div {...dropzone.getRootProps()} className="dropzone">
                                <input {...dropzone.getInputProps()} />
                                {isLoading ? (
                                    <FragmentLoading />

                                ) : (
                                    <p style={{ cursor: "pointer" }}>
                                        <b> Arquivo excel de


                                            {" " + lojaId?.nome + " "}


                                            para arrumar os dados dos produtos</b>


                                        <br /><br />
                                        Arraste e solte um arquivo <b>excel</b> referente a loja ou clique para selecionar o arquivo <br /><br />

                                        <Icons tipo="CiImport" tamanho={55} />

                                    </p>

                                )}
                            </div>
                        </Col>
                    )}

                    {!isLoading && isItensNotRegistered && formattedList.naoCadastrados.length > 0 && (
                        <Col xs={12}>
                            <ModalTableImportarProdutoLoja
                                listProdutoLoja={formattedList}
                                onListProdutoLoja={setListToSave}
                                lojaId={lojaId}
                            />
                        </Col>
                    )}


                    {atualizaCadastradosIsLoading && isModalStatusBar ? (
                        <Col className="body text-center">
                            Atualizando {statusAtualizacao} de {formattedList.cadastrados.length} produtos...
                        </Col>
                    ) : null}


                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => {
                    onHide();
                    setFormattedList({ cadastrados: [], naoCadastrados: [], naoEncontrados: [] });
                    defaultSettings();
                }}>
                    Fechar
                </Button>

                {isItensNotRegistered && (
                    <Button

                        variant="secondary"
                        onClick={() => {
                            formattedList.naoCadastrados.length > 0
                                ? mutationCadastraNaoCadastrados.mutate()
                                : toast.info("A lista está vazia, por favor adicione dados antes de confirmar.");
                        }}

                    >
                        {cadastraIsLoading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ marginRight: "5px" }}
                                />
                                Carregando...
                            </>
                        ) : "Cadastrar Selecionados"}
                    </Button>
                )}

                {isModalTotalItens && formattedList.naoCadastrados.length > 0 && (

                    <Button
                        variant="secondary"
                        onClick={() => {
                            if (lojaId?.algoritmo === 7 || lojaId?.algoritmo === 5) {
                                setIsItensNotRegistered(true);
                            } else if (lojaId?.algoritmo === 1) {
                                setIsModalRenameVisible(true);
                            }
                            setIsModalTotalItens(false);
                        }}
                        disabled={atualizaCadastradosIsLoading}
                    >
                        {cadastraIsLoading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ marginRight: "5px" }}
                                />
                                Carregando...
                            </>
                        ) : "Verificar não Cadastrados"}
                    </Button>


                )}

            </Modal.Footer>
        </Modal >
    );
}