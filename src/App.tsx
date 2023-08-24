import React, { Suspense} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FragmentLoading from "./components/fragments/FragmentLoading";



const delayImport = (importFunc: () => Promise<any>, delay = 500): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(importFunc());
        }, delay);
    });
};


const PageHome = React.lazy(() => delayImport(() => import("@/pages/home/PageHome")));
const PaginaNaoEncontrada = React.lazy(() => delayImport(() => import("@/pages/notFoundPage/notFoundPage")));
const PageUsuario = React.lazy(() => delayImport(() => import("@/pages/usuario/PageUsuario")));
const PageFreteiro = React.lazy(() => delayImport(() => import("@/pages/freteiro/PageFreteiro")));
const PageLoja = React.lazy(() => delayImport(() => import("@/pages/loja/PageLoja")));
const PageCatalogo = React.lazy(() => delayImport(() => import("@/pages/catalogo/PageCatalogo")));
const PageProdutoLoja = React.lazy(() => delayImport(() => import("@/pages/loja/ProdutoLoja/PageProdutoLoja")));

export default function App() {
  
    return (
        <React.Fragment >
            <ToastContainer />
            <BrowserRouter>
                <Suspense fallback={
                    <div className="centralized-loading">
                        <FragmentLoading />
                    </div> }>

                    <Routes>
                        <Route path="/" element={<PageUsuario />} >
                            <Route path="/" element={<PageHome />} />
                            <Route path="/:page" element={<PageHome />} />
                            <Route path="/freteiro" element={<PageFreteiro />} />
                            <Route path="/freteiros/:page" element={<PageFreteiro />} />
                            <Route path="/lojas" element={<PageLoja />} />
                            <Route path="/lojas/:lojaId" element={<PageLoja />} />
                            <Route path="/lojas/:lojaId/produtos/:page" element={<PageProdutoLoja />} />
                            <Route path="/catalogos" element={<PageCatalogo />} />
                            <Route path="/catalogos/:page" element={<PageCatalogo />} />
                            <Route path="*" element={<PaginaNaoEncontrada />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </React.Fragment>
    );
}

