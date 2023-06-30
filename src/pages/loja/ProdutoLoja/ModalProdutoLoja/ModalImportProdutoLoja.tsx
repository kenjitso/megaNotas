import { LojaController } from "@/datatypes/loja";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { AtacadoGamesFormat } from "@/functions/lojas/atacadoGames";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Modal, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { ModalTableImportProdutoLoja } from "./ModalTableImportProdutoLoja";
import { Icons } from "@/components/icons/icons";
import FragmentLoading from "@/components/fragments/FragmentLoading";
import { AtlanticoFormat } from "@/functions/lojas/atlantico";
import { BestShopFormat } from "@/functions/lojas/bestShop";
import { CellShopFormat } from "@/functions/lojas/cellShop";
import { MadridCenterFormat } from "@/functions/lojas/madridCenter";
import * as pdfjsLib from "pdfjs-dist";

import { StarGamesFormat } from "@/functions/lojas/starGames";
import { MegaFormat } from "@/functions/lojas/mega";
import { MobileZoneFormat } from "@/functions/lojas/mobileZone";
import { AlgoritmoPadraoFormat } from "@/functions/lojas/algoritmoPadrao";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface IProps {
    onHide: () => void,
    lojaId?: string,
}

export function ModalImportProdutoLoja({ onHide, lojaId }: IProps) {

    const [formattedList, setFormattedList] = useState<IProdutoLoja[]>([]);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const { data } = useQuery(["loja", lojaId], async () => {
        const data = await LojaController.get(lojaId ?? "");

        return data;
    }, { enabled: !!lojaId && typeof onHide === 'function' }); // habilita a consulta somente quando lojaId estiver definido e onHide for uma função });

    const mutation = useMutation(() => {
        if (!lojaId) throw new Error("Loja Indefinido");
        return ProdutoLojaController.importar(formattedList);
    }, {
        onSuccess: () => {
            onHide();
            setFormattedList([]);
            queryClient.invalidateQueries(["produtosloja"]);
        }
    });

    const { isLoading: importIsLoading } = mutation;

    const onDrop = useCallback((acceptedFiles: File[]) => {
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

                                if (data?.algoritmo === 3) {
                                    setFormattedList(BestShopFormat(lojaId ?? "", allPagesText)); //BESTSHOP  FUNCIONANDO OK
                                }

                                if (data?.algoritmo === 1) {
                                    setFormattedList(AtacadoGamesFormat(lojaId ?? "", allPagesText)); //ATACADO GAMES  FUNCIONANDO OK
                                }

                                if (data?.algoritmo === 5) {
                                    setFormattedList(MadridCenterFormat(lojaId ?? "", allPagesText)); //MADRID CENTER FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                                }
                                if (data?.algoritmo === 6) {
                                    setFormattedList(StarGamesFormat(lojaId ?? "", allPagesText)); //STAR GAMES FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                                }

                                if (data?.algoritmo === 2) {
                                    setFormattedList(AtlanticoFormat(lojaId ?? "", allPagesText)); //ATLANTICO FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                                }

                                if (data?.algoritmo === 7) {

                                    setFormattedList(MegaFormat(lojaId ?? "", allPagesText)); //MEGA FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                                }

                            });
                        } else {
                            const workbook = XLSX.read(fileData, { type: "binary" });
                            const sheetName = workbook.SheetNames[0];
                            const worksheet = workbook.Sheets[sheetName];
                            const dataList: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
                                header: 1,
                            });

                            if (data?.algoritmo === 4) {
                                setFormattedList(CellShopFormat(lojaId ?? "", dataList)); //CELLSHOP FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                            }

                            if (data?.algoritmo === 8) {
                                setFormattedList(MobileZoneFormat(lojaId ?? "", dataList)); //CELLSHOP FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                            }

                            if (data?.algoritmo === 9) {
                                setFormattedList(AlgoritmoPadraoFormat(lojaId ?? "", dataList)); //AlgoritmoPadrao FUNCIONANDO OK NAO TEM NOME DA LOJA NO ARQUIVO
                            }

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
    }, [onHide, data]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
                    ? `Atualizar - ${data?.nome}`
                    : `Atualizar - Arraste um arquivo de ${data?.nome}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>

                    <Col className="body text-center">

                        {
                            formattedList.length === 0 && (
                                <div {...getRootProps()} className="dropzone">
                                    <input {...getInputProps()} />
                                    {isLoading ? (
                                        <div>
                                            <FragmentLoading />
                                        </div>
                                    ) : isDragActive ? (
                                        <p style={{ cursor: "pointer" }}>
                                            Solte o arquivo <b>pdf</b> ou <b>excel</b> aqui. <br /><br />

                                            <Icons tipo="CiImport" tamanho={55} />
                                        </p>
                                    ) : (
                                        <p style={{ cursor: "pointer" }}>
                                            Arraste e solte um arquivo <b>pdf</b> ou <b>excel</b> referente a loja ou clique para selecionar o arquivo <br /><br />
                                            <Icons tipo="CiImport" tamanho={55} />
                                        </p>
                                    )}

                                </div>
                            )
                        }

                        {
                            !importIsLoading && formattedList.length > 0 ? (
                                <ModalTableImportProdutoLoja
                                    listProdutoLoja={formattedList}
                                />
                            ) : importIsLoading ? (
                                <div>
                                    <FragmentLoading />
                                </div>
                            ) : null

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
                    disabled={importIsLoading}
                >
                    {importIsLoading ? (
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

            </Modal.Footer>
        </Modal>
    );
}