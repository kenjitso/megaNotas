import { Col, Row } from "react-bootstrap";



export function Produto() {

    interface IProdutos {
        id: string;
        nome: string;
        url_catalogo_premium: string;
        url_catalogo_classic: string;
        comissao_premium: number;
        comissao_classic: number;
        frete: number;
        preco_ml_premium: number;
        premo_ml_classic: number;
        lojas: { codigo: string, idloja: string, preco: number, ultima_atualizacao: Date }[];

    }


    return (
        <Row>
            <Col className='body'>
                <Row>
                    <Col xs className="text-center">
                        <h1>Produto Notas 15/02/2023</h1>
                    </Col>
                </Row>

            </Col>
        </Row>

    );

}