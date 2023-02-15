import { Freteiro } from "@/pages/freteiro/Freteiro";
import { Historico } from "@/pages/historico/Historico";
import { Home } from "@/pages/home/Home";
import { Loja } from "@/pages/loja/Loja";
import { Produto } from "@/pages/produto/Produto";
import { BrowserRouter, Routes, Route } from "react-router-dom";



interface props {
    children: React.ReactNode;
}

export function Rotas({ children }: props) {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/freteiro" element={<Freteiro />} />
                <Route path="/produto" element={<Produto />} />
                <Route path="/historico" element={<Historico />} />


            </Routes>
        </BrowserRouter>
    );
}

