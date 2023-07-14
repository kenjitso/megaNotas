import { LojaController } from "@/datatypes/loja";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { AtacadoGamesFormat } from "@/functions/lojas/atacadoGames";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Modal, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { ModalTableCadastroProdutoLoja } from "./ModalTableCadastroProdutoLoja";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface IProps {
    onHide: () => void,
    lojaId?: string,
}

export function ModalCadastroProdutoLoja({ onHide, lojaId }: IProps) {



    const [formattedList, setFormattedList] = useState<IProdutoLoja[]>([]);
    const [listToSave, setListToSave] = useState<IProdutoLoja[]>([]);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isFileImported, setIsFileImported] = useState(false);
    const [isFileRenamed, setIsFileRenamed] = useState(false);
    const [loadTable, setLoadTable] = useState(false);
    const [processedImportData, setProcessedImportData] = useState<string[]>([]);
    const [processedRenameData, setProcessedRenameData] = useState<unknown[]>([]);
    const [isFileImportLoaded, setIsFileImportLoaded] = useState(false);
    const [isFileRenameLoaded, setIsFileRenameLoaded] = useState(false);



    const onCompareFiles = () => {
        if(processedImportData && processedRenameData) {
            setFormattedList(AtacadoGamesFormat(lojaId ?? "", processedImportData, processedRenameData));
            setLoadTable(true);
        }
    };
    



    const { data } = useQuery(["loja", lojaId], async () => {
        const data = await LojaController.get(lojaId ?? "");

        return data;
    }, { enabled: !!lojaId && typeof onHide === 'function' }); // habilita a consulta somente quando lojaId estiver definido e onHide for uma função });

    const mutation = useMutation(() => {
        if (!lojaId) throw new Error("Loja Indefinido");
        return ProdutoLojaController.cadastro(listToSave);
    }, {
        onSuccess: () => {
            onHide();
            setFormattedList([]);
            queryClient.invalidateQueries(["produtosloja"]);
        }
    });

    const { isLoading: cadastroIsLoading } = mutation;

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
                                const pageImport: string[] = [];

                                for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
                                    const page = await pdf.getPage(pageIndex);
                                    const textContent = await page.getTextContent();

                                    const dataList = textContent.items
                                        .filter((item) => 'str' in item)
                                        .map((item) => (item as any).str);

                                    pageImport.push(...dataList);
                                }


                                if (data?.algoritmo === 1) {
                                    setProcessedImportData(pageImport);          
                                   }
                            });
                        } else {
                            const workbook = XLSX.read(fileData, { type: "binary" });
                            const sheetName = workbook.SheetNames[0];
                            const worksheet = workbook.Sheets[sheetName];
                            const dataList: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
                                header: 1,
                            });

                        }
                    }
                    setIsLoading(false);
                };
                reader.readAsArrayBuffer(file);
            } else {
                toast.info("Tipo de arquivo não suportado, precisa ser excel ou PDF");
                setIsLoading(false);
            }
        });

        setIsFileImported(true);
        setIsFileImportLoaded(true);

    }, [onHide, data]);


    const onDropRename = useCallback((acceptedFiles: File[]) => {
        setIsLoading(true);
        acceptedFiles.forEach((file) => {
            if (!file) return;
            if (
                file.type === "text/plain" ||
                file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/pdf" ||
                file.name.endsWith(".xls") // Verificação adicional para o formato de arquivo antigo do Excel
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
                                const pageRename: string[] = [];

                                for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
                                    const page = await pdf.getPage(pageIndex);
                                    const textContent = await page.getTextContent();

                                    const dataList = textContent.items
                                        .filter((item) => 'str' in item)
                                        .map((item) => (item as any).str);

                                    pageRename.push(...dataList);
                                }

                                setProcessedRenameData(pageRename); // Saving the processed data

                            });
                        } else {
                            const workbook = XLSX.read(fileData, { type: "binary" });
                            const sheetName = workbook.SheetNames[0];
                            const worksheet = workbook.Sheets[sheetName];
                            const dataList: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
                                header: 1,
                            });
                     //       const flattenedData = dataList.flat();
                      //      const stringData = flattenedData.map((item) => String(item));
                            setProcessedRenameData(dataList); // Ou setProcessedRenameData(stringData) dependendo do que você precisa
                        }
                    }
                    setIsLoading(false);
                };
                reader.readAsArrayBuffer(file);
            } else {
                toast.info("Tipo de arquivo não suportado, precisa ser excel ou PDF");
                setIsLoading(false);
            }
        });

        setIsFileRenamed(true);
        setIsFileRenameLoaded(true);


    }, [data]);

    const { getRootProps: getRootPropsImport, getInputProps: getInputPropsImport } = useDropzone({ onDrop: onDropImport });
    const { getRootProps: getRootPropsRename, getInputProps: getInputPropsRename } = useDropzone({ onDrop: onDropRename });



    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={lojaId !== undefined}
            onHide={() => { onHide(); setFormattedList([]) }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{formattedList.length > 0
                    ? `Importar - ${data?.nome}`
                    : `Importar - Arraste um arquivo de ${data?.nome}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col className="body text-center">

                        {
                            formattedList.length === 0 && (
                                <div {...getRootPropsImport()} className="dropzone">
                                    <input {...getInputPropsImport()} />
                                    {isLoading ? (
                                        <div>
                                            <FragmentLoading />
                                        </div>
                                    ) : isFileImported ? (
                                        <p style={{ cursor: "pointer" }}>
                                            <b>Arquivo Import Carregado</b><br /><br />
                                            Você pode arrastar e soltar um novo arquivo <b>pdf</b> ou <b>excel</b> para substituir o atual <br /><br />

                                            <Icons tipo="CiImport" tamanho={55} />
                                        </p>
                                    ) : (
                                        <p style={{ cursor: "pointer" }}>
                                            <b> Arquivo Import </b><br /><br />
                                            Arraste e solte um arquivo <b>pdf</b> ou <b>excel</b> referente a loja ou clique para selecionar o arquivo <br /><br />

                                            <Icons tipo="CiImport" tamanho={55} />
                                        </p>
                                    )}

                                </div>
                            )
                        }
                        {
                            !cadastroIsLoading && formattedList.length > 0 ? (
                                <ModalTableCadastroProdutoLoja
                                    listProdutoLoja={formattedList}
                                    onListProdutoLoja={setListToSave}
                                />
                            ) : cadastroIsLoading ? (
                                <div>
                                    <FragmentLoading />
                                </div>
                            ) : null
                        }



                    </Col>

                    <Col className="body text-center">

                        {
                            formattedList.length === 0 && (
                                <div {...getRootPropsRename()} className="dropzone">
                                    <input {...getInputPropsRename()} />
                                    {isLoading ? (
                                        <div>
                                            <FragmentLoading />
                                        </div>
                                    ) : isFileRenamed ? (
                                        <p style={{ cursor: "pointer" }}>
                                            <b>Arquivo Rename Carregado</b><br /><br />
                                            Você pode arrastar e soltar um novo arquivo <b>excel</b> para substituir o atual <br /><br />

                                            <Icons tipo="CiImport" tamanho={55} />
                                        </p>
                                    ) : (
                                        <p style={{ cursor: "pointer" }}>
                                            <b> Arquivo Rename </b><br /><br />
                                            Arraste e solte um arquivo <b>excel</b> referente a loja ou clique para selecionar o arquivo <br /><br />

                                            <Icons tipo="CiImport" tamanho={55} />
                                        </p>
                                    )}

                                </div>
                            )
                        }
                  
                    </Col>

                </Row>

            </Modal.Body>
            <Modal.Footer>

                <Button className="position" variant="secondary" onClick={() => { onHide(); setFormattedList([]); }}>
                    Fechar
                </Button>
                <Button
                    className="position"
                    variant="secondary"
                    onClick={() => {
                        formattedList.length > 0
                            ? mutation.mutate()
                            : toast.info("A lista está vazia, por favor adicione dados antes de confirmar.");
                    }}
                    disabled={cadastroIsLoading}
                >
                    {cadastroIsLoading ? (
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
                    ) : "Confirmar"}
                </Button>
                <Button onClick={onCompareFiles} disabled={!(isFileImportLoaded && isFileRenameLoaded)}>
                    Comparar arquivos
                </Button>





            </Modal.Footer>
        </Modal>
    );
}