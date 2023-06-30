import { CatalogoController } from "@/datatypes/catalogo";
import React, { useState, useEffect } from "react";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { isValidForm } from "@/components/utils/ValidForm";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isVisible?: boolean;
  catalogos?: number;
  onHide: () => void;
}

export function ModalLoadingUpdate({ onHide, catalogos, isVisible }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries(["catalogos"]);
      queryClient.invalidateQueries(["catalogosHome"]);
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
            <Col xs={2}>
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
            <Col  >
            {isLoading && (
            <div className="text-center mt-3">
              <Spinner animation="border" size="sm" /> <b>Sincronizando...</b>
            </div>
          )}
            </Col>
          </Row>
        
        </Modal.Body>


      </Modal>
    </React.Fragment>
  );
}
