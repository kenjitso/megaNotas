import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { CatalogoController } from "@/datatypes/catalogo";

export async function otherSearchAtacadoGames(produto: IProdutoLoja) {

    let catalogo;

    //IPHONE
    if (produto.nome.trim().toUpperCase() === "IPHONE 12 A2402 3J") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 12 " + produto.capacidade + " " + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 12 A2403 LE" && produto.cor.trim().toUpperCase() === "ROXO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 12 (128 GB) - Roxo");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 A2882 HN" && produto.cor.trim().toUpperCase() === "BRANCO") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 (128 GB) - Estelar");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 AA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus " + " " + produto.capacidade + " " + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 BE" && produto.cor.trim().toUpperCase() === "AMARELO" && produto.capacidade === 256) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus "+ produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 BE" && produto.cor.trim().toUpperCase() === "AMARELO" && produto.capacidade === 128) catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus "+ produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 HN") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Plus " + produto.capacidade + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO A2892 CH") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro " + produto.capacidade + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2651") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + produto.cor);
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2651" && produto.cor.trim().toUpperCase() === "PRATA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + "PRATEADO");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2893 3J" && produto.cor.trim().toUpperCase() === "PRATA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + "PRATEADO");
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2896 CH" && produto.cor.trim().toUpperCase() === "PRATA") catalogo = await CatalogoController.searchCatalogoML("Apple iPhone 14 Pro Max " + produto.capacidade + "PRATEADO");

    //XIAOMI
    if (produto.nome.trim().toUpperCase() === "POCO M5") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco M5 (5 Mpx) Dual SIM");
    if (produto.nome.trim().toUpperCase() === "POCO X5") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco X5 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "POCO X5 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco X5 Pro 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI 12") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 12");
    if (produto.nome.trim().toUpperCase() === "REDMI 12C") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 12C Dual SIM 128 GB ocean blue 6 GB RAM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 10 LITE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi note 10 lite Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 10 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 10 Pro");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11 PRO+" && produto.cor.toUpperCase() === "VERDE") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11 Pro+ 5G (MediaTek) Dual SIM 256 GB verde 8 GB RAM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11 PRO+" && produto.cor.toUpperCase() === "PRETO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11 Pro+ 5G (MediaTek) Dual SIM 256 GB preto 8 GB RAM");
   
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11S" && produto.rede === 5) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11S 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 11S" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 11S Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12" && produto.rede === 5) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12" && produto.rede === 5 && produto.cor) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 4G Dual SIM "+produto.capacidade+"GB "+produto.cor+" "+produto.ram+" GB");
    if (produto.nome.trim().toUpperCase() === "POCO C40") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco C40 Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI A1") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi A1 2022 Dual SIM " + produto.capacidade + " GB "+ produto.ram + " GB");
    
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.rede === 5) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM "+produto.capacidade+"GB "+produto.ram+"GB ");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.cor === "AZUL" && produto.rede === 5) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro 5G Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro Dual SIM "+produto.capacidade+"GB "+produto.ram+"GB ");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO" && produto.cor === "AZUL" && produto.rede === 4) catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro Dual SIM");
   
   
   
    if (produto.nome.trim().toUpperCase() === "POCO F3") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Poco F3 5G Dual SIM "+produto.capacidade+"GB "+produto.ram+"GB ");
    if (produto.nome.trim().toUpperCase() === "REDMI NOTE 12 PRO PLUS" && produto.rede === 5 && produto.capacidade === 256 && produto.cor === "AZUL") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi Note 12 Pro+ 5G Dual SIM 256 GB iceberg blue 8 GB RAM");
    if (produto.nome.trim().toUpperCase() === "POCO C55") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Poco C55 Dual SIM");
    if (produto.nome.trim().toUpperCase() === "REDMI 10A") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Redmi 10A Dual SIM");
    if (produto.nome.trim().toUpperCase() === "POCO M4 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Pocophone Poco M4 Pro Dual SIM");
    if (produto.nome.trim().toUpperCase() === "POCO X4 PRO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi Poco X4 Pro Dual Sim"); 
    if (produto.nome.trim().toUpperCase() === "13 PRO" && produto.cor === "PRETO") catalogo = await CatalogoController.searchCatalogoML("Xiaomi 13 Pro ceramic black 12 GB RAM");
    
    
    if (!catalogo) catalogo = await CatalogoController.searchCatalogoML(produto.marca + " " + produto.nome + " " + produto.cor + " " + produto.ram + " " + produto.capacidade);

    return catalogo;
}