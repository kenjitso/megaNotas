import { LojaController } from "@/datatypes/loja";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { AtacadoGamesFormat, updateNaoCadastrados } from "@/functions/lojas/atacadoGames";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Modal, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import * as pdfjsLib from "pdfjs-dist";
import { ModalTableAtualizarProdutoLoja } from "./ModalTableAtualizarProdutoLoja";
import { ModalTableImportarProdutoLoja } from "./ModalTableImportarProdutoLoja";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface IProps {
    produtoParaguay?: IProdutoLoja[];
    onHide: () => void,
    lojaId?: string,
}

export function ModalAtualizarProdutoLoja({ onHide, lojaId, produtoParaguay }: IProps) {

    const [formattedList, setFormattedList] = useState<{ cadastrados: IProdutoLoja[], naoCadastrados: IProdutoLoja[] }>({ cadastrados: [], naoCadastrados: [] });
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
        setFormattedList({ cadastrados: [], naoCadastrados: [] })
        setStatusAtualizacao(0);
        setIsModalImportVisible(true);
    }


    const { data } = useQuery(["loja", lojaId], async () => {
        const data = await LojaController.get(lojaId ?? "");

        return data;
    }, { enabled: !!lojaId && typeof onHide === 'function' }); // habilita a consulta somente quando lojaId estiver definido e onHide for uma função });

    const mutationAtualizaCadastrados = useMutation(() => {
        if (!lojaId) throw new Error("Loja Indefinido");
        return atualizarProdutosEmBlocos(formattedList.cadastrados);
    }, {
        onSuccess: () => {
            onHide();
            setFormattedList({ cadastrados: [], naoCadastrados: [] })
            queryClient.invalidateQueries(["produtosloja"]);
            toast.success("Valores dos produtos atualizados com sucesso!");
            defaultSettings();
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
            setFormattedList({ cadastrados: [], naoCadastrados: [] })
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


                                if (data?.algoritmo === 1) {
                                    setFormattedList(AtacadoGamesFormat(lojaId ?? "", allPagesText, [], produtoParaguay));


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
                    setIsModalImportVisible(false);
                    setIsModalTotalItens(true);
                    setIsLoading(false);

                };
                reader.readAsArrayBuffer(file);
            } else {
                toast.info("Tipo de arquivo não suportado, precisa ser excel ou PDF");
                setIsLoading(false);
            }
        });
    }, [onHide, data]);

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
                    const updatedNaoCadastrados = updateNaoCadastrados(data, formattedList.naoCadastrados);

                    setFormattedList(prevState => ({
                        ...prevState,
                        naoCadastrados: updatedNaoCadastrados,
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
                            title={data?.nome}
                        >
                            {" " + data?.nome.toLocaleUpperCase() + " "}
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


                                            {" " + data?.nome + " "}


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
                    setFormattedList({ cadastrados: [], naoCadastrados: [] });
                    defaultSettings();
                }}>
                    Fechar
                </Button>


                {formattedList.cadastrados.length > 0 && isModalRenameVisible === false && isItensNotRegistered === false && (
                    <Button
                        className="position"
                        variant="secondary"
                        onClick={() => {
                            setIsModalImportVisible(false);
                            setIsModalTotalItens(false);
                            setIsModalStatusBar(true);
                            mutationAtualizaCadastrados.mutate()
                        }}
                    >
                        {atualizaCadastradosIsLoading ? (
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
                        ) : "Atualizar Valores"}
                    </Button>
                )}



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
                            setIsModalRenameVisible(true);
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