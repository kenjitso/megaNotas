import FragmentLoading from '@/components/fragments/FragmentLoading';
import InputNumero from '@/components/inputs/InputNumero';
import InputTextoEsp from '@/components/inputs/InputTextoEsp';
import { Menu } from '@/pages/Menu';
import { Freteiro, IFreteiro } from '@/datatypes/freteiro';
import { ILoja, Loja } from '@/datatypes/loja';
import useQueryMutation from '@/hooks/useQueryMutation';
import useQueryNotification from '@/hooks/useQueryNotification';
import { Col, Row, Form, Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { TableFreteiroLoja } from './TableFreteiroLoja';


export function CadastroLoja() {

    const camposLimpos = {
        id: "",
        nome: "",
        cotacao: 0,
        freteiro: [],
        url_cotacao: "",
        url_catalogo: "",
    }

    const { id } = useParams<{ id: string }>();

    const lojaMutator = useQueryMutation(new Loja(), {
        queryKey: ["Lojas", id ?? ""],
        queryFn: async () => await Loja.get(id ?? ""),
        saveFn: async (data) => {
            if (id) {
                data.id = id;
                return await Loja.update(data);
            }
            return await Loja.create(data);
        },
        invalidateKeys: [["Lojas"]]
    });

    const freteiroQuery = useQueryNotification({
        queryKey: ["Freteiros"],
        queryFn: async () => await Freteiro.search(),
        onQuerySuccess: (data) => {
            lojaMutator.update("freteiro", data.map(item => item.id))
        }
    });



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        lojaMutator.save();
    };



    return (
        <Row>
            <Col className="body text-center">
                <Row>
                    <Col>
                        <h1>{id ? "Atualizar Loja 15/02/2023" : "Cadastro Loja 15/02/2023"}</h1>
                    </Col>
                </Row>
                <Row>
                    <Menu
                        links={[{ label: "Lista de Lojas", url: "/lojas" },
                        { label: "Cadastrar Loja", url: "/lojas/novo" }
                        ]}
                        showSearch={true}
                    />
                </Row>
                <Row className="menuloja border">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formNome" className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        as={InputTextoEsp}
                                        type="text"
                                        title="Por favor, insira apenas caracteres não numéricos"
                                        value={lojaMutator.state.nome}
                                        onValueChange={(texto: string) => lojaMutator.update("nome", texto)}
                                        placeholder="Insira o nome da loja"
                                        maxLength={60}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="formCotacao"
                                    className="mb-3">
                                    <Form.Label>Cotação</Form.Label>
                                    <Form.Control
                                        as={InputNumero}
                                        type="number"
                                        decimals={2}
                                        value={lojaMutator.state.cotacao}
                                        onValueChange={(numero: number) => lojaMutator.update("cotacao", numero)}
                                        placeholder="Insira a cotação" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    controlId="formUrlCotacao"
                                    className="mb-3">
                                    <Form.Label>Url Cotação: </Form.Label>
                                    <Form.Control
                                        as={InputTextoEsp}
                                        type="text"
                                        value={lojaMutator.state.url_cotacao}
                                        onValueChange={(texto: string) => lojaMutator.update("url_cotacao", texto)}
                                        placeholder="Insira a URL cotação" 
                                        maxLength={120}/>
                                </Form.Group>
                                <Form.Group
                                    controlId="formUrlCatalogo"
                                    className="mb-3">
                                    <Form.Label>Url Catalogo</Form.Label>
                                    <Form.Control
                                        as={InputTextoEsp}
                                        type="text"
                                        value={lojaMutator.state.url_catalogo}
                                        onValueChange={(texto: string) => lojaMutator.update("url_catalogo", texto)}
                                        placeholder="Insira a URL catálogo" 
                                        maxLength={120}/>
                                </Form.Group>
                            </Col>
                            <Row >
                                {!freteiroQuery.isLoading &&
                                    <TableFreteiroLoja
                                        listFreteiro={freteiroQuery.data ?? []}
                                        onUpdateFreteiro={(freteiros: string[]) => lojaMutator.update("freteiro", freteiros)}
                                        selectedFreteiros={lojaMutator.state.freteiro}
                                    />
                                }
                                {freteiroQuery.isLoading && <FragmentLoading />}
                            </Row>
                        </Row>
                        <center>
                            <Row>
                                <Col>
                                    <Button variant="secondary" type="submit">
                                        {id ? "Atualizar Loja" : "Cadastrar Loja"}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary">
                                        Limpar Formulario
                                    </Button>
                                </Col>
                            </Row>
                        </center>
                    </Form >
                </Row>
            </Col>
        </Row>
    );
}

