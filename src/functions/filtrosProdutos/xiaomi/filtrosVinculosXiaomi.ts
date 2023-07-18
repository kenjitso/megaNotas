import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculosXiaomi(produtoParaguay: IProdutoLoja, produtoML: any) {

    let similarity = 0;

    // Aumenta a similaridade se a marca for igual
    if (produtoML.marca) {
        if (produtoParaguay.marca.toUpperCase().trim() === "XIAOMI" && produtoML.marca.toUpperCase().trim() === "XIAOMI") similarity++;
    }


 

    // Aumenta a similaridade se o modelo for igual
    if (produtoML.modelo) {
        if (produtoParaguay.nome.toUpperCase().trim() === "11 LITE NE" && produtoML.modelo.toUpperCase().trim() === "11 LITE 5G NE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12 LITE" && produtoML.modelo.toUpperCase().trim() === "12 LITE 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13 LITE" && produtoML.modelo.toUpperCase().trim() === "13 LITE DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "SHARK 4" && produtoML.modelo.toUpperCase().trim() === "BLACK SHARK 4") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F4 GT" && produtoML.modelo.toUpperCase().trim() === "POCO F4 GT") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F5" && produtoML.modelo.toUpperCase().trim() === "POCO F5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5S" && produtoML.modelo.toUpperCase().trim() === "POCO M5S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5" && produtoML.modelo.toUpperCase().trim() === "POCO M5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X5" && produtoML.modelo.toUpperCase().trim() === "POCO X5 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && produtoML.modelo.toUpperCase().trim() === "10") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A SPORT" && produtoML.modelo.toUpperCase().trim() === "10A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 11 PRIME" && produtoML.modelo.toUpperCase().trim() === "11 PRIME") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12" && produtoML.modelo.toUpperCase().trim() === "REDMI 12") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12C" && produtoML.modelo.toUpperCase().trim() === "12C DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9 ACTIV" && produtoML.modelo.toUpperCase().trim() === "9 ACTIV") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9 PRIME" && produtoML.modelo.toUpperCase().trim() === "9 PRIME") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9C" && produtoML.modelo.toUpperCase().trim() === "9C") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 (SNAPDRAGON)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10S" && produtoML.modelo.toUpperCase().trim() === "NOTE 10S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 LITE" && produtoML.modelo.toUpperCase().trim() === "REDMI NOTE 10 LITE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 LITE" && produtoML.modelo.toUpperCase().trim() === "NOTE 10 LITE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 PRO+" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO+ 5G (MEDIATEK)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 4G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11S" && produtoML.modelo.toUpperCase().trim() === "NOTE 11S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X4 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO X4 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X5 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO X5 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12 PRO" && produtoML.modelo.toUpperCase().trim() === "12 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5" && produtoML.modelo.toUpperCase().trim() === "POCO M5 (5 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 10 PRO (108 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11S" && produtoML.modelo.toUpperCase().trim() === "NOTE 11S 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO PLUS" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO+ 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO 5G") similarity++;
    }

    // Aumenta a similaridade se a cor do produtoParaguay for azul e esta cor estiver no produtoML
    if (produtoML.cor) {

        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "PRETO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "MATTE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "GRAPHITE GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "STEALTH BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "CARBON BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "FLASHY BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "MIDNIGHT BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "OBSIDIAN BLACK") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GRAPHITE GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "ONYX GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CINZA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CARBON GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROSA" && produtoML.cor.toUpperCase().trim() === "ROSA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "SEA BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "OCEAN BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "ICE BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "STAR BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AURORA BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AZUL") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "GLACIER BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "MYSTIQUE BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "ICEBERG BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "PEPPY PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "STARLIGHT PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "ROXO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "LAKE GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "CORAL GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "VERDE-GRADIENTE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "MINT GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "VERDE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "PLAYFUL GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "FROSTED GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "YELLOW") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "POCO YELLOW") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "BRANCO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "PEBBLE WHITE") similarity++;
    }



    // Aumenta a similaridade se a capacidade for igual
    if (produtoML.memoriaInterna) {
        if (produtoParaguay.capacidade === 1 && produtoML.memoriaInterna.toUpperCase().includes("1 TB")) similarity++;
        if (produtoParaguay.capacidade === 32 && produtoML.memoriaInterna.toUpperCase().includes("32 GB")) similarity++;
        if (produtoParaguay.capacidade === 64 && produtoML.memoriaInterna.toUpperCase().includes("64 GB")) similarity++;
        if (produtoParaguay.capacidade === 128 && produtoML.memoriaInterna.toUpperCase().includes("128 GB")) similarity++;
        if (produtoParaguay.capacidade === 256 && produtoML.memoriaInterna.toUpperCase().includes("256 GB")) similarity++;
        if (produtoParaguay.capacidade === 512 && produtoML.memoriaInterna.toUpperCase().includes("512 GB")) similarity++;

    }

    // Aumenta a similaridade se a RAM for igual
    if (produtoML.memoriaRam) {
        if (produtoParaguay.ram.toString().toUpperCase() === "2" && produtoML.memoriaRam.toUpperCase() === "2 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "4" && produtoML.memoriaRam.toUpperCase() === "4 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "6" && produtoML.memoriaRam.toUpperCase() === "6 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "8" && produtoML.memoriaRam.toUpperCase() === "8 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "12" && produtoML.memoriaRam.toUpperCase() === "12 GB") similarity++;

    }

    // Aumenta a similaridade se a REDE for igual
    if (produtoML.mobileNetwork) {
        if (produtoParaguay.rede === 4 && produtoML.mobileNetwork.toUpperCase().includes("4G")) similarity++;
        if (produtoParaguay.rede === 5 && produtoML.mobileNetwork.toUpperCase().includes("5G")) similarity++;
    }


    return similarity;
}
