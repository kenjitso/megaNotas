import { Col, Row } from "react-bootstrap";
import { menuProduto } from "../MenuProduto";

export function CadastroProduto() {

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
            <Col className='body text-center'>
                <Row>
                    <Col>
                        <h1>Cadastra Produto 15/02/2023</h1>

                    </Col>
                </Row>
                <Row className="menuProduto border">
                    {menuProduto()}
                </Row>

                <Row className="menuProduto border">
                    {cadastroProduto()}
                </Row>
            </Col>
        </Row>

    );

}


function cadastroProduto() {


    return (<></>);

}