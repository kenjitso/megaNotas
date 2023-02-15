import { Col, Row } from "react-bootstrap";

interface ILoja {
    id: string;
    nome: string;
    cotacao: number;
    freteiro: string[];
    url_cotacao: string;
    url_catalogo: string;
}

export function Loja() {


    return (
        <Row>
            <Col className='body'>
                <Row>
                    <Col xs className="text-center">
                        <h1>Loja 15/02/2023</h1>
                    </Col>
                </Row>

            </Col>
        </Row>

    );

}