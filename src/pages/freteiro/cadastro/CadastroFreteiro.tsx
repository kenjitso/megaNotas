import { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Toast } from 'react-bootstrap';
import { Menu } from '@/pages/Menu';
import { Freteiro, IFreteiro } from '@/datatypes/freteiro';
import { useParams } from 'react-router-dom';
import useQueryNotification from '@/hooks/useQueryNotification';
import useQueryMutation from '@/hooks/useQueryMutation';
import InputNumero from '@/components/inputs/InputNumero';
import InputTexto from '@/components/inputs/InputTexto';
import InputTextoEsp from '@/components/inputs/InputTextoEsp';


export function CadastroFreteiro() {



    const { id } = useParams<{ id: string }>();

    const freteiroMutator = useQueryMutation(new Freteiro(), {
        queryKey: ["Freteiros", id ?? ""],
        queryFn: async () => await Freteiro.get(id ?? ""),
        saveFn: async (data) => {
            if (id) {
                data.id = id;
                console.log(data);
                return await Freteiro.update(data);
            }
            return await Freteiro.create(data);
        },
        invalidateKeys: [["Freteiros"]]
    });

    const camposLimpos = {
        id: "",
        nome: "",
        fixo: 0,
        percentual: 0,
        prioridade: 0,
        valor_min: 0,
        valor_max: 0,
        global: false,
    };


    const [freteiro, setFreteiro] = useState<IFreteiro>(camposLimpos);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        freteiroMutator.save();
    };

    const handleReset = () => {
        setFreteiro(camposLimpos);
    };



    const handleDelete = () => {
        if (id) {
            Freteiro.delete(id)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    return (
        <Row>
            <Col className="body text-center">
                <Row>
                    <Col>
                        <h1>{id ? "Atualizar Freteiro 15/02/2023" : "Cadastra Produto 15/02/2023"}</h1>
                    </Col>
                </Row>
                <Row className="menuFreteiro border">
                    <Menu
                        links={[
                            { label: "Lista de Freteiros", url: "/freteiro" },
                            { label: "Cadastrar Freteiro", url: "/freteiro/novo" }
                        ]}
                        showSearch={false}
                    />
                </Row>


                <Row className="menuFreteiro border">
                    <Col>
                        <Form onSubmit={handleSubmit} className="text-start">
                            <Form.Group controlId="formNome" className="mb-3">
                                <Form.Label><b>Nome:</b></Form.Label>
                                <Form.Control
                                    as={InputTextoEsp}
                                    type="text"
                                    title="Por favor, insira apenas caracteres não numéricos"
                                    value={freteiroMutator.state.nome}
                                    onValueChange={(texto: string) => freteiroMutator.update("nome", texto)}
                                    placeholder="Insira o nome do freteiro"
                                    maxLength={60}
                                />

                            </Form.Group>
                            <Form.Group controlId="formFixo" className="mb-3">
                                <Form.Label><b>Valor fixo:</b></Form.Label>
                                <Form.Control
                                    as={InputNumero}
                                    type="number"
                                    decimals={2}
                                    value={freteiroMutator.state.fixo}
                                    onValueChange={(numero: number) => freteiroMutator.update("fixo", numero)}
                                    placeholder="Insira o valor fixo" />
                            </Form.Group>
                            <Form.Group controlId="formPercentual" className="mb-3">
                                <Form.Label><b>Percentual (%):</b></Form.Label>
                                <Form.Control
                                    as={InputNumero}
                                    type="number"
                                    decimals={0}
                                    max={100}
                                    value={freteiroMutator.state.percentual}
                                    onValueChange={(numero: number) => freteiroMutator.update("percentual", numero)}
                                    placeholder="Insira o percentual"
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrioridade" className="mb-3">
                                <Form.Label><b>Prioridade:</b></Form.Label>
                                <Form.Control
                                    as={InputNumero}
                                    type="number"
                                    decimals={0}
                                    max={100}
                                    value={freteiroMutator.state.prioridade}
                                    onValueChange={(numero: number) => freteiroMutator.update("prioridade", numero)}
                                    placeholder="Insira a prioridade"
                                />
                            </Form.Group>
                            <Form.Group controlId="formValorMin" className="mb-3">
                                <Form.Label><b>Valor mínimo:</b></Form.Label>
                                <Form.Control
                                    as={InputNumero}
                                    type="number"
                                    decimals={2}
                                    value={freteiroMutator.state.valor_min}
                                    onValueChange={(numero: number) => freteiroMutator.update("valor_min", numero)}
                                    placeholder="Insira o valor mínimo"
                                />
                            </Form.Group>
                            <Form.Group controlId="formValorMax" className="mb-3">
                                <Form.Label><b>Valor máximo:</b></Form.Label>
                                <Form.Control
                                    as={InputNumero}
                                    type="number"
                                    decimals={2}
                                    value={freteiroMutator.state.valor_max}
                                    onValueChange={(numero: number) => freteiroMutator.update("valor_max", numero)}
                                    placeholder="Insira o valor máximo" />
                            </Form.Group>
                            <Form.Group controlId="formGlobal" className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Global"
                                    checked={freteiroMutator.state.global}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        freteiroMutator.update("global", e.target.checked)
                                    }
                                />
                            </Form.Group>
                            <center>
                                <Row>
                                    <Col>
                                        <Button variant="secondary" type="submit">
                                            {id ? "Atualizar Freteiro" : "Cadastrar Freteiro"}
                                        </Button>
                                    </Col>
                                    <Col>
                                        {id ?
                                            <Button variant="secondary" onClick={handleDelete}>
                                                Deletar Freteiro
                                            </Button>
                                            : ""}
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={handleReset}>
                                            Limpar Formulário
                                        </Button>
                                    </Col>
                                </Row>
                            </center>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>

    );
}