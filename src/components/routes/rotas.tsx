import { CadastroFreteiro } from "@/pages/freteiro/cadastro/CadastroFreteiro";
import { ListaFreteiro } from "@/pages/freteiro/lista/ListaFreteiro";
import { CadastroLoja } from "@/pages/loja/cadastro/CadastroLoja";
import { ListaLoja } from "@/pages/loja/lista/ListaLoja";
import { MenuMega } from "@/pages/MenuMega";
import { PaginaNaoEncontrada } from "@/pages/notFoundPage/notFoundPage";
import { CadastroProduto } from "@/pages/produto/cadastro/CadastroProduto";
import { ListaProduto } from "@/pages/produto/lista/ListaProduto";
import { Routes, Route } from "react-router-dom";

export function Rotas() {
  return (
    <MenuMega>
      <Routes>
        <Route path="/" element={<ListaLoja />} />

        <Route path="/freteiro" element={<ListaFreteiro />} />
        <Route path="/freteiros/:id" element={<CadastroFreteiro />} />
        <Route path="/freteiro/novo" element={<CadastroFreteiro />} />

        <Route path="/lojas" element={<ListaLoja />} />
        <Route path="/lojas/:id" element={<CadastroLoja />} />
        <Route path="/lojas/novo" element={<CadastroLoja />} />

        <Route path="/produtos" element={<ListaProduto />} />
        <Route path="/produtos/:id" element={<CadastroProduto />} />
        <Route path="/produtos/novo" element={<CadastroProduto />} />

        <Route path="*" element={<PaginaNaoEncontrada />} />

      </Routes>
    </MenuMega>
  );
}