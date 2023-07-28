import { ILoja } from "@/datatypes/loja";
import { Col, Dropdown, Row } from "react-bootstrap";
import { PaginationComponent } from "./PaginationComponent";


interface IProps {
    pageLimitSize: number;
    handlePageChange: (page: number, limit: number) => void;
    itemsTotal: number;
    itemsLength: number;

}




export const PaginationUp = ({ handlePageChange, itemsTotal, pageLimitSize, itemsLength }: IProps) => {


    return (

        <Row className="my-2">
            <Col xs={10}>
                <Dropdown >Exibir
                    <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-1 limitPagination">
                        {pageLimitSize}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu">
                        <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 20)}>20</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 50)}>50</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 100)}>100</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 200)}>200</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 400)}>400</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 800)}>800</Dropdown.Item>
                    </Dropdown.Menu>
                    resultados por página
                </Dropdown>
            </Col>
            <Col xs={2} className="justify-content-end text-right">
                Mostrando de {itemsLength} até {pageLimitSize} de {itemsTotal}
            </Col>
        </Row>

    )

}
