import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Rotas } from "./components/routes/rotas";

export default function App() {


    return (
        <React.Fragment >
            <ToastContainer />
            <BrowserRouter>
                <Rotas />
            </BrowserRouter>
        </React.Fragment>
    );
}

