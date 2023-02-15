import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function menuProduto() {


    const navigate = useNavigate();

    const handleClickregisterProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/cadastroProduto");
    }

    const handleClicklistProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/listaProduto");
    }

    return (
        <Navbar bg="light">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={handleClicklistProduct}>Lista de Produtos</Nav.Link>
                    <Nav.Link onClick={handleClickregisterProduct}>Cadastrar Produto</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}