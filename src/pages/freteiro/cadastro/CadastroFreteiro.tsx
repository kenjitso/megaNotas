import { Col, Row, Form, Button } from 'react-bootstrap';
import { Menu } from '@/pages/Menu';
import { Freteiro } from '@/datatypes/freteiro';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryMutation from '@/hooks/useQueryMutation';
import InputNumero from '@/components/inputs/InputNumero';
import InputTextoEsp from '@/components/inputs/InputTextoEsp';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export function CadastroFreteiro() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const freteiroMutator = useQueryMutation(new Freteiro(), {
        queryKey: ["Freteiros", id ?? ""],
        queryFn: async () => await Freteiro.get(id ?? ""),
        saveFn: async (data) => {
            try {
                let response = null;
                if (id) {
                    data.id = id;
                    response = await Freteiro.update(data);
                } else {
                    const novoFreteiro = new Freteiro();
                    novoFreteiro.nome = freteiroMutator.state.nome;
                    novoFreteiro.fixo = freteiroMutator.state.fixo || 0;
                    novoFreteiro.global = freteiroMutator.state.global || false;
                    novoFreteiro.percentual = freteiroMutator.state.percentual;
                    novoFreteiro.prioridade = freteiroMutator.state.prioridade || 0;
                    novoFreteiro.valor_max = freteiroMutator.state.valor_max || 0;
                    novoFreteiro.valor_min = freteiroMutator.state.valor_min || 0;
                    response = await Freteiro.create(novoFreteiro);
                }
                if (response && response.id) {
                    toast.success("Freteiro alterado com sucesso!");
                } else {
                    toast.success("Freteiro salvo com sucesso!");
                }
                return response;
            } catch (error) {
                toast.error("Ocorreu um erro ao salvar a freteiro");
                throw error;
            }
        },
        invalidateKeys: [["Freteiros"]]
    });


    const freteiroQuery = useQuery(
        ["Freteiros", id ?? ""],
        async () => await Freteiro.get(id ?? ""),
        { staleTime: 0 }
    );

    const handleSave = () => {
        if (!freteiroMutator.state.nome) {
            toast.info("Por favor, preencha o nome do Freteiro!")
            return;
        }

        freteiroMutator.save();
    };


    return (
        <Row>
            <Col className="body text-center">
                <Row className="menuFreteiro">
                    <Menu
                        links={[
                            { label: "Lista de freteiros", url: "/freteiro" },
                            { label: "Cadastrar freteiro", url: "/freteiro/novo" }

                        ]}
                        showSearch={false}
                        showCadAtu={true}
                        onHandleSave={handleSave}
                        buttonStats={id ? "Atualiza" : "Cadastra"}
                        onHandleToList={() => { navigate("/freteiro") }}
                    />
                </Row>


                <Row className="menuFreteiro">

                    <Form className="text-start">
                        <Row>
                            <Form.Group controlId="formNome" className="mb-3">
                                <Form.Label><b>Nome:</b></Form.Label>
                                <Form.Control
                                    as={InputTextoEsp}
                                    type="text"
                                    title="Por favor, insira apenas caracteres não numéricos"
                                    value={freteiroMutator.state.nome ? freteiroMutator.state.nome : ''}
                                    onValueChange={(texto: string) => freteiroMutator.update("nome", texto)}
                                    placeholder="Insira o nome do freteiro"
                                    maxLength={60}
                                />

                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formFixo" className="mb-3">
                                    <Form.Label><b>Valor fixo:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={freteiroMutator.state.fixo ? freteiroMutator.state.fixo : ''}
                                        onValueChange={(numero: number) => freteiroMutator.update("fixo", numero)}
                                        placeholder="Insira o valor fixo" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formValorMin" className="mb-3">
                                    <Form.Label><b>Valor mínimo:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={freteiroMutator.state.valor_min ? freteiroMutator.state.valor_min : ''}
                                        onValueChange={(numero: number) => freteiroMutator.update("valor_min", numero)}
                                        placeholder="Insira o valor mínimo"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formValorMax" className="mb-3">
                                    <Form.Label><b>Valor máximo:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={freteiroMutator.state.valor_max ? freteiroMutator.state.valor_max : ''}
                                        onValueChange={(numero: number) => freteiroMutator.update("valor_max", numero)}
                                        placeholder="Insira o valor máximo" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formPercentual" className="mb-3">
                                    <Form.Label><b>Percentual (%):</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={0}
                                        max={100}
                                        value={freteiroMutator.state.percentual ? freteiroMutator.state.percentual : ''}
                                        onValueChange={(numero: number) => freteiroMutator.update("percentual", numero)}
                                        placeholder="Insira o percentual"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGlobal" className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Global"
                                        checked={freteiroMutator.state.global || false}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            freteiroMutator.update("global", e.target.checked)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formPrioridade" className="mb-3">
                                    <Form.Label><b>Prioridade:</b></Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={0}
                                        max={100}
                                        value={freteiroMutator.state.prioridade ? freteiroMutator.state.prioridade : ''}
                                        onValueChange={(numero: number) => freteiroMutator.update("prioridade", numero)}
                                        placeholder="Insira a prioridade"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                </Row>
            </Col >
        </Row >
    );
}