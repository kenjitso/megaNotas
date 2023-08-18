import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { CatalogoController } from "@/datatypes/catalogo";

export async function otherSearchSmartWatch(produto: IProdutoLoja) {

    let catalogo;

    if (produto.nome.trim().toUpperCase() === "WATCH SE" && produto.cor.trim().toUpperCase() === "MIDNIGHT") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome.trim() + " MEIA-NOITE " + produto.caixaMedida);
    if (produto.nome.trim().toUpperCase() === "AMAZFIT BIP 3 PRO" && produto.cor.trim().toUpperCase() === "CREAM") catalogo = await CatalogoController.searchCatalogoML("Amazfit Bip 3 Pro 1.69 caixa de plástico creme, pulseira cream");


    if (!catalogo) {
        try {
            console.log(produto.marca + " " + produto.nome.trim() + " " + produto.tipoPulseira + " " + produto.cor + " " + produto.caixaMedida);
            catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome.trim() + " " + produto.tipoPulseira + " " + produto.cor + " " + produto.caixaMedida);
        } catch (error) {

            console.log("Erro 500 aqui, enviando null para continuar o sistema.");
            catalogo = null

        }
    }
    return catalogo;
}