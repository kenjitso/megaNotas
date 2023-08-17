import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculosSamsung(produtoParaguay: IProdutoLoja, produtoML: any) {

    let similarity = 0;

    if (produtoParaguay.nome.trim().toUpperCase() === "GALAXY S23" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
    if (produtoParaguay.nome.trim().toUpperCase() === "GALAXY S23 ULTRA" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;


    if (produtoML.modelo.trim().toUpperCase() === "GALAXY S23 ULTRA" && produtoML.mobileNetwork.trim().toUpperCase() === "4G") produtoML.mobileNetwork = "5G";
    if (produtoML.modelo.trim().toUpperCase() === "GALAXY A14" && produtoML.cor.toUpperCase().trim() === "VERDE" && produtoML.mobileNetwork.trim().toUpperCase() === "4G") produtoML.mobileNetwork = "5G";
    if (produtoML.modelo.trim().toUpperCase() === "GALAXY A14" && produtoML.cor.toUpperCase().trim() === "PRATA" && produtoML.mobileNetwork.trim().toUpperCase() === "4G") produtoML.mobileNetwork = "5G";
    if (produtoML.modelo.trim().toUpperCase() === "GALAXY Z FLIP5" && produtoML.cor.toUpperCase().trim() === "PRETO" && produtoML.memoriaRam.trim().toUpperCase() === "7 GB") produtoML.memoriaRam = "8 GB";





    // Aumenta a similaridade se a marca for igual
    if (produtoML.marca) {
        if (produtoParaguay.marca.toUpperCase().trim() === "SAMSUNG" && produtoML.marca.toUpperCase().trim() === "SAMSUNG") similarity++;
    }

    // Aumenta a similaridade se o modelo for igual
    if (produtoML.modelo) {

        if (produtoParaguay.nome.toUpperCase().trim() === "A03" && produtoML.modelo.toUpperCase().trim() === "A03 CORE DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A03" && produtoML.modelo.toUpperCase().trim() === "A03 DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A14" && produtoML.modelo.toUpperCase().trim() === "GALAXY A14") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A04E" && produtoML.modelo.toUpperCase().trim() === "A04E DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A24" && produtoML.modelo.toUpperCase().trim() === "A24") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A24" && produtoML.modelo.toUpperCase().trim() === "A24") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A54" && produtoML.modelo.toUpperCase().trim() === "A54 5G DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A24" && produtoML.modelo.toUpperCase().trim() === "A24 DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A24" && produtoML.modelo.toUpperCase().trim() === "A24 DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A34" && produtoML.modelo.toUpperCase().trim() === "A34 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A34" && produtoML.modelo.toUpperCase().trim() === "A34 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A53" && produtoML.modelo.toUpperCase().trim() === "A53 5G DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A23" && produtoML.modelo.toUpperCase().trim() === "A23 5G DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A23" && produtoML.modelo.toUpperCase().trim() === "GALAXY A23 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY A23" && produtoML.modelo.toUpperCase().trim() === "A23 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "S21 FE" && produtoML.modelo.toUpperCase().trim() === "S21 FE 5G DUAL SIM (EXYNOS)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY S21 FE" && produtoML.modelo.toUpperCase().trim() === "S21 FE 5G DUAL SIM (EXYNOS)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY S21 FE" && produtoML.modelo.toUpperCase().trim() === "S21 FE 5G DUAL SIM (SNAPDRAGON)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY S23" && produtoML.modelo.toUpperCase().trim() === "S23") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY S23 ULTRA" && produtoML.modelo.toUpperCase().trim() === "S23 ULTRA") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY S23 PLUS" && produtoML.modelo.toUpperCase().trim() === "GALAXY S23 PLUS") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY Z FLIP3" && produtoML.modelo.toUpperCase().trim() === "Z FLIP3 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY Z FLIP5" && produtoML.modelo.toUpperCase().trim() === "GALAXY Z FLIP5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "GALAXY Z FOLD 5" && produtoML.modelo.toUpperCase().trim() === "Z FOLD5") similarity++;

    }

    // Aumenta a similaridade se a cor do produtoParaguay for azul e esta cor estiver no produtoML
    if (produtoML.cor) {

      
        if (produtoParaguay.cor.toUpperCase().trim() === "SILVER" && produtoML.cor.toUpperCase().trim() === "PRATA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "SILVER" && produtoML.cor.toUpperCase().trim() === "AWESOME SILVER") similarity++;
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
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "POWER BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "BOBA BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "MIRROR BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "ONYX GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "ONYX") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "NIGHT BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "CERAMIC BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "LASER BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "TRUFFLE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "PHANTOM BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "AWESOME BLACK") similarity++;


        if (produtoParaguay.cor.toUpperCase().trim() === "PRATA" && produtoML.cor.toUpperCase().trim() === "PRATA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "PRATA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRATA" && produtoML.cor.toUpperCase().trim() === "PRATEADO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GRAPHITE GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "ONYX GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "ONYX") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CINZA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CARBON GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "MATTE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "SILVER") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "PRATEADO") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "ROSA" && produtoML.cor.toUpperCase().trim() === "ROSA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROSA" && produtoML.cor.toUpperCase().trim() === "LAVENDER") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROSA" && produtoML.cor.toUpperCase().trim() === "LAVANDER") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "SEA BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "OCEAN BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "ICE BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "STAR BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AURORA BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AZUL-CELESTE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AZUL") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "GLACIER BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "MYSTIQUE BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "ICEBERG BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "DEEP OCEAN BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "BUBBLEGUM BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "LIGHT BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "COOL BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "CELESTIAL BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "LASER BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "TWILIGHT BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AWESOME BLUE") similarity++;



        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "PEPPY PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "STARLIGHT PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "ROXO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "LAVENDER") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "LAVANDER") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "VIOLETA") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "LAKE GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "CORAL GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "VERDE-GRADIENTE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "MINT GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "VERDE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "NEBULA GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "PLAYFUL GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "FROSTED GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "LIGHT GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "FLORA GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "LIMA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "FOREST GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "VERDE-CLARO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "LIME" && produtoML.cor.toUpperCase().trim() === "AWESOME LIME") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "LIME" && produtoML.cor.toUpperCase().trim() === "VERDE-LIMA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "OLIVE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "VERDE-LIMA") similarity++;


        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "BRANCO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "AWESOME WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "PEBBLE WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "ARCTIC WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "CERAMIC WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "CREME") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "CREAM") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "WHITE" && produtoML.cor.toUpperCase().trim() === "CREME") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "WHITE" && produtoML.cor.toUpperCase().trim() === "CREAM") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "LARANJA" && produtoML.cor.toUpperCase().trim() === "LARANJA") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "YELLOW") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "POCO YELLOW") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "CYBER YELLOW") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "CORAL" && produtoML.cor.toUpperCase().trim() === "CORAL") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRONZE" && produtoML.cor.toUpperCase().trim() === "BRONZE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "COPPER" && produtoML.cor.toUpperCase().trim() === "COPPER") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERMELHO" && produtoML.cor.toUpperCase().trim() === "VERMELHO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VIOLETA" && produtoML.cor.toUpperCase().trim() === "VIOLETA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BURGUNDY" && produtoML.cor.toUpperCase().trim() === "BURGUNDY") similarity++;

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
        if (produtoParaguay.ram.toString().toUpperCase() === "3" && produtoML.memoriaRam.toUpperCase() === "3 GB") similarity++;
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
