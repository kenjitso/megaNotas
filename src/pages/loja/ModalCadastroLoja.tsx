import FragmentLoading from "@/components/fragments/FragmentLoading";
import InputNumero from "@/components/inputs/InputNumero";
import { isValidForm } from "@/components/utils/ValidForm";
import { LojaController } from "@/datatypes/loja";
import useQueryMutation from "@/hooks/useQueryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";

interface IProps {
    lojaId?: string;
    onHide: () => void;
}

export function ModalCadastroLoja({ onHide, lojaId }: IProps) {
    const queryClient = useQueryClient();



    const lojaMutator = useQueryMutation(LojaController.createNew(), {
        queryEnabled: !!lojaId && typeof onHide === 'function',
        queryKey: ["lojas", lojaId ?? ""],
        queryFn: async () => await LojaController.get(lojaId ?? ""),
        onSaveSuccess: () => {
            onHide();
            queryClient.invalidateQueries(["catalogoshome"]);
            lojaMutator.clear();
        },
        toasts: {
            saveComplete: lojaId ? `Loja alterado com sucesso!` : `Loja cadastrado com sucesso!`
        },

        saveFn: (lojaArray) => {
            const lojaObject = {
                id: lojaArray.id ?? "",
                ativo: lojaArray.ativo ?? true,
                nome: lojaArray.nome ?? "",
                cotacao: lojaArray.cotacao ?? 0,
                url_cotacao: lojaArray.url_cotacao ?? "",
                url_catalogo: lojaArray.url_catalogo ?? "",
                ultima_atualizacao: lojaArray.ultima_atualizacao ?? new Date(),
                algoritmo: lojaArray.algoritmo ?? 0,
            }


            return LojaController.save(lojaObject);
        },


    });



    return (
        <Modal
            size="lg"
            centered
            backdrop="static"
            keyboard={false}
            show={lojaId !== undefined}
            onHide={() => { onHide(); lojaMutator.clear(); }}>

            <Modal.Header closeButton>
                <Modal.Title> {lojaId ? "Atualizar Loja" : "Cadastrar Loja"} </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {lojaId && lojaMutator.isLoading ? (
                    <div>{<FragmentLoading />}</div>) : (
                    <Row>
                        <Col className="body text-center">
                            <Row className="menuloja">
                                <Form className="text-start">
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="formNome"
                                                className="mb-3">
                                                <FloatingLabel controlId="formNome" label="Nome">
                                                    <Form.Control
                                                        title="Por favor, insira apenas caracteres não numéricos"
                                                        value={lojaMutator.state.nome ?? ""}
                                                        onChange={(event) => lojaMutator.update("nome", event.target.value)}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Por favor, preencha o campo Nome.</div>
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        <Col>

                                            <Form.Group
                                                controlId="formCotacao"
                                                className="mb-3">
                                                <FloatingLabel
                                                    controlId="formCotacao"
                                                    label="Cotação">
                                                    <Form.Control
                                                        as={InputNumero}
                                                        type="number"
                                                        decimals={2}
                                                        value={lojaMutator.state.cotacao ?? 0}
                                                        onValueChange={(numero: number) => lojaMutator.update("cotacao", numero)}
                                                        placeholder="Insira a cotação"
                                                    />


                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>


                                            <Form.Group
                                                controlId="formUrlCatalogo"
                                                className="mb-3">
                                                <Form.Select
                                                    value={lojaMutator.state.algoritmo}
                                                    onChange={(event) => lojaMutator.update("algoritmo", parseInt(event.target.value))}>
                                                    <option value="0">
                                                        Selecione o Algoritimo
                                                    </option>
                                                    <option value="9">
                                                        Algoritimo Padrao
                                                    </option>
                                                    <option value="1">
                                                        Atacado Games
                                                    </option>
                                                    <option value="2">
                                                        Atlantico
                                                    </option>
                                                    <option value="3">
                                                        Best Shop
                                                    </option>
                                                    <option value="4">
                                                        Cell Shop
                                                    </option>
                                                    <option value="5">
                                                        Madrid Center
                                                    </option>
                                                    <option value="6">
                                                        Star Games
                                                    </option>
                                                    <option value="7">
                                                        Mega
                                                    </option>
                                                    <option value="8">
                                                        Mobile Zone
                                                    </option>


                                                </Form.Select>
                                            </Form.Group>
                                            {lojaMutator.state.algoritmo === 9 && <center><a href="/modelo.xlsx">Download Modelo</a></center>}
                                        </Col>
                                    </Row>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="position"
                    variant="secondary"
                    disabled={!!lojaId && lojaMutator.isLoading}
                    onClick={() => {
                        if (isValidForm()) { lojaMutator.save(); };
                    }}>
                    {lojaId ? "Atualizar Loja" : "Cadastrar Loja"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}