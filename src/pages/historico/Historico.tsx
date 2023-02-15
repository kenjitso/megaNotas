import { Col, Row } from "react-bootstrap";



export function Historico() {

    interface IHistorico {
        id: string;
        idproduto: string;
        data: Date;
        preco_ml_premium: number;
        preco_ml_classic: number;
        lojas: { codigo: string, idloja: string, preco: number, ultima_atualizacao: Date }[];
    }

    return (
        <Row>
            <Col className='body'>
                <Row>
                    <Col xs className="text-center">
                        <h1>Historico 15/02/2023</h1>
                    </Col>
                </Row>

            </Col>
        </Row>

    );

}