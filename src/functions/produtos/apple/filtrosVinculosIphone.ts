import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculosIphone(produtoParaguay: IProdutoLoja, produtoML: any) {

    // Aumenta a similaridade se a marca for igual

    let similarity = 0;

    //ARRUMA ESPEFICACOES DE ALGUNS MODELOS



    
    if (produtoML.modelo.trim().toUpperCase() === "IPHONE 14" && produtoML.memoriaRam.trim().toUpperCase()=== "4 GB") produtoML.memoriaRam = "6 GB";
    if (produtoML.modelo.trim().toUpperCase() === "IPHONE 14 PLUS" && produtoML.memoriaRam.trim().toUpperCase() === "4 GB") produtoML.memoriaRam = "6 GB";
    if (produtoML.modelo.trim().toUpperCase() === "IPHONE 14 PLUS" && produtoML.mobileNetwork.trim().toUpperCase() === "4G") produtoML.mobileNetwork = "5G";
    if (produtoParaguay.nome.trim().toUpperCase() === "IPHONE 12" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
    if (produtoParaguay.nome.trim().toUpperCase() === "IPHONE 13" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
    if (produtoParaguay.nome.trim().toUpperCase() === "IPHONE 14" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
    if (produtoParaguay.nome.trim().toUpperCase() === "IPHONE 14 PLUS" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
    if (produtoParaguay.nome.trim().toUpperCase() === "IPHONE 14 PRO" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
    if (produtoParaguay.nome.trim().toUpperCase() === "IPHONE 14 PRO MAX" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
 



    if (produtoParaguay.marca.toUpperCase().trim() === "APPLE" && produtoML.marca.toUpperCase().trim() === "APPLE") similarity++;


    // Aumenta a similaridade se o modelo for igual


    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE XS" && produtoML.modelo.toUpperCase().trim() === "IPHONE XS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE XR" && produtoML.modelo.toUpperCase().trim() === "IPHONE XR") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO MAX" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 6S" && produtoML.modelo.toUpperCase().trim() === "IPHONE 6S") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 7" && produtoML.modelo.toUpperCase().trim() === "IPHONE 7") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 8 PLUS" && produtoML.modelo.toUpperCase().trim() === "IPHONE 8 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE SE 2020" && produtoML.modelo.toUpperCase().trim() === "IPHONE SE (2ND GENERATION)") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE SE 2022" && produtoML.modelo.toUpperCase().trim() === "IPHONE SE (3RD GENERATION)") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 PRO" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 PRO MAX" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13 PRO MAX") similarity++;



    // Aumenta a similaridade se a capacidade for igual

    if (produtoParaguay.capacidade.toString().toUpperCase() === "1" && produtoML.memoriaInterna.toUpperCase().includes("1 TB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "32" && produtoML.memoriaInterna.toUpperCase().includes("32 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "64" && produtoML.memoriaInterna.toUpperCase().includes("64 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "128" && produtoML.memoriaInterna.toUpperCase().includes("128 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "256" && produtoML.memoriaInterna.toUpperCase().includes("256 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "512" && produtoML.memoriaInterna.toUpperCase().includes("512 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "1024" && produtoML.memoriaInterna.toUpperCase().includes("1 TB")) similarity++;


    // Aumenta a similaridade se a RAM for igual


    if (produtoParaguay.ram.toString().toUpperCase() === "2" && produtoML.memoriaRam.toUpperCase() === "2 GB") similarity++;
    if (produtoParaguay.ram.toString().toUpperCase() === "3" && produtoML.memoriaRam.toUpperCase() === "3 GB") similarity++;
    if (produtoParaguay.ram.toString().toUpperCase() === "4" && produtoML.memoriaRam.toUpperCase() === "4 GB") similarity++;
    if (produtoParaguay.ram.toString().toUpperCase() === "6" && produtoML.memoriaRam.toUpperCase() === "6 GB") similarity++;
    if (produtoParaguay.ram.toString().toUpperCase() === "8" && produtoML.memoriaRam.toUpperCase() === "8 GB") similarity++;
    if (produtoParaguay.ram.toString().toUpperCase() === "12" && produtoML.memoriaRam.toUpperCase() === "12 GB") similarity++;


    // Aumenta a similaridade se a rede for igual


    if (produtoParaguay.rede.toString().toUpperCase() === "4" && produtoML.mobileNetwork.toUpperCase().includes("4G")) similarity++;
    if (produtoParaguay.rede.toString().toUpperCase() === "5" && produtoML.mobileNetwork.toUpperCase().includes("5G")) similarity++;


    // Aumenta a similaridade se a cor do produtoParaguay for azul e esta cor estiver no produtoML


    if (produtoParaguay.cor.trim().toUpperCase() === "VERMELHO" && produtoML.cor.trim().toUpperCase() === "VERMELHO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "VERMELHO" && produtoML.cor.trim().toUpperCase() === "(PRODUCT)RED") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "VERDE" && produtoML.cor.trim().toUpperCase() === "VERDE-MEIA-NOITE") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "VERDE" && produtoML.cor.trim().toUpperCase() === "VERDE") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "PRETO" && produtoML.cor.trim().toUpperCase() === "PRETO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "PRETO" && produtoML.cor.trim().toUpperCase() === "PRETO-ESPACIAL") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "PRETO" && produtoML.cor.trim().toUpperCase() === "CINZA-ESPACIAL") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "CINZA" && produtoML.cor.trim().toUpperCase() === "CINZA") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "CINZA" && produtoML.cor.trim().toUpperCase() === "PRATEADO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "CINZA" && produtoML.cor.trim().toUpperCase() === "CINZA-ESPACIAL") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "CINZA" && produtoML.cor.trim().toUpperCase() === "GRAFITE") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "AZUL" && produtoML.cor.trim().toUpperCase() === "AZUL") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "BRANCO" && produtoML.cor.trim().toUpperCase() === "BRANCO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "BRANCO" && produtoML.cor.trim().toUpperCase() === "ESTELAR") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "ROXO" && produtoML.cor.trim().toUpperCase() === "ROXO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "ROXO" && produtoML.cor.trim().toUpperCase() === "ROXO-PROFUNDO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "GOLD" && produtoML.cor.trim().toUpperCase() === "DOURADO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "PRETO" && produtoML.cor.trim().toUpperCase() === "MEIA‑NOITE") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "PRETO" && produtoML.cor.trim().toUpperCase() === "MEIA-NOITE") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "DOURADO" && produtoML.cor.trim().toUpperCase() === "DOURADO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "AMARELO" && produtoML.cor.trim().toUpperCase() === "AMARELO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "AMARELO" && produtoML.cor.trim().toUpperCase() === "YELLOW") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "PRATA" && produtoML.cor.trim().toUpperCase() === "PRATEADO") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "ROSA" && produtoML.cor.trim().toUpperCase() === "ROSA") similarity++;
    if (produtoParaguay.cor.trim().toUpperCase() === "ROSA" && produtoML.cor.trim().toUpperCase() === "OURO ROSA") similarity++;
    return similarity;
}


