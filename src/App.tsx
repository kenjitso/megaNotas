import React from "react";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { MenuMega } from "./pages/MenuMega";



export default function App() {


    return (
        <React.Fragment>
            <ToastContainer />
            <Container>
                <MenuMega>

                </MenuMega>
            </Container>
        </React.Fragment>
    );
}

