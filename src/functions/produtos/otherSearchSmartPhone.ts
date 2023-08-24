import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export interface ICatalogoItem {
    codigo_catalogo: string;
    nome: string;
    url_Imagem: string | null;
    marca: string | null | undefined;
    modelo: string | null | undefined;
    cor: string | null | undefined;
    memoriaInterna: string | null | undefined;
    memoriaRam: string | null | undefined;
    mobileNetwork: string | null | undefined;
    caixaMedida: string | null | undefined;
    corPulseira: string | null | undefined;
    tipoPulseira: string | null | undefined;
}

export interface SearchResponse {
    catalogo: ICatalogoItem[] | null;
    searchFiltro: string;
}

export async function otherSearchSmartPhone(produto: IProdutoLoja) {
    let searchFiltro = "";

    if (produto.nome.trim().toUpperCase() === "IPHONE 11 PRO MAX" && produto.cor.trim().toUpperCase() === "CINZA") searchFiltro = "11 Pro Max" + produto.capacidade + " GB  CINZA-ESPACIAL";
  
    //IPHONE
    if (produto.nome.trim().toUpperCase() === "IPHONE 11 PRO MAX" && produto.cor.trim().toUpperCase() === "CINZA") searchFiltro = "11 Pro Max" + produto.capacidade + " GB  CINZA-ESPACIAL";
    if (produto.nome.trim().toUpperCase() === "IPHONE 11 PRO MAX") searchFiltro = "11 PRO MAX " + produto.capacidade + " GB " + produto.cor.toUpperCase();
    if (produto.nome.trim().toUpperCase() === "IPHONE 14" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = "APPLE IPHONE 14 (" + produto.capacidade + " GB) - MEIA-NOITE";
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO" && produto.capacidade === 1024) searchFiltro = "APPLE IPHONE 14 PRO (1 TB) - " + produto.cor.toUpperCase();
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX" && produto.capacidade === 1024) searchFiltro = "APPLE IPHONE 14 PRO MAX (1 TB) - " + produto.cor.toUpperCase();
    if (produto.nome.trim().toUpperCase() === "IPHONE 14 PLUS") searchFiltro = "APPLE IPHONE 14 PLUS (" + produto.capacidade + " GB) - ESTELAR";

    //SAMSUNG
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A03") searchFiltro = produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB " + produto.cor + " " + produto.ram + "GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A23" && produto.cor.trim().toUpperCase() === "BRANCO") searchFiltro = produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB AWESOME WHITE " + produto.ram + "GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A23" && produto.cor.trim().toUpperCase() === "AZUL") searchFiltro = produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB AWESOME BLUE " + produto.ram + "GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A23" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = produto.marca + " " + produto.nome + "DUAL SIM " + produto.capacidade + "GB AWESOME BLACK " + produto.ram + "GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A34" && produto.cor.trim().toUpperCase() === "VERDE") searchFiltro = produto.marca + " " + produto.nome + " " + produto.rede + "G DUAL SIM " + produto.capacidade + "GB VERDE LIMA " + produto.ram + "GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A34" && produto.cor.trim().toUpperCase() === "ROXO") searchFiltro = produto.marca + " " + produto.nome + " " + produto.rede + "G " + produto.capacidade + "GB " + produto.ram + "GB RAM VIOLETA";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A54" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = "CELULAR A54 5G " + produto.ram + " " + produto.capacidade + " PRETO";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A54" && produto.cor.trim().toUpperCase() === "LIME") searchFiltro = "CELULAR A54 5G " + produto.ram + " " + produto.capacidade + " VERDE";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY A54" && produto.cor.trim().toUpperCase() === "ROXO") searchFiltro = "CELULAR A54 5G " + produto.ram + " " + produto.capacidade + " VIOLETA";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY S23" && produto.cor.trim().toUpperCase() === "BRANCO") searchFiltro = "SAMSUNG GALAXY S23 5G " + produto.ram + " " + produto.capacidade + " CREME";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY S23" && produto.cor.trim().toUpperCase() === "VERDE") searchFiltro = "SAMSUNG GALAXY S23 DUAL SIM " + produto.capacidade + "GB VERDE " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY S23 ULTRA" && produto.cor.trim().toUpperCase() === "BRANCO") searchFiltro = "SAMSUNG GALAXY S23 ULTRA DUAL SIM " + produto.capacidade + " GB CREME " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "GALAXY Z FOLD 5" && produto.cor.trim().toUpperCase() === "AZUL") searchFiltro = "SMARTPHONE SAMSUNG GALAXY Z FOLD5 " + produto.rede + " , " + produto.capacidade + "TB, " + produto.ram + "GB RAM, TELA INFINITA DE 7.6 AZUL";
    if (produto.marca.trim().toUpperCase() === "SAMSUNG" && produto.nome.trim().toUpperCase() === "A34") searchFiltro = produto.marca + " " + produto.nome + " " + produto.rede + "G DUAL SIM " + produto.capacidade + "GB " + produto.cor + " " + produto.ram + "GB RAM";

    // XIAOMI
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "12X") searchFiltro = "Xiaomi 12X Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F4") searchFiltro = "Pocophone Poco F4 Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5") searchFiltro = "Pocophone Poco F5 Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M5S") searchFiltro = "Pocophone Poco M5S Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO X5 PRO") searchFiltro = "Pocophone Poco X5 Pro Dual SIM" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10") searchFiltro = "REDMI 10 2022 DUAL SIM 4G" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10 2022") searchFiltro = "REDMI 10 2022 DUAL SIM 4G" + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10A") searchFiltro = "REDMI 10A " + produto.rede + " Dual Sim " + produto.capacidade + " " + produto.cor + " " + produto.ram;
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 10C") searchFiltro = "REDMI 10C " + produto.rede + " Dual Sim " + produto.capacidade + " " + produto.cor + " " + produto.ram;
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 9C") searchFiltro = "REDMI 9C " + produto.rede + "G " + produto.capacidade + " " + produto.cor + " " + produto.ram;
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI A2+") searchFiltro = "REDMI A2+ " + produto.rede + "G " + produto.capacidade + " " + produto.cor + " " + produto.ram;
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "12 PRO" && produto.cor.trim().toUpperCase() === "ROXO") searchFiltro = "Xiaomi 12 Pro " + produto.rede + "G " + "Dual SIM " + produto.capacidade + " GB " + "PURPLE " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13" && produto.cor.trim().toUpperCase() === "VERDE") searchFiltro = "Xiaomi 13 Dual SIM " + produto.capacidade + " GB flora green " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 LITE") searchFiltro = "Xiaomi 13 LITE Dual SIM " + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 PRO" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = "Xiaomi 13 PRO Dual SIM " + produto.capacidade + " GB CERAMIC BLACK " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 ULTRA" && produto.cor.trim().toUpperCase() === "PRETO" && produto.capacidade === 1024) searchFiltro = "Xiaomi 13 ULTRA Dual SIM 1 TB BLACK " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "13 ULTRA" && produto.cor.trim().toUpperCase() === "VERDE" && produto.capacidade === 1024) searchFiltro = "Xiaomi 13 ULTRA Dual SIM 1 TB GREEN " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5 PRO" && produto.cor.trim().toUpperCase() === "BRANCO" && produto.capacidade === 256) searchFiltro = "Xiaomi Poco F5 Pro Dual SIM 256 GB white 8 GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5 PRO" && produto.cor.trim().toUpperCase() === "PRETO" && produto.capacidade === 256) searchFiltro = "Xiaomi Poco F5 Pro Dual SIM 256 GB black 8 GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO F5 PRO" && produto.cor.trim().toUpperCase() === "PRETO" && produto.capacidade === 512) searchFiltro = "Xiaomi Poco F5 Pro Dual SIM 512 GB black 8 GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M4") searchFiltro = "Xiaomi Pocophone Poco M4 " + produto.rede + "G Dual SIM " + produto.capacidade + "GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M4 PRO" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = "Xiaomi Pocophone Poco M4 Pro Dual SIM " + produto.capacidade + " GB black " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M5" && produto.cor.trim().toUpperCase() === "PRETO" && produto.ram === 4) searchFiltro = "Xiaomi Pocophone Poco M5 (5 Mpx) Dual SIM " + produto.capacidade + " GB black 4 GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO M5S") searchFiltro = produto.marca + " " + produto.nome.trim() + " DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + " GB " + produto.capacidade + "GB";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO X4 PRO") searchFiltro = "Xiaomi Pocophone Poco X4 PRO (5 Mpx) DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + " GB " + produto.capacidade + "GB";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "POCO X5") searchFiltro = "Xiaomi Pocophone Poco X5 DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + " GB " + produto.capacidade + "GB";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 11 PRIME" && produto.cor.trim().toUpperCase() === "VERDE") searchFiltro = "Xiaomi Redmi 11 Prime " + produto.rede + "G Dual SIM " + produto.capacidade + "GB meadow green " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 11 PRIME" && produto.cor.trim().toUpperCase() === "CINZA") searchFiltro = "Xiaomi Redmi 11 Prime " + produto.rede + "G Dual SIM " + produto.capacidade + "GB CHROME SILVER " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 12" && produto.cor.trim().toUpperCase() === "CINZA") searchFiltro = "XIAOMI REDMI 12 DUAL SIM 4G cinza 4GB 128GB";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 12" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = "XIAOMI REDMI 12 DUAL SIM 4G PRETO 4GB 128GB";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI 12C" && produto.cor.trim().toUpperCase() === "ROXO") searchFiltro = "Xiaomi Redmi 12C Dual SIM " + produto.capacidade + " GB PURPLE " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 10" && produto.cor.trim().toUpperCase() === "PRETO") searchFiltro = "xiaomi Redmi Note 10 Pro Dual Sim " + produto.capacidade + " Gb ONYX GRAY " + produto.ram + "Gb Ram";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 11 PRO+") searchFiltro = "Xiaomi Redmi Note 11 Pro+ 5G (MediaTek) Dual SIM " + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 11S") searchFiltro = "Xiaomi Redmi Note 11S Dual SIM 128 GB " + produto.cor + " 6 GB RAM";
    if (produto.marca.trim().toUpperCase() === "XIAOMI" && produto.nome.trim().toUpperCase() === "REDMI NOTE 12") searchFiltro = "Xiaomi Redmi Note 12 " + produto.rede + " Dual SIM " + produto.capacidade + " GB " + produto.cor + " " + produto.ram + " GB RAM";

    searchFiltro = (produto.marca + " " + produto.nome.trim() + " DUAL SIM " + produto.rede + "G " + produto.cor + " " + produto.ram + "GB " + produto.capacidade + "GB");

    return searchFiltro;
}