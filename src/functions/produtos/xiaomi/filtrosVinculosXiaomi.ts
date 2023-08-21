import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculosXiaomi(produtoParaguay: IProdutoLoja, produtoML: any) {

    let similarity = 0;

   
    if (produtoParaguay.marca.trim().toUpperCase() === "XIAOMI" &&produtoParaguay.nome.trim().toUpperCase() === "13 ULTRA" && produtoParaguay.rede === 4) produtoParaguay.rede = 5;
 



    const COR_MAPEAMENTO: { [key: string]: string[] } = {
        "PRATA": ["PRATA", "MOONSILVER", "SILVER"],

        "PRETO": [
            "PRETO", "SPACE BLACK", "GRAFITE", "BLACK", "MATTE BLACK", "GRAPHITE GRAY",
            "STEALTH BLACK", "CARBON BLACK", "GRAY", "FLASHY BLACK", "MIDNIGHT BLACK",
            "OBSIDIAN BLACK", "POWER BLACK", "BOBA BLACK", "MIRROR BLACK", "ONYX GRAY","ONYX",
            "NIGHT BLACK", "CERAMIC BLACK", "LASER BLACK", "TRUFFLE BLACK", "GRAPHITE BLACK",
            "PRETO-ÔNIX", "PRETO-MEIA-NOITE", "CARBON GREY", "MINERAL GREY", "SHADOW BLACK"
        ],
        "CINZA": [
            "METEORITE GRAY", "GRAPHITE GRAY", "ONYX GRAY", "ONYX", "CINZA-ESCURO", "GREY",
            "GRAY", "CINZA", "CARBON GRAY", "MATTE BLACK", "CARBON GREY", "MINERAL GREY",
            "CINZA-MEIA-NOITE", "MIDNIGHT GREY", "GRAFITE", "CHROME SILVER", "SILVER", "PRATEADO","PRATA"
        ],
        "ROSA": ["ROSA"],

        "AZUL": [
            "AZUL", "BLUE", "SEA BLUE", "OCEAN BLUE", "ICE BLUE", "STAR BLUE",
            "AURORA BLUE", "AZUL-CELESTE", "GLACIER BLUE", "MYSTIQUE BLUE",
            "ICEBERG BLUE", "DEEP OCEAN BLUE", "BUBBLEGUM BLUE", "LIGHT BLUE",
            "COOL BLUE", "CELESTIAL BLUE", "LASER BLUE", "TWILIGHT BLUE",
            "AZUL-OCEANO", "FROST BLUE", "STEEL BLUE", "MORNING BLUE",
            "SUNSET PURPLE", "NEPTUNE BLUE", "METALLIC BLUE", "DARK BLUE",
            "AZUL-ESTELAR"
        ],

        "ROXO": [
            "ROXO", "PURPLE", "PEPPY PURPLE","PÚRPURA", "STARLIGHT PURPLE", "LAVENDER PURPLE",
            "SUNSET PURPLE"
        ],

        "VERDE": [
            "LAKE GREEN", "CORAL GREEN", "VERDE-GRADIENTE", "MINT GREEN", "GREEN",
            "VERDE", "NEBULA GREEN", "PLAYFUL GREEN", "FROSTED GREEN", "LIGHT GREEN",
            "FLORA GREEN", "FOREST GREEN", "OCEAN GREEN", "PEARL GREEN", "MEADOW GREEN"
        ],

        "BRANCO": ["BRANCO", "PEBBLE WHITE", "WHITE", "ARCTIC WHITE", "CERAMIC WHITE",
            "PEARL WHITE", "MOONLIGHT WHITE", "BRANCO-LUNAR", "POLAR WHITE"
        ],

        "LARANJA": ["LARANJA"],

        "DOURADO": ["DOURADO"],

        "AMARELO": ["YELLOW", "POCO YELLOW", "CYBER YELLOW"],

        "CORAL": ["CORAL", "PEACH PINK"],

        "VERMELHO": ["VERMELHO-RUBI", "VERMELHO-PÔR DO SOL", "SCARLET RED"],

        "BRONZE": ["GRADIENT BRONZE"]
    };

    let productParaguayColor = produtoParaguay.cor.toUpperCase().trim();
    let productMLColor = produtoML.cor.toUpperCase().trim();


    // Aumenta a similaridade se a cor do produtoParaguay for azul e esta cor estiver no produtoML
    if (COR_MAPEAMENTO[productParaguayColor] && COR_MAPEAMENTO[productParaguayColor].includes(productMLColor)) {
        similarity++;
    }

    // Aumenta a similaridade se a marca for igual
    if (produtoML.marca) {
        if (produtoParaguay.marca.toUpperCase().trim() === "XIAOMI" && produtoML.marca.toUpperCase().trim() === "XIAOMI") similarity++;
    }

    // Aumenta a similaridade se o modelo for igual
    if (produtoML.modelo) {
        if (produtoParaguay.nome.toUpperCase().trim() === "11 LITE" && produtoML.modelo.toUpperCase().trim() === "11 LITE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "11 LITE NE" && produtoML.modelo.toUpperCase().trim() === "11 LITE 5G NE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12 LITE" && produtoML.modelo.toUpperCase().trim() === "12 LITE 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12" && produtoML.modelo.toUpperCase().trim() === "12") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12X (2022)" && produtoML.modelo.toUpperCase().trim() === "12X") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13 LITE" && produtoML.modelo.toUpperCase().trim() === "13 LITE DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13" && produtoML.modelo.toUpperCase().trim() === "13") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13 ULTRA" && produtoML.modelo.toUpperCase().trim() === "13 ULTRA") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "SHARK 4" && produtoML.modelo.toUpperCase().trim() === "BLACK SHARK 4") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F3" && produtoML.modelo.toUpperCase().trim() === "POCO F3 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F4" && produtoML.modelo.toUpperCase().trim() === "POCO F4") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F4 T667" && produtoML.modelo.toUpperCase().trim() === "POCO F4") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F4 GT" && produtoML.modelo.toUpperCase().trim() === "POCO F4 GT") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F5" && produtoML.modelo.toUpperCase().trim() === "POCO F5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5S" && produtoML.modelo.toUpperCase().trim() === "POCO M5S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M4" && produtoML.modelo.toUpperCase().trim() === "POCO M4 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M4 PRO" && produtoML.modelo.toUpperCase().trim() === "M4 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5" && produtoML.modelo.toUpperCase().trim() === "POCO M5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X5" && produtoML.modelo.toUpperCase().trim() === "POCO X5 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && produtoML.modelo.toUpperCase().trim() === "10") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 POWER" && produtoML.modelo.toUpperCase().trim() === "10 POWER") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M4 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO M4 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 PRO PLUS" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO+ 5G (MEDIATEK)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A" && produtoML.modelo.toUpperCase().trim() === "10A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A SPORT" && produtoML.modelo.toUpperCase().trim() === "10A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 11 PRIME" && produtoML.modelo.toUpperCase().trim() === "11 PRIME 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 11 PRIME" && produtoML.modelo.toUpperCase().trim() === "11 PRIME") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12" && produtoML.modelo.toUpperCase().trim() === "REDMI 12") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12" && produtoML.nome.toUpperCase().includes("REDMI 12 ")) similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 6" && produtoML.nome.toUpperCase().includes("REDMI 6 ")) similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 8" && produtoML.nome.toUpperCase().includes("REDMI 8 ")) similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A1+" && produtoML.nome.toUpperCase().includes("REDMI A1+")) similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12C" && produtoML.modelo.toUpperCase().trim() === "12C DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9 ACTIV" && produtoML.modelo.toUpperCase().trim() === "9 ACTIV") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9 PRIME" && produtoML.modelo.toUpperCase().trim() === "9 PRIME") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9C" && produtoML.modelo.toUpperCase().trim() === "9C") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 (SNAPDRAGON)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10" && produtoML.modelo.toUpperCase().trim() === "NOTE 10") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10S" && produtoML.modelo.toUpperCase().trim() === "NOTE 10S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 LITE" && produtoML.modelo.toUpperCase().trim() === "REDMI NOTE 10 LITE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 LITE" && produtoML.modelo.toUpperCase().trim() === "NOTE 10 LITE") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "11 LITE NOVA EDICAO" && produtoML.modelo.toUpperCase().trim() === "11 LITE 5G") similarity++;

        if (produtoParaguay.nome.toUpperCase().trim() === "NOTE 11 PRO+" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO+ 5G (MEDIATEK)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 PRO+" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO+ 5G (MEDIATEK)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 4G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "NOTE 12" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 4G") similarity++;


        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11S" && produtoML.modelo.toUpperCase().trim() === "NOTE 11S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 REDMI 10" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 (SNAPDRAGON)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12S" && produtoML.modelo.toUpperCase().trim() === "NOTE 12S 4G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 5" && produtoML.modelo.toUpperCase().trim() === "NOTE 5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 6 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 6 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 8" && produtoML.modelo.toUpperCase().trim() === "NOTE 8") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 8 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 8 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 8T" && produtoML.modelo.toUpperCase().trim() === "NOTE 8T") similarity++;

        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X4 PRO" && produtoML.modelo.toUpperCase().trim() === "M4 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X5 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO X5 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12 PRO" && produtoML.modelo.toUpperCase().trim() === "12 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5" && produtoML.modelo.toUpperCase().trim() === "POCO M5 (5 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 10 PRO (108 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO+" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO+ 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "NOTE 12 PRO" && produtoML.modelo.toUpperCase().trim() === "REDMI NOTE 12 PRO") similarity++;

        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 2022" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11S" && produtoML.modelo.toUpperCase().trim() === "NOTE 11S 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "NOTE 11S" && produtoML.modelo.toUpperCase().trim() === "NOTE 11S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO PLUS" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO+ 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "NOTE 12 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO" && produtoML.modelo.toUpperCase().trim() === "REDMI NOTE 12 PRO") similarity++;

        if (produtoParaguay.nome.toUpperCase().trim() === "12X" && produtoML.modelo.toUpperCase().trim() === "12X") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12T" && produtoML.modelo.toUpperCase().trim() === "12T") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9AT" && produtoML.modelo.toUpperCase().trim() === "9A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9A" && produtoML.modelo.toUpperCase().trim() === "9A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO C55" && produtoML.modelo.toUpperCase().trim() === "POCO C55") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A2 PLUS" && produtoML.modelo.toUpperCase().trim() === "A2 PLUS") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A2 PLUS" && produtoML.modelo.toUpperCase().trim() === "A2+") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A2" && produtoML.modelo.toUpperCase().trim() === "A2") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F5 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO F5 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A1" && produtoML.modelo.toUpperCase().trim() === "A1") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10C" && produtoML.modelo.toUpperCase().trim() === "10C") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO C40" && produtoML.modelo.toUpperCase().trim() === "POCO C40") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A1 PLUS" && produtoML.nome.toUpperCase().trim().includes("A1+")) similarity++; // usa include
        if (produtoParaguay.nome.toUpperCase().trim() === "MI 9 LITE" && produtoML.nome.toUpperCase().trim().includes("MI 9 LITE")) similarity++; // usa include
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5 DS" && produtoML.modelo.toUpperCase().trim() === "POCO M5 (5 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13 PRO" && produtoML.modelo.toUpperCase().trim() === "13 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "11T" && produtoML.modelo.toUpperCase().trim() === "11T") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "11T PRO" && produtoML.modelo.toUpperCase().trim() === "11T PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 (2022)" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 CHINA" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 (MEDIATEK)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13 PRO DS" && produtoML.modelo.toUpperCase().trim() === "13 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12S" && produtoML.modelo.toUpperCase().trim() === "NOTE 12S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12S" && produtoML.modelo.toUpperCase().trim() === "NOTE 12S DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X3 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO X3 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCOPHONE F1" && produtoML.modelo.toUpperCase().trim() === "POCOPHONE F1") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 7A" && produtoML.modelo.toUpperCase().trim() === "7A (13 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 8A" && produtoML.modelo.toUpperCase().trim() === "8A DUAL SIM (12 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9" && produtoML.modelo.toUpperCase().trim() === "9 (HELIO G80)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 9T" && produtoML.modelo.toUpperCase().trim() === "9T") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 9" && produtoML.modelo.toUpperCase().trim() === "NOTE 9") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 9 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 9 PRO (64 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 9S" && produtoML.modelo.toUpperCase().trim() === "NOTE 9S") similarity++;



    }



    // Aumenta a similaridade se a capacidade for igual
    if (produtoML.memoriaInterna) {
        if (produtoParaguay.capacidade === 1 && produtoML.memoriaInterna.toUpperCase().includes("1 TB")) similarity++;
        if (produtoParaguay.capacidade === 16 && produtoML.memoriaInterna.toUpperCase().includes("16 GB")) similarity++;
        if (produtoParaguay.capacidade === 32 && produtoML.memoriaInterna.toUpperCase().includes("32 GB")) similarity++;
        if (produtoParaguay.capacidade === 64 && produtoML.memoriaInterna.toUpperCase().includes("64 GB")) similarity++;
        if (produtoParaguay.capacidade === 128 && produtoML.memoriaInterna.toUpperCase().includes("128 GB")) similarity++;
        if (produtoParaguay.capacidade === 256 && produtoML.memoriaInterna.toUpperCase().includes("256 GB")) similarity++;
        if (produtoParaguay.capacidade === 512 && produtoML.memoriaInterna.toUpperCase().includes("512 GB")) similarity++;
        if (produtoParaguay.capacidade === 1024 && produtoML.memoriaInterna.toUpperCase().includes("1024 GB")) similarity++;
        if (produtoParaguay.capacidade === 1024 && produtoML.memoriaInterna.toUpperCase().includes("1 TB")) similarity++;
    }

    // Aumenta a similaridade se a RAM for igual
    if (produtoML.memoriaRam) {
        if (produtoParaguay.ram.toString().toUpperCase() === "2" && produtoML.memoriaRam.toUpperCase() === "2 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "3" && produtoML.memoriaRam.toUpperCase() === "3 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "4" && produtoML.memoriaRam.toUpperCase() === "4 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "6" && produtoML.memoriaRam.toUpperCase() === "6 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "8" && produtoML.memoriaRam.toUpperCase() === "8 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "12" && produtoML.memoriaRam.toUpperCase() === "12 GB") similarity++;
        if (produtoParaguay.ram.toString().toUpperCase() === "16" && produtoML.memoriaRam.toUpperCase() === "16 GB") similarity++;
    }

    // Aumenta a similaridade se a REDE for igual
    if (produtoML.mobileNetwork) {
        if (produtoParaguay.rede === 4 && produtoML.mobileNetwork.toUpperCase().includes("4G")) similarity++;
        if (produtoParaguay.rede === 5 && produtoML.mobileNetwork.toUpperCase().includes("5G")) similarity++;
    }

    return similarity;
}
