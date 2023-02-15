import { Col, Row } from "react-bootstrap";


interface IFreteiro {
    id: string;
    nome: string;
    fixo: number;
    percentual: number;
    prioridade: number;
    valor_min: number;
    valor_max: number;
    global: boolean;
}


export function Freteiro() {


    return (
        <Row>
            <Col className='body'>
                <Row>
                    <Col xs className="text-center">
                        <h1>Freteiro 15/02/2023</h1>
                    </Col>
                </Row>

            </Col>
        </Row>

    );

}