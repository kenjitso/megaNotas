import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


export function filtrosVinculosXiaomiAtacadoGames(produtoParaguay: IProdutoLoja, produtoML: any) {

    let similarity = 0;

    if (produtoML.modelo.trim().toUpperCase() === "13 LITE DUAL SIM" && produtoML.mobileNetwork.trim().toUpperCase() === "4G") produtoML.mobileNetwork = "5G";



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
        if (produtoParaguay.nome.toUpperCase().trim() === "13 LITE" && produtoML.modelo.toUpperCase().trim() === "13 LITE DUAL SIM") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13" && produtoML.modelo.toUpperCase().trim() === "13") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "SHARK 4" && produtoML.modelo.toUpperCase().trim() === "BLACK SHARK 4") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F3" && produtoML.modelo.toUpperCase().trim() === "POCO F3 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F4" && produtoML.modelo.toUpperCase().trim() === "POCO F4") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F4 GT" && produtoML.modelo.toUpperCase().trim() === "POCO F4 GT") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO F5" && produtoML.modelo.toUpperCase().trim() === "POCO F5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5S" && produtoML.modelo.toUpperCase().trim() === "POCO M5S") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M4" && produtoML.modelo.toUpperCase().trim() === "POCO M4 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5" && produtoML.modelo.toUpperCase().trim() === "POCO M5") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X5" && produtoML.modelo.toUpperCase().trim() === "POCO X5 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10" && produtoML.modelo.toUpperCase().trim() === "10") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M4 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO M4 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11 PRO PLUS" && produtoML.modelo.toUpperCase().trim() === "NOTE 11 PRO+ 5G (MEDIATEK)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A" && produtoML.modelo.toUpperCase().trim() === "10A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10A SPORT" && produtoML.modelo.toUpperCase().trim() === "10A") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 11 PRIME" && produtoML.modelo.toUpperCase().trim() === "11 PRIME") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12" && produtoML.modelo.toUpperCase().trim() === "REDMI 12") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 12" && produtoML.nome.toUpperCase().includes("REDMI 12 ")) similarity++;
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
       
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X4 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO X4 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO X5 PRO" && produtoML.modelo.toUpperCase().trim() === "POCO X5 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "12 PRO" && produtoML.modelo.toUpperCase().trim() === "12 PRO 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5" && produtoML.modelo.toUpperCase().trim() === "POCO M5 (5 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 10 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 10 PRO (108 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO+" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO+ 5G") similarity++;
       
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 2022" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 11S" && produtoML.modelo.toUpperCase().trim() === "NOTE 11S 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO PLUS" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO+ 5G") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI NOTE 12 PRO" && produtoML.modelo.toUpperCase().trim() === "NOTE 12 PRO 5G") similarity++;
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
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI A1" && produtoML.modelo.toUpperCase().trim() === "A1 2022") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10C" && produtoML.modelo.toUpperCase().trim() === "10C") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO C40" && produtoML.modelo.toUpperCase().trim() === "POCO C40") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "A1 PLUS" && produtoML.nome.toUpperCase().trim().includes("A1+")) similarity++; // usa include
        if (produtoParaguay.nome.toUpperCase().trim() === "MI 9 LITE" && produtoML.nome.toUpperCase().trim().includes("MI 9 LITE")) similarity++; // usa include
        if (produtoParaguay.nome.toUpperCase().trim() === "POCO M5 DS" && produtoML.modelo.toUpperCase().trim() === "POCO M5 (5 MPX)") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "13 PRO" && produtoML.modelo.toUpperCase().trim() === "13 PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "11T PRO" && produtoML.modelo.toUpperCase().trim() === "11T PRO") similarity++;
        if (produtoParaguay.nome.toUpperCase().trim() === "REDMI 10 (2022) LTE" && produtoML.modelo.toUpperCase().trim() === "10 2022") similarity++;
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

    // Aumenta a similaridade se a cor do produtoParaguay for azul e esta cor estiver no produtoML
    if (produtoML.cor) {

        if (produtoParaguay.cor.toUpperCase().trim() === "PRATA" && produtoML.cor.toUpperCase().trim() === "PRATA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "SILVER" && produtoML.cor.toUpperCase().trim() === "PRATA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRATA" && produtoML.cor.toUpperCase().trim() === "MOONSILVER") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "PRETO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "SPACE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "GRAFITE") similarity++;
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
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "NIGHT BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "CERAMIC BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "LASER BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "TRUFFLE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "GRAPHITE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "PRETO-ÔNIX") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "PRETO-MEIA-NOITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "CARBON GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "MINERAL GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "PRETO" && produtoML.cor.toUpperCase().trim() === "SHADOW BLACK") similarity++;


        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GRAPHITE GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "ONYX GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "Cinza-escuro") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CINZA") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CARBON GRAY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "MATTE BLACK") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CARBON GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "MINERAL GREY") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "CINZA-MEIA-NOITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CINZA" && produtoML.cor.toUpperCase().trim() === "MIDNIGHT GREY") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "ROSA" && produtoML.cor.toUpperCase().trim() === "ROSA") similarity++;

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
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AZUL-OCEANO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "FROST BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "STEEL BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "MORNING BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "SUNSET PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "NEPTUNE BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "METALLIC BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "DARK BLUE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AZUL" && produtoML.cor.toUpperCase().trim() === "AZUL-ESTELAR") similarity++;
        
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "PEPPY PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "STARLIGHT PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "ROXO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "LAVENDER PURPLE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "ROXO" && produtoML.cor.toUpperCase().trim() === "SUNSET PURPLE") similarity++;

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
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "FOREST GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "OCEAN GREEN") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERDE" && produtoML.cor.toUpperCase().trim() === "PEARL GREEN") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "BRANCO") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "PEBBLE WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "ARCTIC WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "CERAMIC WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "PEARL WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "MOONLIGHT WHITE") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "BRANCO-LUNAR") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "BRANCO" && produtoML.cor.toUpperCase().trim() === "POLAR WHITE") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "LARANJA" && produtoML.cor.toUpperCase().trim() === "LARANJA") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "YELLOW") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "POCO YELLOW") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "AMARELO" && produtoML.cor.toUpperCase().trim() === "CYBER YELLOW") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "CORAL" && produtoML.cor.toUpperCase().trim() === "CORAL") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "CORAL" && produtoML.cor.toUpperCase().trim() === "PEACH PINK") similarity++;

        if (produtoParaguay.cor.toUpperCase().trim() === "VERMELHO" && produtoML.cor.toUpperCase().trim() === "VERMELHO-RUBI") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERMELHO" && produtoML.cor.toUpperCase().trim() === "VERMELHO-PÔR DO SOL") similarity++;
        if (produtoParaguay.cor.toUpperCase().trim() === "VERMELHO" && produtoML.cor.toUpperCase().trim() === "SCARLET RED") similarity++;
    
        if (produtoParaguay.cor.toUpperCase().trim() === "BRONZE" && produtoML.cor.toUpperCase().trim() === "GRADIENT BRONZE") similarity++;

    
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
