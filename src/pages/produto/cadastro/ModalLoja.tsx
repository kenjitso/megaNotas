
import { ILoja, Loja } from "@/datatypes/loja";
import useQueryNotification from "@/hooks/useQueryNotification";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";

interface IProps {
  onLojaSelect: (id: ILojaModal[]) => void;
}

interface ILojaModal {
  id: string;
  codigo: string;
  preco: number;
  nome: string;
  cotacao: number;
  ultima_atualizacao: string;
}


export function ModalLoja({ onLojaSelect }: IProps) {
  const [selectedLoja, setSelectedLoja] = useState<ILoja | null>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputData, setInputData] = React.useState({ codigo: "", idloja: "", preco: 0 });
  const [lojas, setLojas] = React.useState<ILojaModal[]>([]);
  const date = new Date();
  const formattedDate = date.toISOString();

  const lojasQuery = useQueryNotification({
    queryKey: ["Lojas"],
    queryFn: async () => await Loja.search(),
  });

  const handleInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  }

  const handleAddLoja = () => {
    if (!selectedLoja) return;
    if (inputData.codigo === "") {
    } else {
      const novaLista = [...lojas, { id: selectedLoja.id, codigo: inputData.codigo, preco: inputData.preco, nome: selectedLoja.nome, cotacao: selectedLoja.cotacao, ultima_atualizacao: formattedDate, }];
      setLojas(novaLista);

    }
  };

  const handleSalvarLoja = () => {
    onLojaSelect(lojas);
    handleClose();
  };

  const handleRemoveLoja = (index: number) => {
    const novaLista = lojas.filter((_, i) => i !== index);
    setLojas(novaLista);
  };


  return (
    <React.Fragment>
      <Button variant="secondary" onClick={handleShow}>
        Adicionar Loja
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Loja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formLoja" className="mb-1">
                <Form.Label><b>Loja:</b></Form.Label>
                <Form.Select onChange={(e) => {
                  const idLojaSelecionada = e.target.value;
                  const lojaSelecionada = lojasQuery.data?.find(loja => loja.id === idLojaSelecionada) ?? null;
                  setSelectedLoja(lojaSelecionada);
                }} defaultValue="">
                  <option value="">Selecione a loja</option>
                  {lojasQuery.data?.map((loja) => (
                    <option key={loja.id} value={loja.id}>
                      {`${loja.nome}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCotacao" className="mb-1">
                <Form.Label><b>Cotação:</b></Form.Label>
                <Form.Control 
                type="number" 
                name="cotacao" 
                value={selectedLoja?.cotacao || ""} 
                readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formCodigoLoja" className="mb-1">
                <Form.Label><b>Código Loja:</b></Form.Label>
                <Form.Control 
                type="text" 
                name="codigo" 
                value={inputData.codigo} 
                onChange={handleInputData} 
                placeholder="Insira o código da loja" 
                required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPrecoLoja" className="mb-1">
                <Form.Label>
                  <b>Preço Loja:</b>
                </Form.Label>
                <Form.Control 
                type="number" 
                name="preco" 
                value={inputData.preco} 
                onChange={handleInputData} 
                placeholder="Insira o preço do produto na loja" 
                required />
              </Form.Group>
              <br />
            </Col>
          </Row>
          <Row >
            {lojas && lojas.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Preço</th>
                    <th>Nome</th>
                    <th>Cotação</th>
                  </tr>
                </thead>
                <tbody>
                  {lojas.map((loja, index) => (
                    <tr key={index}>
                      <td>{loja.codigo}</td>
                      <td>{loja.preco}</td>
                      <td>{loja.nome}</td>
                      <td>{loja.cotacao}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveLoja(index)}
                        >
                          Remover
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div>Nenhuma loja adicionada</div>
            )}
          </Row>
          <Button variant="primary" onClick={handleAddLoja}>+
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSalvarLoja}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}