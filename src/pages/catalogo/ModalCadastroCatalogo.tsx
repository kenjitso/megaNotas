import { Icons } from "@/components/icons/icons";
import InputNumero from "@/components/inputs/InputNumero";
import { CatalogoController } from "@/datatypes/catalogo";
import useQueryMutation from "@/hooks/useQueryMutation";
import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, InputGroup, Modal, Row } from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { isValidForm } from "@/components/utils/ValidForm";
import { toast } from "react-toastify";
import FragmentLoading from "@/components/fragments/FragmentLoading";

interface IProps {
    catalogoId?: string,
    onHide: () => void,
}

export function ModalCadastroCatalogo({ onHide, catalogoId }: IProps) {
    const [isLoading, setIsLoading] = useState(false);


    const catalogoMutator = useQueryMutation(CatalogoController.createNew(), {
        queryEnabled: !!catalogoId && typeof onHide === 'function',
        queryKey: ["catalogos", catalogoId ?? ""],
        queryFn: async () => await CatalogoController.integrarML(await CatalogoController.get(catalogoId ?? "")),
        onSaveSuccess: () => {
            onHide();
            catalogoMutator.clear();
        },
        onQueryError: (error) => {
            if (error instanceof Error) {
                toast.error(error.message);

            };
        },
        toasts: {
            saveComplete: catalogoId ? `Catalogo alterado com sucesso!` : `Catalogo cadastrado com sucesso!`,
        },
        saveFn: CatalogoController.save,
    });

    const handleSearchMl = async () => {
        setIsLoading(true);
        try {
            const atualizado = await CatalogoController.integrarML(catalogoMutator.state);
            catalogoMutator.set({ ...atualizado });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <React.Fragment>
            <Modal
                size="lg"
                centered
                backdrop="static"
                keyboard={false}
                show={catalogoId !== undefined}
                onHide={() => { onHide(); catalogoMutator.clear() }}>

                <Modal.Header closeButton>
                    <Modal.Title> {catalogoId ? "Atualizar Produto" : "Cadastrar Produto"} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {catalogoId && catalogoMutator.isLoading ? (
                        <div>{<FragmentLoading />}</div>) : (
                        <Row>
                            <Col xs={3}>
                                <img
                                    src={catalogoMutator.state.url_thumbnail || ratata}
                                    alt="Descrição da imagem"
                                    className="m-3"
                                    max-width="100%"
                                    max-height="100%"
                                    width="150px"
                                    height="200px"
                                    style={{ objectFit: "contain" }}
                                /></Col>
                            <Col xs={9}>
                                <Row className="menuloja">
                                    <Form className="text-start">
                                        <Row>
                                            <Col xs>
                                                <InputGroup className="mb-3">
                                                    <FloatingLabel label="Url do catálogo">
                                                        <Form.Control
                                                            placeholder="Insira a url do catálogo"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            value={catalogoMutator.state.url_catalogo}
                                                            onChange={((event) => catalogoMutator.update("url_catalogo", event.target.value))}
                                                            required
                                                        />
                                                    </FloatingLabel>

                                                    <Button
                                                        onClick={() => {
                                                            if (isValidForm()) {
                                                                handleSearchMl();
                                                            }
                                                        }}
                                                        variant="outline-secondary"
                                                        id="button-addon2"
                                                    >
                                                        {isLoading ? (
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        ) : (
                                                            <Icons tipo="search" />
                                                        )}
                                                    </Button>

                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <Form.Group
                                                    controlId="formComissao"
                                                    className="mb-3">
                                                    <FloatingLabel
                                                        controlId="formComissao"
                                                        label="Comissão %">
                                                        <Form.Control
                                                            as={InputNumero}
                                                            type="number"
                                                            decimals={0}
                                                            max={100}
                                                            value={(catalogoMutator.state.comissao * 100)}
                                                            onValueChange={(numero: number) => { catalogoMutator.update("comissao", numero) }}
                                                            placeholder="Insira a comissão"
                                                            readOnly={true}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>


                                                <Form.Group
                                                    controlId="frete"
                                                    className="mb-3">
                                                    <FloatingLabel
                                                        controlId="formFrete"
                                                        label="Preço Frete">
                                                        <Form.Control
                                                            as={InputNumero}
                                                            type="number"
                                                            decimals={2}
                                                            value={catalogoMutator.state.frete}
                                                            onValueChange={(numero: number) => { catalogoMutator.update("frete", numero) }}
                                                            placeholder="Insira o frete"
                                                            readOnly={true}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group
                                                    controlId="preco"
                                                    className="mb-3">
                                                    <FloatingLabel controlId="formPreco" label="Preço">
                                                        <Form.Control
                                                            as={InputNumero}
                                                            type="number"
                                                            decimals={2}
                                                            value={catalogoMutator.state.preco}
                                                            onValueChange={(numero: number) => { catalogoMutator.update("preco", numero) }}
                                                            placeholder="Insira o preco"
                                                            readOnly={true}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formNome" className="mb-3">
                                                    <FloatingLabel
                                                        controlId="formNome"
                                                        label="Nome produto">
                                                        <Form.Control
                                                            type="text"
                                                            value={catalogoMutator.state.nome}
                                                            placeholder="Insira o nome do produto"
                                                            onChange={(event) => catalogoMutator.update("nome", event.target.value)}
                                                            readOnly={true}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                    </Form>
                                </Row>
                            </Col>
                        </Row>
                    )}
                </Modal.Body >


                <Modal.Footer>
                    <Button className="position"
                        variant="secondary"
                        disabled={isLoading || (!!catalogoId && catalogoMutator.isLoading)}
                        onClick={() => {
                            if (isValidForm()) { catalogoMutator.save(); }
                        }}>
                        {catalogoId ? "Atualizar Produto" : "Cadastrar Produto"}
                    </Button>
                </Modal.Footer>

            </Modal >
        </React.Fragment>
    );
}