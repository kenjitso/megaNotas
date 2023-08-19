import { IProdutoLoja } from "@/datatypes/ProdutoLoja";



interface Mapeamento_Item {
    regex: RegExp;
    valor: string | number;
}

const MARCAS_MAPEAMENTO = [
    { regex: /XIAOMI/i, valor: "XIAOMI" },
    { regex: /APPLE/i, valor: "APPLE" },
    { regex: /SAMSUNG/i, valor: "SAMSUNG" }
];

const CAIXA_MEDIDA_MAPEAMENTO = [
    { regex: /49MM/i, valor: "49MM" },
    { regex: /47MM/i, valor: "47MM" },
    { regex: /46MM/i, valor: "46MM" },
    { regex: /45MM/i, valor: "45MM" },
    { regex: /44MM/i, valor: "44MM" },
    { regex: /42MM/i, valor: "42MM" },
    { regex: /41MM/i, valor: "41MM" },
    { regex: /40MM/i, valor: "40MM" },
    { regex: /39MM/i, valor: "39MM" },
    { regex: /38MM/i, valor: "38MM" },
    { regex: /2MM/i, valor: "2MM" },
];

const TIPO_PULSEIRA_MAPEAMENTO = [
    { regex: /SPORT/i, valor: "ESPORTIVA" },
];

const RAM_MAPEAMENTO = [
    { regex: /R32GB/i, valor: 32 },
    { regex: /R16GB/i, valor: 16 },
    { regex: /R12GB/i, valor: 12 },
    { regex: /R8GB/i, valor: 8 },
    { regex: /R6GB/i, valor: 6 },
    { regex: /R4GB/i, valor: 4 },
    { regex: /R3GB/i, valor: 3 },
    { regex: /R2GB/i, valor: 2 },
    { regex: /R1GB/i, valor: 1 }
];

const CAPACIDADE_MAPEAMENTO = [
    { regex: /C1024GB/i, valor: 1024 },
    { regex: /C512GB/i, valor: 512 },
    { regex: /C256GB/i, valor: 256 },
    { regex: /C128GB/i, valor: 128 },
    { regex: /C64GB/i, valor: 64 },
    { regex: /C32GB/i, valor: 32 },
    { regex: /C16GB/i, valor: 16 }
];

const REDE_MAPEAMENTO: Mapeamento_Item[] = [
    { regex: /\b5G\b/i, valor: 5 },
    { regex: /\b4G\b/i, valor: 4 }
];

const COR_MAPEAMENTO: Mapeamento_Item[] = [
    { regex: /LIGHTNINGGRAY/i, valor: "LIGHTNING GRAY" },
    { regex: /MOONLIGHT GRAY/i, valor: "MOONLIGHT GRAY" },
    { regex: /MOONLIGHT BRANCO/i, valor: "MOONLIGHT BRANCO" },
    { regex: /ONYX PEBBLE GREY/i, valor: "ONYX PEBBLE GREY" },
    { regex: /FLAMINGO PINK/i, valor: "FLAMINGO PINK" },
    { regex: /MOSS GREEN/i, valor: "MOSS GREEN" },
    { regex: /MOON WHITE/i, valor: "MOON WHITE" },
    { regex: /WILD GREEN/i, valor: "WILD GREEN" },
    { regex: /DESERT KHAKI/i, valor: "DESERT KHAKI" },
    { regex: /SPACE GRAY/i, valor: "SPACE GRAY" },
    { regex: /OBSIDIAN BLACK/i, valor: "OBSIDIAN BLACK" },
    { regex: /MISTY WHITE/i, valor: "MISTY WHITE" },
    { regex: /MINT BLUE/i, valor: "MINT BLUE" },
    { regex: /ASTRO BLACK/i, valor: "ASTRO BLACK" },
    { regex: /EMBER BLACK/i, valor: "EMBER BLACK" },
    { regex: /INFINITE BLACK/i, valor: "INFINITE BLACK" },
    { regex: /THUNDER BLACK/i, valor: "THUNDER BLACK" },
    { regex: /PETAL PINK/i, valor: "PETAL PINK" },
    { regex: /SPACE BLACK/i, valor: "SPACE BLACK" },
    { regex: /CINZA ESPACIAL/i, valor: "CINZA ESPACIAL" },
    
    { regex: /MIDNIGHT/i, valor: "MIDNIGHT" },
    
    { regex: /GOLD/i, valor: "GOLD" },
    { regex: /BLUE/i, valor: "BLUE" },
    { regex: /PRETO/i, valor: "PRETO" },
    { regex: /ROSA/i, valor: "ROSA" },
    { regex: /AZUL/i, valor: "AZUL" },
    { regex: /PINK/i, valor: "PINK" },
    { regex: /BLACK/i, valor: "BLACK" },
    { regex: /IVORY/i, valor: "IVORY" },
    { regex: /YVORY/i, valor: "IVORY" },
    { regex: /MARFIM/i, valor: "MARFIM" },
    { regex: /CREAM/i, valor: "CREAM" },
    { regex: /BROWN/i, valor: "BROWN" },
   
    
];

const ORIGEM_MAPEAMENTO: Mapeamento_Item[] = [
    { regex: /ÍNDIA|INDIA/i, valor: "INDIA" },
    { regex: /GLOBAL/i, valor: "GLOBAL" },
    { regex: /INDONESIA/i, valor: "INDONESIA" }
];

const CATEGORIA_MAPEAMENTO: Mapeamento_Item[] = [
    { regex: /CELULAR/i, valor: "CELULAR" },
    { regex: /RELOGIO/i, valor: "RELOGIO" },
    { regex: /NOTEBOOK/i, valor: "NOTEBOOK" }
];


