import FragmentLoading from '@/components/fragments/FragmentLoading';
import InputNumero from '@/components/inputs/InputNumero';
import InputTextoEsp from '@/components/inputs/InputTextoEsp';
import { Menu } from '@/pages/Menu';
import { Freteiro } from '@/datatypes/freteiro';
import { Loja } from '@/datatypes/loja';
import useQueryMutation from '@/hooks/useQueryMutation';
import useQueryNotification from '@/hooks/useQueryNotification';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { TableFreteiroLoja } from './TableFreteiroLoja';
import { toast } from 'react-toastify';


export function CadastroLoja() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const lojaMutator = useQueryMutation(new Loja(), {
        queryKey: ["Lojas", id ?? ""],
        queryFn: async () => await Loja.get(id ?? ""),
        saveFn: async (data) => {
            try {
                let response = null;
                if (id) {
                    data.id = id;
                    response = await Loja.update(data);
                } else {
                    response = await Loja.create(data);
                }
                if (response && response.id) {
                    toast.success("Loja alterada com sucesso!");
                } else {
                    toast.success("Loja salva com sucesso!");
                }
                return response;
            } catch (error) {
                toast.error("Ocorreu um erro ao salvar a loja");
                throw error;
            }
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

    const handleSave = () => {
        if (!lojaMutator.state.nome) {
            toast.info("Por favor, preencha o nome da Loja!");
            return;
        }
        lojaMutator.save();


    };

    return (
        <Row>
            <Col className="body text-center">
                <Row>
                    <Menu
                        links={[{ label: "Lista de lojas", url: "/lojas" },
                        { label: "Cadastrar loja", url: "/lojas/novo" }
                        ]}
                        showSearch={false}
                        showCadAtu={true}
                        onHandleSave={handleSave}
                        buttonStats={id ? "Atualiza" : "Cadastra"}
                        onHandleToList={() => { navigate("/lojas") }}
                    />
                </Row>
                <Row className="menuloja border">
                
                    <Form>
                 
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
                                        maxLength={120} />
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
                                        maxLength={120} />
                                </Form.Group>
                            </Col>

                          
                               
                                    <h1 style={{ whiteSpace: 'nowrap' }}>{id ? "Freteiro Atualizar loja 15/02/2023" : "Freteiro Cadastro Loja 15/02/2023"}</h1>
                              

                               
                                   
                                        <center>
                                        {!freteiroQuery.isLoading &&
                                            <TableFreteiroLoja
                                                listFreteiro={freteiroQuery.data ?? []}
                                                onUpdateFreteiro={(freteiros: string[]) => lojaMutator.update("freteiro", freteiros)}
                                                selectedFreteiros={lojaMutator.state.freteiro}
                                            />
                                        }
                                        {freteiroQuery.isLoading && <FragmentLoading />}
                                        </center>
                                  
                               
                           
                         
                        </Row>
                        
                        <center>
                            <Row>
                                <Col>
                                    <Button variant="secondary" onClick={handleSave}>
                                        {id ? "Atualizar Loja" : "Cadastrar Loja"}
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

