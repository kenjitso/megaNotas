import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { CatalogoController } from "@/datatypes/catalogo";

export async function otherSearch(produto: IProdutoLoja) {

    let catalogo;

    //IPHONE
    if (produto.nome.trim().toUpperCase() === "IPHONE 11 PRO MAX" && produto.cor.trim().toUpperCase() === "CINZA") catalogo = await CatalogoController.searchCatalogoML("11 Pro Max" + produto.capacidade + " GB  CINZA-ESPACIAL");
    if (produto.nome.trim().toUpperCase() === "IPHONE 11 PRO MAX") catalogo = await CatalogoController.searchCatalogoML("11 Pro Max " + produto.capacidade + " GB " + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14" &&  produto.cor.trim().toUpperCase() === "PRETO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 ("+produto.capacidade+" GB) - MEIA-NOITE");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO" && produto.capacidade === 1024) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro (1 TB) - "+produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX" && produto.capacidade === 1024) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max (1 TB) - "+produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS") catalogo = await CatalogoController.searchCatalogoML("AApple iPhone 14 Plus ("+produto.capacidade+" GB) - Estelar");

    //SAMSUNG
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A03") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB " + produto.cor + " " + produto.ram + "GB RAM");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A23" && produto.cor.trim().toUpperCase() === "BRANCO") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB " + " AWESOME WHITE " + produto.ram + "GB RAM");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A23" && produto.cor.trim().toUpperCase() === "AZUL") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB " + " AWESOME BLUE " + produto.ram + "GB RAM");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A23" && produto.cor.trim().toUpperCase() === "PRETO") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB " + " AWESOME BLACK " + produto.ram + "GB RAM");

    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A34" && produto.cor.trim().toUpperCase() === "VERDE") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.rede + "G DUAL SIM " + produto.capacidade + "GB " + " VERDE LIMA " + produto.ram + "GB RAM");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A34" && produto.cor.trim().toUpperCase() === "ROXO") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.rede + "G " + produto.capacidade + "GB " + produto.ram + "GB RAM VIOLETA");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A54" && produto.cor.trim().toUpperCase() === "PRETO") catalogo = await CatalogoController.searchCatalogoML("CELULAR A54 5G "+produto.ram+" "+produto.capacidade+" PRETO");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A54" && produto.cor.trim().toUpperCase() === "LIME") catalogo = await CatalogoController.searchCatalogoML("CELULAR A54 5G "+produto.ram+" "+produto.capacidade+" VERDE");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A54" && produto.cor.trim().toUpperCase() === "ROXO") catalogo = await CatalogoController.searchCatalogoML("CELULAR A54 5G "+produto.ram+" "+produto.capacidade+" VIOLETA");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY S23" && produto.cor.trim().toUpperCase() === "BRANCO") catalogo = await CatalogoController.searchCatalogoML("SAMSUNG GALAXY S23 5G "+produto.ram+" "+produto.capacidade+" CREME");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY S23" && produto.cor.trim().toUpperCase() === "VERDE") catalogo = await CatalogoController.searchCatalogoML("SAMSUNG GALAXY S23 DUAL SIM "+produto.capacidade+"GB VERDE "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY S23 ULTRA" && produto.cor.trim().toUpperCase() === "BRANCO") catalogo = await CatalogoController.searchCatalogoML("Samsung Galaxy S23 Ultra Dual SIM "+produto.capacidade+" GB creme "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY Z FOLD 5" && produto.cor.trim().toUpperCase() === "AZUL") catalogo = await CatalogoController.searchCatalogoML("Smartphone Samsung Galaxy Z Fold5 "+produto.rede+"G , "+produto.capacidade+"tb, "+produto.ram+"gb Ram, Tela Infinita De 7.6 Azul");
         
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A34") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.rede + "G DUAL SIM " + produto.capacidade + "GB " + produto.cor + " " + produto.ram + "GB RAM");

    // XIAOMI
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "12X") catalogo = await CatalogoController.searchCatalogoML("Xiaomi 12X Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F4") catalogo = await CatalogoController.searchCatalogoML("Pocophone Poco F4 Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5") catalogo = await CatalogoController.searchCatalogoML("Pocophone Poco F5 Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M5S") catalogo = await CatalogoController.searchCatalogoML("Pocophone Poco M5S Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO X5 PRO") catalogo = await CatalogoController.searchCatalogoML("Pocophone Poco X5 Pro Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10") catalogo = await CatalogoController.searchCatalogoML("REDMI 10 2022 DUAL SIM 4G" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10 2022") catalogo = await CatalogoController.searchCatalogoML("REDMI 10 2022 DUAL SIM 4G" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10A") catalogo = await CatalogoController.searchCatalogoML("REDMI 10A " + produto.rede + " Dual Sim " + produto.capacidade + " " + produto.cor + " " + produto.ram);
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10C") catalogo = await CatalogoController.searchCatalogoML("REDMI 10C " + produto.rede + " Dual Sim " + produto.capacidade + " " + produto.cor + " " + produto.ram);
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 9C") catalogo = await CatalogoController.searchCatalogoML("REDMI 9C " + produto.rede + "G " + produto.capacidade + " " + produto.cor + " " + produto.ram);
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI A2+") catalogo = await CatalogoController.searchCatalogoML("REDMI A2+ " + produto.rede + "G " + produto.capacidade + " " + produto.cor + " " + produto.ram);
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "12 PRO" && produto.cor.trim().toUpperCase() === "ROXO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi 12 Pro " + produto.rede + "G " + "Dual SIM " + produto.capacidade + " GB " + "PURPLE " + produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13" && produto.cor.trim().toUpperCase() === "VERDE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi 13 Dual SIM "+produto.capacidade+" GB flora green "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 LITE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi 13 LITE Dual SIM "+produto.capacidade+" GB "+produto.cor+" "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 PRO" && produto.cor.trim().toUpperCase() === "PRETO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi 13 PRO Dual SIM "+produto.capacidade+" GB CERAMIC BLACK "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 ULTRA" && produto.cor.trim().toUpperCase() === "PRETO" && produto.capacidade === 1024 ) catalogo = await CatalogoController.searchCatalogoML("Xiaomi 13 ULTRA Dual SIM 1 TB BLACK "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 ULTRA" && produto.cor.trim().toUpperCase() === "VERDE" && produto.capacidade === 1024 ) catalogo = await CatalogoController.searchCatalogoML("Xiaomi 13 ULTRA Dual SIM 1 TB GREEN "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5 PRO" && produto.cor.trim().toUpperCase() === "BRANCO" && produto.capacidade === 256 ) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Poco F5 Pro Dual SIM 256 GB white 8 GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5 PRO" && produto.cor.trim().toUpperCase() === "PRETO" && produto.capacidade === 256 ) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Poco F5 Pro Dual SIM 256 GB white GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5 PRO" && produto.cor.trim().toUpperCase() === "PRETO" && produto.capacidade === 512 ) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Poco F5 Pro Dual SIM 256 GB white GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M4") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco M4 "+produto.rede+"G Dual SIM "+produto.capacidade+"GB "+produto.cor+" "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M4 PRO" && produto.cor.trim().toUpperCase() === "PRETO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco M4 Pro Dual SIM "+produto.capacidade+" GB black "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M5" && produto.cor.trim().toUpperCase() === "PRETO" && produto.ram === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco M5 (5 Mpx) Dual SIM "+produto.capacidade+" GB black 4 GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M5S") catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome.trim() + " DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + " GB " + produto.capacidade + "GB");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO X4 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco X4 PRO (5 Mpx) DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + " GB " + produto.capacidade + "GB");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO X5") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco X5 DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + " GB " + produto.capacidade + "GB");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 11 PRIME" && produto.cor.trim().toUpperCase() === "VERDE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 11 Prime "+produto.rede+"G Dual SIM "+produto.capacidade+"GB meadow green "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 11 PRIME" && produto.cor.trim().toUpperCase() === "CINZA") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 11 Prime "+produto.rede+"G Dual SIM "+produto.capacidade+"GB CHROME SILVER "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 12" && produto.cor.trim().toUpperCase()==="CINZA") catalogo = await CatalogoController.searchCatalogoML("XIAOMI REDMI 12 DUAL SIM 4G cinza 4GB 128GB");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 12" && produto.cor.trim().toUpperCase()==="PRETO") catalogo = await CatalogoController.searchCatalogoML("XIAOMI REDMI 12 DUAL SIM 4G PRETO 4GB 128GB");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 12C" && produto.cor.trim().toUpperCase()==="ROXO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 12C Dual SIM "+produto.capacidade+" GB PURPLE "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 10"&& produto.cor.trim().toUpperCase()==="PRETO") catalogo = await CatalogoController.searchCatalogoML("xiaomi Redmi Note 10 Pro Dual Sim "+produto.capacidade+" Gb ONYX GRAY "+produto.ram+"Gb Ram");
     if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 11 PRO+") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11 Pro+ 5G (MediaTek) Dual SIM "+produto.capacidade+" GB "+produto.cor+" "+produto.ram+" GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 11S") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11S Dual SIM 128 GB "+produto.cor+" 6 GB RAM");
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 12") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 "+produto.rede+" Dual SIM "+produto.capacidade+" GB "+produto.cor+" "+produto.ram+" GB RAM");
   
   

    

   
    if (!catalogo) {
        try {
            console.log("Pesquisando: " + produto.marca + " " + produto.nome.trim() + " DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + "GB " + produto.capacidade + "GB");
            catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome.trim() + " DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + "GB " + produto.capacidade + "GB");
        } catch (error) {
         
            console.log("Erro 500 aqui, enviando null para continuar o sistema.");
            catalogo = null

        }
    }
    return catalogo;
}