function identifica_Valor(produtoLoja: IProdutoLoja, mapeamento: Mapeamento_Item[], defaultValue?: string | number | null): string | number | null {
    for (let item of mapeamento) {
        if (item.regex.test(produtoLoja.nome)) {
            return item.valor;
        }
    }
    return defaultValue ?? null;
}

export const formataSmartWatch = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {



    if (produtoLoja.nome.includes("A2783 RED")) produtoLoja.nome = produtoLoja.nome.replace("A2783 RED", "VERMELHO");


    const marca = identifica_Valor(produtoLoja, MARCAS_MAPEAMENTO);
    if (marca) produtoLoja.marca = marca as string;

    const pulseiraMedida = identifica_Valor(produtoLoja, CAIXA_MEDIDA_MAPEAMENTO);
    if (pulseiraMedida) produtoLoja.caixaMedida = pulseiraMedida as string;

    const tipoPulseira = identifica_Valor(produtoLoja, TIPO_PULSEIRA_MAPEAMENTO);
    if (tipoPulseira) produtoLoja.tipoPulseira = tipoPulseira as string;


    const ram = identifica_Valor(produtoLoja, RAM_MAPEAMENTO);
    if (ram) produtoLoja.ram = ram as number;

    const capacidade = identifica_Valor(produtoLoja, CAPACIDADE_MAPEAMENTO);
    if (capacidade) produtoLoja.capacidade = capacidade as number;

    const cor = identifica_Valor(produtoLoja, COR_MAPEAMENTO);
    if (cor) produtoLoja.cor = cor as string;

    const rede = identifica_Valor(produtoLoja, REDE_MAPEAMENTO);
    if (rede) produtoLoja.rede = rede as number;

    const origem = identifica_Valor(produtoLoja, ORIGEM_MAPEAMENTO, "GLOBAL");
    if (origem) produtoLoja.origem = origem as string;

    const categoria = identifica_Valor(produtoLoja, CATEGORIA_MAPEAMENTO);
    if (categoria) produtoLoja.categoria = categoria as string;

    let novoNome = produtoLoja.nome;

  

    if (cor) novoNome = novoNome.replace(/LIGHTNING GRAY|CINZA ESPACIAL|LIGHTNINGGRAY|ONYX PEBBLE GREY|MOONLIGHT BRANCO|MOONLIGHT GRAY|FLAMINGO PINK|SPACE BLACK|EMBER BLACK|PETAL PINK|THUNDER BLACK|INFINITE BLACK|MOSS GREEN|MOON WHITE|OBSIDIAN BLACK|SPACE GRAY|MISTY WHITE|MINT BLUE|DESERT KHAKI|ASTRO BLACK|WILD GREEN|E SQUARE M.GREY|MIDNIGHT|OCEAN|GOLD|BLACK|PRETO|ROSA|AZUL|PINK|IVORY|YVORY|BROWN|CREAM|WHITE|MARFIM|BLUE/gi, '');
    if (capacidade) novoNome = novoNome.replace(new RegExp(/C1024GB|C512GB|C256GB|C128GB|C64GB|C32GB|C16GB/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(/R16GB|R12GB|R8GB|R6GB|R4GB|R3GB|R2GB|R1GB|\- LPDDR5 \-|LPDDR5/gi, '');
    if (categoria) novoNome = novoNome.replace(/RELOGIO/gi, '');
    if (pulseiraMedida) novoNome = novoNome.replace(/49MM|47MM|46MM|45MM|44MM|42MM|41MM|40MM|39MM|38MM|2MM/gi, '');
    if (marca) novoNome = novoNome.replace(/XIAOMI|APPLE|SAMSUNG/gi, '');
    if (tipoPulseira) novoNome = novoNome.replace(/SPORT/gi, '');
    novoNome = novoNome.replace(/\(A2174\)|BHR5439GL -|M2116W BHR5381GL|\(MKQ63LL\/A\)|MU9F2AM\/A \-|MQFK3BE\/A \-|MQF53LZ\/A \-|MQET3LL\/A \-|MQF53LL\/A \-|MQF33LL\/A \-|MQEV3LL\/A \-|MQF23LL\/A \-|MKQU3LL\/A \-|MQF13LL\/A \-|MKQ53LL\/A|MKQN3LL\/A|M2141B1 BHR5970GL|MKQ83LL\/A|FNTF3LL\/A \-|MNTG3LL\/A \-|FNT73LL\/A|\(MKQ13LL\/A\)|\(MKQ03LL\/A\)|MNUQ3LL\/A \-|MNUF3LL\/A|MNU93LL\/A \-|MP6P3LL\/A|MNU93LL\/A \-|MNU83LL\/A|MNU73LL\/A \-|MP6Q3LL\/A|MNUU3LL\/A \-|MNUP3LL\/A \-|MNUP3LL\/A \-|MNUL3LL\/A|MKNY3LL\/A|MTEY2LL\/A|MNUJ3LL\/A \-|MTF02LL\/A|MTF22LL\/A|MNP13ZP\/A|MTF32LL\/A|MKN03LL\/A|MKJ93LL\/A|MNC03LZ\/A|M2116W BHR5467GL|M2116W BHR5380GL|M2141B1 BHR6076GL|BHR6854GL|M2131W1|BHR6851GL|BHR5724GL|BHR5501GL|A2770|M2109W1|A2035|A1971|A1952|A2171|A1952|A2040|A1969|A2018|A2021|A2168|A2176|A2170/gi, '');
    novoNome = novoNome.replace(/ATIVADO| BAND|SMART/gi, '');


    produtoLoja.nome = novoNome.replace(/\s+/g, ' ');

    return produtoLoja;
}
