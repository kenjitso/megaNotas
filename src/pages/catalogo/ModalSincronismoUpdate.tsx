import { CatalogoController } from "@/datatypes/catalogo";
import React, { useState, useEffect } from "react";
import { Card, Col, ListGroup, Modal, Row, Spinner } from "react-bootstrap";
import ratata from "../../assets/megaPreco.svg";
import { isValidForm } from "@/components/utils/ValidForm";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { BsCheckCircle, BsClock, BsExclamationCircle, BsListCheck } from "react-icons/bs";

interface IProps {
  isVisible?: boolean;
  catalogos?: number;
  onHide: () => void;
}

export function ModalSincronismoUpdate({ onHide, catalogos, isVisible }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState({ total: 0, sucesso: 0, falhas: 0, restante: 0 });
  const resetSyncStatus = () => setSyncStatus({ total: 0, sucesso: 0, falhas: 0, restante: 0 });



  useEffect(() => {
    if (isVisible && isValidForm()) {
      resetSyncStatus();
      syncData();
    }
  }, [isVisible]);




  const syncData = async () => {
    if (isSyncing) {
      toast.warn("Já existe uma sincronização em andamento, aguarde.");
      return;
    }
    setIsSyncing(true);
    setIsLoading(true);
    const totalCatalogos = catalogos ?? 1;
    const chunkSize = 5;
    try {
      const currentDate = new Date();
      const isoDate = currentDate.toISOString();

      for (let i = 0; i < totalCatalogos; i += chunkSize) {
        const currentChunk = Math.min(chunkSize, totalCatalogos - i);
        const result = await CatalogoController.sync(isoDate, currentChunk);
  
        setSyncStatus(prevStatus => ({
          total: result.total,
          sucesso: prevStatus.sucesso + result.sucesso,
          falhas: prevStatus.falhas + result.falhas,
          restante: result.restante
        }));
      }

      queryClient.invalidateQueries(["catalogos"]);
      queryClient.invalidateQueries(["catalogosHome"]);
      toast.success("Dados sincronizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao sincronizar os dados.");
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
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
        onHide={() => {
          resetSyncStatus();
          onHide();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sincronizar Produtos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row >
            <Col className="d-flex" xs={2}>
              <img
                src={ratata}
                alt="Descrição da imagem"
                className="m-5"
                max-width="100%"
                max-height="100%"
                width="150px"
                height="200px"
                style={{ objectFit: "contain" }}
              />
            </Col>
            <Col>
              {isLoading && (
                <div className="text-center">
                  <Spinner animation="border" size="sm" />
                  <b>&nbsp;&nbsp;Sincronizando...</b>
                  <Row className= "d-flex justify-content-center my-3">
                    <Col sm={6} md={3}>
                      <Card body>
                        <BsListCheck className="mr-2" />
                        &nbsp;Total
                        <h5>{syncStatus.total}</h5>
                      </Card>
                    </Col>
                    <Col sm={6} md={3}>
                      <Card body className="text-success">
                        <BsCheckCircle className="mr-2" />
                        &nbsp;Sucesso
                        <h5>{syncStatus.sucesso}</h5>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col sm={6} md={3}>
                      <Card body className="text-danger">
                        <BsExclamationCircle className="mr-2" />
                        &nbsp;Falhas
                        <h5>{syncStatus.falhas}</h5>
                      </Card>
                    </Col>
                    <Col sm={6} md={3}>
                      <Card body className="text-info">
                        <BsClock className="mr-2" />
                        &nbsp;Restante
                        <h5>{syncStatus.restante}</h5>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>

        </Modal.Body>


      </Modal>
    </React.Fragment>
  );
}
