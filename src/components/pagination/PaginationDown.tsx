import { ILoja } from "@/datatypes/loja";
import { Col, Dropdown, Row } from "react-bootstrap";
import { PaginationComponent } from "./PaginationComponent";


interface IProps {
    pageLimitSize: number;
    handlePageChange: (page: number, limit: number) => void;
    itemsTotal: number;
    currentPage: number;
    itemsLength: number;

}




export const PaginationDown = ({ handlePageChange, itemsTotal, pageLimitSize, currentPage, itemsLength }: IProps) => {

    const onPageChangeWrapper = (page: number) => {
        handlePageChange(page, pageLimitSize);
    }

    return (

        <Row className="my-3">
            <Col xs className="d-flex">
                <PaginationComponent<ILoja>
                    items={itemsTotal}
                    pageSize={pageLimitSize}
                    onPageChange={onPageChangeWrapper}
                    currentPage={currentPage ?? 1}

                />


                <Col className="ml-auto mx-3">
                    <Dropdown > Exibir
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-1 limitPagination">
                            {pageLimitSize}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 20)}>20</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 50)}>50</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 100)}>100</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 200)}>200</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 400)}>400</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 800)}>800</Dropdown.Item>
                        </Dropdown.Menu>
                        resultados por página
                    </Dropdown>
                </Col>

                <span className="ml-2">Mostrando de {itemsLength} até {pageLimitSize} de {itemsTotal}</span>
            </Col>
        </Row>
    )

}
