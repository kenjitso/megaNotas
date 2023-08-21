import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export async function otherSearchSmartWatch(produto: IProdutoLoja) {

    let searchFiltro;

    if (produto.nome.trim().toUpperCase() === "WATCH SE" && produto.cor.trim().toUpperCase() === "MIDNIGHT") searchFiltro = (produto.marca + " " + produto.nome.trim() + " MEIA-NOITE " + produto.caixaMedida);
    if (produto.nome.trim().toUpperCase() === "AMAZFIT BIP 3 PRO" && produto.cor.trim().toUpperCase() === "CREAM") searchFiltro = ("Amazfit Bip 3 Pro 1.69 caixa de plástico creme, pulseira cream");

    searchFiltro = (produto.marca + " " + produto.nome.trim() + " " + produto.tipoPulseira + " " + produto.cor + " " + produto.caixaMedida);


    return searchFiltro;
}