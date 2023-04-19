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

interface IProps {
    onHide: () => void,
    lojaId?: string,
}

export function ModalCadastroProdutoLoja({ onHide, lojaId }: IProps) {

    const [formattedList, setFormattedList] = useState<IProdutoLoja[]>([]);
    const [listToSave, setListToSave] = useState<IProdutoLoja[]>([]);
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);



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

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsLoading(true);
        acceptedFiles.forEach((file) => {
            if (!file) return;
            if (
                file.type === "text/plain" ||
                file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/vnd.ms-excel"
            ) {
                const reader = new FileReader();
                reader.onload = () => {
                    const fileData = reader.result;

                    if (fileData) {
                        if (file.type === "text/plain") {
                            const data = (fileData as string)
                                .split("\n")
                                .map((line: string) => line.trim().split(/\s{2,}/));
                        } else {
                            const workbook = XLSX.read(fileData, { type: "binary" });
                            const sheetName = workbook.SheetNames[0];
                            const worksheet = workbook.Sheets[sheetName];
                            const dataList: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
                                header: 1,
                            });

                            if (data?.algoritmo === 1) {
                                setFormattedList(AtacadoGamesFormat(lojaId ?? "", dataList));
                            }
                            if (data?.algoritmo === 2) {
                                console.log("Clodoaldo GAMES");
                            }

                        }
                    }
                    setIsLoading(false);
                };
                reader.readAsBinaryString(file);
            } else {
                toast.info("Tipo de arquivo não suportado, precisa ser excel ou txt");
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
                <Modal.Title>Cadastro - Arraste um arquivo</Modal.Title>
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
                                        <p>Solte o arquivo aqui...</p>
                                    ) : (
                                        <p style={{ cursor: "pointer" }}>
                                            Arraste e solte um arquivo aqui ou clique para selecionar um arquivo <br /><br />

                                            <Icons tipo="download" />
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


            </Modal.Footer>
        </Modal>
    );
}