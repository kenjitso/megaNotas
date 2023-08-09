import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculosIphoneAtacadoGames(produtoParaguay: IProdutoLoja, produtoML: any) {

    // Aumenta a similaridade se a marca for igual

    let similarity = 0;

    //ARRUMA ESPEFICACOES DE ALGUNS MODELOS


    if (produtoML.modelo.trim().toUpperCase() === "IPHONE 14" && produtoML.memoriaRam.trim().toUpperCase()=== "4 GB") produtoML.memoriaRam = "6 GB";
    if (produtoML.modelo.trim().toUpperCase() === "IPHONE 14 PLUS" && produtoML.memoriaRam.trim().toUpperCase() === "4 GB") produtoML.memoriaRam = "6 GB";
    if (produtoML.modelo.trim().toUpperCase() === "IPHONE 14 PLUS" && produtoML.mobileNetwork.trim().toUpperCase() === "4G") produtoML.mobileNetwork = "5G";



    if (produtoParaguay.marca.toUpperCase().trim() === "APPLE" && produtoML.marca.toUpperCase().trim() === "APPLE") similarity++;


    // Aumenta a similaridade se o modelo for igual

    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 MHDJ3LZ2221" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO A2215" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO A2160" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO MAX A2218" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO MAX A2161" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 A2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;

    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJA3B A2403" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJF3B2403" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FJNP3B2403" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJC3B A2403" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJC3ZD2403" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJG3B" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJG3QL" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJH3ZD" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJ93B" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FJNM3B" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 FGJ63B" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLPK3LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLPF3LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLPH3LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLPG3LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLQA3LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLQ63LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLQ83LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLQ73LZ2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 A2633HN" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2890BE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;

    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 A2882HN" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 MPUF3BE2882" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 MPV03BE2882" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 MPUR3BE2882" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 MPWA3BE2882" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS MQ503BE2886" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS MR6D3BE2886" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MQ083BE2890" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MQ0G3BE2890" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MQ2V3BE2890" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MQ183BE2890" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MQ1F3BE2890" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQ9T3BE2894" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQ9P3BE2894" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQC23BE2894" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQ9X3BE2894" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQ9W3BE2894" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQAJ3BE2894" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX MQ913LL2651" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 6S" && produtoML.modelo.toUpperCase().trim() === "IPHONE 6S") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 7" && produtoML.modelo.toUpperCase().trim() === "IPHONE 7") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 8 PLUS A1864" && produtoML.modelo.toUpperCase().trim() === "IPHONE 8 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE SE 2020 A2275" && produtoML.modelo.toUpperCase().trim() === "IPHONE SE (2ND GENERATION)") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE SE 2022 A2783" && produtoML.modelo.toUpperCase().trim() === "IPHONE SE (3RD GENERATION)") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE XR A1984" && produtoML.modelo.toUpperCase().trim() === "IPHONE XR") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE XS A1920" && produtoML.modelo.toUpperCase().trim() === "IPHONE XS") similarity++;



    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 A2221" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 A2221 LZ *CAIXA SLIM*" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 A2221 LZ" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO MAX A2218 2B" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 PRO MAX A2218 ZD" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 A2402 3J" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 A2403 HN" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 A2403 LE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 A2403 QL" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 A2403 ZD" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 12 A2403 ZD *CPO*" && produtoML.modelo.toUpperCase().trim() === "IPHONE 12") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 A2633 HN" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 A2633 LZ" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 PRO" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 PRO MAX A2484 LL" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 A2882 BE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 A2882 HN" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 A2884 CH" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS *SWAP A+*" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS A2886 AA" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS A2886 BE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS A2886 HN" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2650" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PLUS A2886" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PLUS") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2650 CH" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2890 BE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2650LL" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
 
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX A2651LL" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX A2894BE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX A2896CH" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
   
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2892 CH" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX A2651" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX A2893 3J" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO MAX A2896 CH" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO MAX") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 11 LZ A2221" && produtoML.modelo.toUpperCase().trim() === "IPHONE 11") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 14 PRO A2890 LE" && produtoML.modelo.toUpperCase().trim() === "IPHONE 14 PRO") similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "IPHONE 13 MLPH3LZ A2633" && produtoML.modelo.toUpperCase().trim() === "IPHONE 13") similarity++;


    // Aumenta a similaridade se a capacidade for igual


    if (produtoParaguay.capacidade.toString().toUpperCase() === "1" && produtoML.memoriaInterna.toUpperCase().includes("1 TB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "32" && produtoML.memoriaInterna.toUpperCase().includes("32 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "64" && produtoML.memoriaInterna.toUpperCase().includes("64 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "128" && produtoML.memoriaInterna.toUpperCase().includes("128 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "256" && produtoML.memoriaInterna.toUpperCase().includes("256 GB")) similarity++;
    if (produtoParaguay.capacidade.toString().toUpperCase() === "512" && produtoML.memoriaInterna.toUpperCase().includes("512 GB")) similarity++;


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


