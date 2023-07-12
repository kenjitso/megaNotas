import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculos(produtoParaguay: IProdutoLoja, produtoML: any) {

    let similarity = 0;

    // Aumenta a similaridade se a marca for igual
    if (produtoParaguay.marca.toUpperCase().trim() === "XIAOMI" && produtoML.marca.toUpperCase().includes("XIAOMI")) {

        similarity++;
    }

    // Aumenta a similaridade se o modelo for igual

    if (produtoParaguay.nome.toUpperCase().includes("11 LITE") && produtoML.modelo.toUpperCase().includes("11 LITE")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("12 LITE") && produtoML.modelo.toUpperCase().includes("12")) {

        similarity++;
    }
    if (produtoParaguay.nome.toUpperCase().trim() === "12 PRO" && produtoML.modelo.toUpperCase().includes("12 PRO")) {

        similarity++;
    }
    if (produtoParaguay.nome.toUpperCase().trim() === "12T" && produtoML.modelo.toUpperCase().includes("12T")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "12 T" && produtoML.modelo.toUpperCase().includes("12 T")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "13" && produtoML.modelo.toUpperCase().includes("13")) {

        similarity++;
    }

    if (
        produtoParaguay.nome.toUpperCase().trim() === "13 LITE" &&
        (produtoML.modelo.toUpperCase().includes("13 LITE") || produtoML.modelo.toUpperCase().includes("13 Lite Dual SIM"))
    ) {

        similarity++;
    }



    if (produtoParaguay.nome.toUpperCase().trim() === "POCO C40" && produtoML.modelo.toUpperCase().includes("POCO C40")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "POCO F5" && produtoML.modelo.toUpperCase().includes("POCO F5")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "POCO M4 PRO" && produtoML.modelo.toUpperCase().includes("POCO M4 PRO")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5S" && produtoML.modelo.toUpperCase().includes("POCO M5S")) {

        similarity++;
    }

    if (
        produtoParaguay.nome.toUpperCase().trim() === "POCO X5" &&
        (produtoML.modelo.toUpperCase().includes("POCO X5") || produtoML.modelo.toUpperCase().includes("POCO X5 5G"))
    ) {
        console.log("??");
        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && (produtoML.modelo.toUpperCase().includes("REDMI 10") || produtoML.modelo.toUpperCase().includes("10"))) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "10C" && produtoML.modelo.toUpperCase().includes("10C")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 2022" && produtoML.modelo.toUpperCase().includes("10 2022")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 POWER" && produtoML.modelo.toUpperCase().includes("REDMI 10 POWER")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A" && produtoML.modelo.toUpperCase().includes("10A")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A SPORT" && produtoML.modelo.toUpperCase().includes("REDMI 10A SPORT")) {

        similarity++;
    }


    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 11 PRIME" && produtoML.modelo.toUpperCase().includes("11 PRIME")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12" && produtoML.modelo.toUpperCase().includes("12")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12C" && produtoML.modelo.toUpperCase().includes("12C")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9 ACTIV" && produtoML.modelo.toUpperCase().includes("9 ACTIV")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9 PRIME" && produtoML.modelo.toUpperCase().includes("9 PRIME")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9C" && produtoML.modelo.toUpperCase().includes("9C")) {

        similarity++;
    }
    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A2" && produtoML.modelo.toUpperCase().includes("A2")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 LITE" && produtoML.modelo.toUpperCase().includes("REDMI NOTE 10 LITE")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("NOTE 10 PRO") && produtoML.modelo.toUpperCase().includes("NOTE 10 PRO")) {
        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("NOTE 10S") && produtoML.modelo.toUpperCase().includes("NOTE 10S")) {
        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("NOTE 11 PRO") && produtoML.modelo.toUpperCase().includes("NOTE 11 PRO")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("NOTE 11 PRO+") && produtoML.modelo.toUpperCase().includes("NOTE 11 PRO+")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().trim() === "NOTE 11S" && produtoML.modelo.toUpperCase().includes("Note 11S")) {

        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("NOTE 12") && produtoML.modelo.toUpperCase().includes("NOTE 12")) {
        similarity++;
    }

    if (produtoParaguay.nome.toUpperCase().includes("SHARK 4") && produtoML.modelo.toUpperCase().includes("SHARK 4")) {
        similarity++;
    }



    // Aumenta a similaridade se a cor do produtoParaguay for azul e esta cor estiver no produtoML

    if (produtoParaguay.cor.toUpperCase() === "BLUE" && (produtoML.cor.toUpperCase().includes("AZUL") || produtoML.cor.toUpperCase().includes("BLUE"))) {
        similarity++;
    }
    if (produtoParaguay.cor.toUpperCase() === "CORAL" && (produtoML.cor.toUpperCase().includes("ROSA") || produtoML.cor.toUpperCase().includes("PINK"))) {

        similarity++;
    }
    if (produtoParaguay.cor.toUpperCase() === "GREEN" && (produtoML.cor.toUpperCase().includes("VERDE") || produtoML.cor.toUpperCase().includes("GREEN"))) {

        similarity++;
    }

    if (produtoParaguay.cor.toUpperCase() === "BLACK" && (produtoML.cor.toUpperCase().includes("PRETO") || produtoML.cor.toUpperCase().includes("BLACK"))) {

        similarity++;
    }
    if (produtoParaguay.cor.toUpperCase() === "WHITE" && (produtoML.cor.toUpperCase().includes("BRANCO") || produtoML.cor.toUpperCase().includes("WHITE"))) {

        similarity++;
    }

    if (produtoParaguay.cor.toUpperCase() === "YELLOW" && (produtoML.cor.toUpperCase().includes("AMARELO") || produtoML.cor.toUpperCase().includes("YALLOW"))) {

        similarity++;
    }

    if (produtoParaguay.cor.toUpperCase() === "GRAY" && (produtoML.cor.toUpperCase().includes("CINZA") || produtoML.cor.toUpperCase().includes("GRAY") || produtoML.cor.toUpperCase().includes("GREY"))) {

        similarity++;
    }

    if (produtoParaguay.cor.toUpperCase() === "PINK" && (produtoML.cor.toUpperCase().includes("CINZA") || produtoML.cor.toUpperCase().includes("ROSA"))) {

        similarity++;
    }

    if (produtoParaguay.cor.toUpperCase() === "PURPLE" && (produtoML.cor.toUpperCase().includes("PURPLE") || produtoML.cor.toUpperCase().includes("ROXO"))) {

        similarity++;
    }

    // Aumenta a similaridade se a capacidade for igual

    if (produtoParaguay.capacidade.toString().toUpperCase() === "32" && produtoML.memoriaInterna.toUpperCase().includes("32 GB")) {

        similarity++;
    }
    if (produtoParaguay.capacidade.toString().toUpperCase() === "64" && produtoML.memoriaInterna.toUpperCase().includes("64 GB")) {

        similarity++;
    }
    if (produtoParaguay.capacidade.toString().toUpperCase() === "128" && produtoML.memoriaInterna.toUpperCase().includes("128 GB")) {

        similarity++;
    }
    if (produtoParaguay.capacidade.toString().toUpperCase() === "256" && produtoML.memoriaInterna.toUpperCase().includes("256 GB")) {

        similarity++;
    }

    // Aumenta a similaridade se a RAM for igual
    if (produtoParaguay.ram.toString().toUpperCase() === "2" && produtoML.memoriaRam.toUpperCase().includes("2 GB")) {

        similarity++;
    }

    if (produtoParaguay.ram.toString().toUpperCase() === "4" && produtoML.memoriaRam.toUpperCase().includes("4 GB")) {

        similarity++;
    }
    if (produtoParaguay.ram.toString().toUpperCase() === "6" && produtoML.memoriaRam.toUpperCase().includes("6 GB")) {

        similarity++;
    }
    if (produtoParaguay.ram.toString().toUpperCase() === "8" && produtoML.memoriaRam.toUpperCase().includes("8 GB")) {

        similarity++;
    }
    if (produtoParaguay.ram.toString().toUpperCase() === "12" && produtoML.memoriaRam.toUpperCase().includes("12 GB")) {

        similarity++;
    }

    // Aumenta a similaridade se a rede for igual

    if (produtoParaguay.rede && produtoParaguay.rede.toString().toUpperCase() === "5" && produtoML.mobileNetwork && produtoML.mobileNetwork.toUpperCase().includes("5G")) {

        similarity++;
    }

    if (produtoParaguay.rede && produtoParaguay.rede.toString().toUpperCase() === "4" && produtoML.mobileNetwork && produtoML.mobileNetwork.toUpperCase().includes("4G")) {

        similarity++;
    }

    return similarity;
}
