import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Rotas } from "./components/routes/rotas";
import { PageCatalogo } from "./pages/catalogo/PageCatalogo";
import { PageFreteiro } from "./pages/freteiro/PageFreteiro";
import { PageHome } from "./pages/home/PageHome";
import { PageLoja } from "./pages/loja/PageLoja";
import { PageProdutoLoja } from "./pages/loja/ProdutoLoja/PageProdutoLoja";
import { PaginaNaoEncontrada } from "./pages/notFoundPage/notFoundPage";
import PageUsuario from "./pages/usuario/PageUsuario";
import { SelectedIdProvider } from "./context/SelectedIdContext";

export default function App() {


    return (
        <React.Fragment >
            <ToastContainer />
            <BrowserRouter>
                <SelectedIdProvider>
                    <Routes>
                        <Route path="/" element={<PageUsuario />} >
                            <Route path="/" element={<PageHome />} />
                            <Route path="/:page" element={<PageHome />} />
                            <Route path="/freteiro" element={<PageFreteiro />} />
                            <Route path="/freteiros/:page" element={<PageFreteiro />} />
                            <Route path="/lojas" element={<PageLoja />} />
                            <Route path="/lojas/:lojaId" element={<PageProdutoLoja />} />
                            <Route path="/lojas/:lojaId/produtos/:page" element={<PageProdutoLoja />} />
                            <Route path="/catalogos" element={<PageCatalogo />} />
                            <Route path="/catalogos/:page" element={<PageCatalogo />} />
                            <Route path="*" element={<PaginaNaoEncontrada />} />
                        </Route>
                    </Routes>
                </SelectedIdProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

