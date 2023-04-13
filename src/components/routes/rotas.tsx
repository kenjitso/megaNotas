
import { PageHome } from "@/pages/home/PageHome";
import { PaginaNaoEncontrada } from "@/pages/notFoundPage/notFoundPage";
import { Routes, Route } from "react-router-dom";
import PageUsuario from "@/pages/usuario/PageUsuario";
import { PageFreteiro } from "@/pages/freteiro/PageFreteiro";
import { PageLoja } from "@/pages/loja/PageLoja";
import { PageCatalogo } from "@/pages/catalogo/PageCatalogo";
import { PageProdutoLoja } from "@/pages/loja/ProdutoLoja/PageProdutoLoja";



export function Rotas() {
  return (
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
  );
}