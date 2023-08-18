import { IProdutoLoja } from "@/datatypes/ProdutoLoja";


const COR_MAPEAMENTO: { [key: string]: string[] } = {
    "MIDNIGHT": ["MEIA-NOITE"],
    "SPACE GRAY": ["CINZA-ESPACIAL"],
    "OBSIDIAN BLACK": ["PRETO"],
    "MOONLIGHT GRAY": ["MOONLIGHT GREY"],
    "BLACK": ["BLACK","INFINITE BLACK","GRAPHITE BLACK"],
    "INFINITE BLACK": ["BLACK","INFINITE BLACK"],
    "BROWN": ["BROWN LEATHER"],
    "BLUE": ["AZUL","BLUE"],
    "AZUL": ["AZUL-CELESTE","BLUE"],
    "PETAL PINK": ["PETAL PINK","FLAMINGO PINK"],
    "MOSS GREEN": ["MOSS GREEN"],
    "IVORY": ["IVORY","IVORY WHITE"],
    "GOLD": ["DOURADO"],
    "CREAM": ["CREME"],
    "PINK": ["ROSA","PINK"],
    "ROSA": ["TERRA ROSA","PINK"],
};


const CAIXA_MEDIDA_MAPEAMENTO: { [key: string]: string[] } = {
    "40MM": ["40MM", "40 MM"],
    "41MM": ["41M", "41 MM"],
    "44MM": ["44MM", "44 MM"],
};

const TIPO_PULSEIRA_MAPEAMENTO: { [key: string]: string[] } = {
    "ESPORTIVA": ["ESPORTIVA"],
};

export function filtrosVinculosSmartWatch(produtoParaguay: IProdutoLoja, produtoML: any) {

    if (produtoML.marca === undefined) produtoML.marca = "N/A"
    if (produtoML.nome === undefined) produtoML.nome = "N/A"
    if (produtoML.cor === undefined) produtoML.cor = "N/A"
    if (produtoML.corPulseira === undefined) produtoML.corPulseira = "N/A"
    if (produtoML.caixaMedida === undefined) produtoML.caixaMedida = "N/A"
    if (produtoML.tipoPulseira === undefined) produtoML.tipoPulseira = "N/A"
    if (produtoML.memoriaRam === undefined) produtoML.memoriaRam = "0 GB"
    if (produtoML.memoriaInterna === undefined) produtoML.memoriaInterna = "0 GB"
    if (produtoML.mobileNetwork === undefined || "NÃO") produtoML.mobileNetwork = "0G"
    let similarity = 0;

    let productParaguayColor = produtoParaguay.cor.toUpperCase().trim();
    let productMLColor = produtoML.cor.toUpperCase().trim();
    let productMLCorPulseira = produtoML.corPulseira.toUpperCase().trim();
    let productParaguayTipoPulseira = produtoParaguay.tipoPulseira.toUpperCase().trim();
    let productMLTipoPulseira = produtoML.tipoPulseira.toUpperCase().trim();
    let productParaguayCaixaMedida = produtoParaguay.caixaMedida.toUpperCase().trim();
    let productMLCaixaMedida = produtoML.caixaMedida.toUpperCase().trim();

    //COR
    if (COR_MAPEAMENTO[productParaguayColor] && COR_MAPEAMENTO[productParaguayColor].includes(productMLColor)) similarity++;

    //COR PULSEIRA
    if (COR_MAPEAMENTO[productParaguayColor] && COR_MAPEAMENTO[productParaguayColor].includes(productMLCorPulseira)) similarity++;

    //TIPO PULSEIRA
    if (TIPO_PULSEIRA_MAPEAMENTO[productParaguayTipoPulseira] && TIPO_PULSEIRA_MAPEAMENTO[productParaguayTipoPulseira].includes(productMLTipoPulseira)) similarity++;

    //MEDIDA CAIXA
    if (CAIXA_MEDIDA_MAPEAMENTO[productParaguayCaixaMedida] && CAIXA_MEDIDA_MAPEAMENTO[productParaguayCaixaMedida].includes(productMLCaixaMedida)) similarity++;

    //MARCA
    if (produtoParaguay.marca.toUpperCase().trim() === "APPLE" && produtoML.marca.toUpperCase().trim() === "APPLE") similarity++;
    if (produtoParaguay.marca.toUpperCase().trim() === "XIAOMI" && produtoML.marca.toUpperCase().trim() === "XIAOMI") similarity++;
    if (produtoParaguay.marca.toUpperCase().trim() === "XIAOMI" && produtoML.marca.toUpperCase().trim() === "AMAZFIT") similarity++;

    //MODELO APPLE
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH S6" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH  SERIES 6")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH S6" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH SERIES 6")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH SE" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH SE")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH S8" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH SERIES 8")) similarity++;
   
    //MODELO XIAOMI
 
    if (produtoParaguay.nome.toUpperCase().trim() === "REDMI WATCH 2 LITE" && produtoML.modelo.toUpperCase().trim().includes("REDMI WATCH 2 LITE")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH S6" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH SERIES 6")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH SE" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH SE")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "WATCH S8" && produtoML.nome.toUpperCase().trim().includes("APPLE WATCH SERIES 8")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT BIP 3 PRO" && produtoML.modelo.toUpperCase().trim().includes("BIP 3 PRO")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTR 2" && produtoML.modelo.toUpperCase().trim().includes("GTR 2")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTR 3" && produtoML.modelo.toUpperCase().trim().includes("GTR 3")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTR 3 PRO" && produtoML.modelo.toUpperCase().trim().includes("GTR 3 PRO")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTR MINI" && produtoML.modelo.toUpperCase().trim().includes("GTR MINI")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTS 2" && produtoML.modelo.toUpperCase().trim().includes("GTS 2")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTS 2 MINI" && produtoML.modelo.toUpperCase().trim().includes("GTS 2 MINI")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTS 2E" && produtoML.modelo.toUpperCase().trim().includes("GTS 2E")) similarity++;
    if (produtoParaguay.nome.toUpperCase().trim() === "AMAZFIT GTS 3" && produtoML.modelo.toUpperCase().trim().includes("GTS 3")) similarity++;



    return similarity;
}

