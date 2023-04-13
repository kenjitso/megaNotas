import { LojaController } from "@/datatypes/loja";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { AtacadoGamesFormat } from "@/functions/lojas/atacadoGames";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { ModalTableProdutoLoja } from "./ModalTableProdutoLoja";

interface IProps {
    onHide: () => void,
    lojaId?: string,
}

export function ModalImportProdutoLoja({ onHide, lojaId }: IProps) {

    const [formattedList, setFormattedList] = useState<IProdutoLoja[]>([]);
    const queryClient = useQueryClient();
    const { data } = useQuery(["loja", lojaId], async () => {
        const data = await LojaController.get(lojaId ?? "");
        console.log(data);
        return data;
    }, { enabled: !!lojaId && typeof onHide === 'function' }); // habilita a consulta somente quando lojaId estiver definido e onHide for uma função });


    const mutation = useMutation(() => {
        if (!lojaId) throw new Error("Loja Indefinido");
        return ProdutoLojaController.importar(formattedList);
    }, {
        onSuccess: () => {
            onHide();
            queryClient.invalidateQueries(["produtosloja", lojaId]);
        }
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
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
                            // setShowModal(false);
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
                };
                reader.readAsBinaryString(file);
            } else {
                toast.info("Tipo de arquivo não suportado, precisa ser excel ou txt");
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
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Arraste um arquivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className="body text-center">
                        <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Solte o arquivo aqui...</p>
                            ) : (
                                <p style={{ cursor: "pointer" }}>
                                    Arraste e solte um arquivo aqui ou clique para selecionar um arquivo
                                </p>
                            )}
                        </div>

                        <ModalTableProdutoLoja
                            listProdutoLoja={formattedList}
                        />

                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button className="position" variant="secondary" onClick={() => onHide()}>
                    Fechar
                </Button>
                <Button className="position" variant="secondary" onClick={() => mutation.mutate()}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}