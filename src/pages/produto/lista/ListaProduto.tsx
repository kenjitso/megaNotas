import { paginationComponent } from "@/components/pagination/PaginationComponent";
import { DataFetcher, IProduct } from "@/datas/data_utils";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { menuProduto } from "../MenuProduto";
import "./CssProducts.css";

export function ListaProduto() {

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
                        <h1>Produto Lista Notas 15/02/2023</h1>

                    </Col>
                </Row>
                <Row className="menuProduto border">
                    {menuProduto()}
                </Row>

                <Row >
                    {tableProduto(listProduto(), 4, 8)}
                </Row>
                <Row>
                    {paginationComponent(listProduto(), 4)}
                </Row>




            </Col>
        </Row>

    );

}

function tableProduto(listProduct: IProduct[] | null, currentPage: number, pageSize: number) {


    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortPrice, setSortPrice] = useState<"asc" | "desc">("asc");
    const [showPrice, setShowPrice] = useState(true);


    const handleSortOrder = () => {
        setSortPrice("asc");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleSortPrice = () => {
        setSortOrder("asc");
        setSortPrice(sortPrice === "asc" ? "desc" : "asc");
    };

    const sortList = (list: IProduct[]) => {
        return list.sort((a, b) => {
            if (sortOrder === "asc") {
                if (sortPrice === "asc") {
                    return parseFloat(a.preco.replace(",", ".")) - parseFloat(b.preco.replace(",", "."));
                } else {
                    return parseFloat(b.preco.replace(",", ".")) - parseFloat(a.preco.replace(",", "."));
                }
            } else {
                return a.nome.localeCompare(b.nome);
            }
        });
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID:</th>
                    <th>
                        Nome:{" "}
                        <Button type="button" onClick={handleSortOrder}>
                            {sortOrder === "asc" ? "▲" : "▼"}
                        </Button>
                    </th>
                    <th>Descrição:</th>
                    {showPrice && (
                        <th>
                            Preço:{" "}
                            <Button type="button" onClick={handleSortPrice}>
                                {sortPrice === "asc" ? "▲" : "▼"}
                            </Button>
                        </th>
                    )}
                    <th>Categoria: </th>
                </tr>
            </thead>
            <tbody>
                {listProduct
                    ? sortList(listProduct)
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .concat(
                            Array.from(
                                { length: pageSize - (listProduct.length - (currentPage - 1) * pageSize) },
                                (_, i) => ({
                                    id: "",
                                    nome: "",
                                    descricao: "",
                                    preco: "",
                                    categoria: "",
                                })
                            ) as unknown as IProduct[]
                        )
                        .map((product, index) => (
                            <tr key={index}>
                                <td><b>{product.id}</b></td>
                                <td><b>{product.nome}</b></td>
                                <td><b>{product.descricao}</b></td>
                                {showPrice && <td><b>{product.preco}</b></td>}
                                <td><b>{product.categoria}</b></td>
                            </tr>
                        ))
                    : null}
            </tbody>
        </Table>

    );

}


function listProduto() {
    const [listProduct, setListProduct] = useState<IProduct[] | null>(null);

    useEffect(() => {
        const dataFetcher = new DataFetcher<IProduct>("http://localhost:5002/listProducts", "GET");

        dataFetcher.getList().then((returnData) => {
            setListProduct(returnData);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    return (listProduct);
}
