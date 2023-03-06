import InputNumero from "@/components/inputs/InputNumero";
import { ILoja, Loja } from "@/datatypes/loja";
import { IProdutoLoja } from "@/datatypes/produto";
import useQueryNotification from "@/hooks/useQueryNotification";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";

interface IProps {
  lojas: IProdutoLoja[];
  onUpdate: (lojas: IProdutoLoja[]) => void;
  show: boolean;
  onHide: () => void;

}

export function ModalLoja({ lojas, onUpdate, show, onHide }: IProps) {
  const [internal, setInternal] = useState<IProdutoLoja[]>([]);

  React.useEffect(() => {
    if (!show) return;
    setInternal(lojas);
  }, [show]);

  const lojasQuery = useQueryNotification({
    queryKey: ["Lojas"],
    queryFn: async () => await Loja.search(),
  });


  const handleSalvarLoja = () => {
    onUpdate(internal);
    onHide();
  };

  const handleAddItem = () => {
    setInternal([...internal, { codigo: "", idloja: "", preco: 0, ultima_atualizacao: new Date().toISOString() }]);
  };

  const handleRemoveItem = (index: number) => {
    // Remove o item com o índice especificado
    const novosItens = [...internal];
    novosItens.splice(index, 1);
    // Atualiza o estado com a nova lista de itens
    setInternal(novosItens);
  };

  const handleCodigoChange = (codigo: string, index: number) => {
    const novosItens = [...internal];
    novosItens[index].codigo = codigo;
    novosItens[index].ultima_atualizacao = new Date().toISOString();
    setInternal(novosItens);
  };

  const handleLojaChange = (idloja: string, index: number) => {
    const novosItens = [...internal];
    novosItens[index].idloja = idloja;
    setInternal(novosItens);
  };
  const handlePrecoChange = (preco: number, index: number) => {
    const novosItens = [...internal];
    novosItens[index].preco = preco;
    setInternal(novosItens);
  };

  return (
    <React.Fragment>
      <Modal size="lg" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Loja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Produto</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {internal.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        name="codigo"
                        value={item.codigo}
                        onChange={(event) => handleCodigoChange(event.target.value, index)} />
                    </td>
                    <td>
                      <Form.Select
                        value={internal[index].idloja || ""}
                        onChange={(event) => handleLojaChange(event.target.value, index)}>
                        <option
                          value="">Selecione</option>
                        {lojasQuery.data?.map((loja) => (
                          <option value={loja.nome} key={loja.id}>{loja.nome}</option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        as={InputNumero}
                        type="number"
                        value={item.preco}
                        onValueChange={(valor: number) => handlePrecoChange(valor, index)} />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Button variant="success" onClick={handleAddItem}>
            Adicionar
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
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
