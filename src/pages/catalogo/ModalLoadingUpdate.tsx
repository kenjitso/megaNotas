import { CatalogoController } from "@/datatypes/catalogo";
import React, { useState, useEffect } from "react";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { isValidForm } from "@/components/utils/ValidForm";
import { toast } from "react-toastify";

interface IProps {
  isVisible?: boolean;
  catalogos?: number;
  onHide: () => void;
}

export function ModalLoadingUpdate({ onHide, catalogos, isVisible }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible && isValidForm()) {
      syncData();
    }
  }, [isVisible]);

  const syncData = async () => {
    setIsLoading(true);
    try {
      const currentDate = new Date();
      const isoDate = currentDate.toISOString();
      await CatalogoController.sync(isoDate, catalogos ?? 1);
      toast.success("Dados sincronizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao sincronizar os dados.");
    } finally {
      setIsLoading(false);
      onHide();
    }
  };

  return (
    <React.Fragment>
      <Modal
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
        show={isVisible}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sincronizar Produtos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={3}>
              <img
                src={ratata}
                alt="Descrição da imagem"
                className="m-3"
                max-width="100%"
                max-height="100%"
                width="150px"
                height="200px"
                style={{ objectFit: "contain" }}
              />
            </Col>
          </Row>
          {isLoading && (
            <div className="text-center mt-3">
              <Spinner animation="border" size="sm" /> Sincronizando...
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {!isLoading && isValidForm() && (
            <button
              className="btn btn-secondary"
              onClick={syncData}
              disabled={!isValidForm()}
            >
              Sincronizar
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
