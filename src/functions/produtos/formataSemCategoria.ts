import { IProdutoLoja } from "@/datatypes/ProdutoLoja";



interface Mapeamento_Item {
    regex: RegExp;
    valor: string | number;
}

const MARCAS_MAPEAMENTO = [
    { regex: /XIAOMI/i, valor: "XIAOMI" },
    { regex: /IPHONE/i, valor: "APPLE" },
    { regex: /SAMSUNG/i, valor: "SAMSUNG" }
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
    { regex: /VERDE/i, valor: "VERDE" },
    { regex: /BURGUNDY/i, valor: "BURGUNDY" },
    { regex: /BIEGE|BEIGE/i, valor: "BIEGE" },
    { regex: /BLANCO|BRANCO/i, valor: "BRANCO" },
    { regex: /MINT GREEN|LITE GREEN|FOREST GREEN|GREEN|MINT/i, valor: "VERDE" },
    { regex: /AZUL|GLACIER BLUE|ICE BLUE|TWILIGHT BLUE|TWILIGHT|STAR BLUE|LIGHT BLUE|OCEAN BLUE/i, valor: "AZUL" },
    { regex: /CINZA|SILVER|GRANITE GREY/i, valor: "CINZA" },
    { regex: /PRETO|BLACK|DARK NIGHT|ONYX GRAY|GRAPHITE GRAY|GRAPHITE|ONYX BLACK|MIDNIGHT/i, valor: "PRETO" },
    { regex: /ROXO|COSMIC PURPLE|LAVANDER PURPLE|LAVENDER PURPLE|LAVENDER|PEPPY PURPLE/i, valor: "ROXO" },
    { regex: /BRONZE/i, valor: "BRONZE" },
    { regex: /COPPER/i, valor: "COPPER" },
    { regex: /PRATA/i, valor: "PRATA" },
    { regex: /AMARILLO|AMARELO/i, valor: "AMARELO" },
    { regex: /CORAL/i, valor: "CORAL" },
    { regex: /PINK|ROSA|ROSE/i, valor: "ROSA" },
    { regex: /VERMELHO|SUNSET/i, valor: "VERMELHO" },
    { regex: /ESTELAR|STARLIGHT|WHITE|PEBBLE|CREAM/i, valor: "BRANCO" },
    { regex: /GOLD/i, valor: "GOLD" },
    { regex: /PURPLE|PRUPLE|VIOLET/i, valor: "ROXO" },
    { regex: /BLUE|AURORA|SEA|SKY|MATE|NEPTUNE|STARSCAPE|STAR BLU/i, valor: "AZUL" },
    { regex: /YELLOW/i, valor: "AMARELO" },
    { regex: /DOURADO/i, valor: "DOURADO" },
    { regex: /ORANGE|LARANJA/i, valor: "LARANJA" },
    { regex: /GRAY|GREY|GRAF.GRAY|ONIX|ONYX|CARBON|MOONSHADOW/i, valor: "CINZA" },
    { regex: /POLAR/i, valor: "PRATA" },
    { regex: /LIME/i, valor: "LIME" },
    { regex: /LAVAN/i, valor: "ROXO" },
    { regex: /OLIVE/i, valor: "VERDE" },
    { regex: /MOONLIGHT/i, valor: "BRANCO" }
];

const ORIGEM_MAPEAMENTO: Mapeamento_Item[] = [
    { regex: /ÍNDIA|INDIA/i, valor: "INDIA" },
    { regex: /GLOBAL/i, valor: "GLOBAL" },
    { regex: /INDONESIA/i, valor: "INDONESIA" },
    { regex: /CHINA/i, valor: "CHINA" }
];

const CATEGORIA_MAPEAMENTO: Mapeamento_Item[] = [
    { regex: /CELULAR/i, valor: "CELULAR" },
    { regex: /RELOGIO/i, valor: "RELOGIO" },
];


function identifica_Valor(produtoLoja: IProdutoLoja, mapeamento: Mapeamento_Item[], defaultValue?: string | number | null): string | number | null {
    for (let item of mapeamento) {
        if (item.regex.test(produtoLoja.nome)) {
            return item.valor;
        }
    }
    return defaultValue ?? null;
}

export const formataSemCategoria = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {

if(produtoLoja.nome.includes("A2783 RED")) produtoLoja.nome= produtoLoja.nome.replace("A2783 RED","VERMELHO");


    const marca = identifica_Valor(produtoLoja, MARCAS_MAPEAMENTO);
    if (marca) produtoLoja.marca = marca as string;

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

    if (origem) novoNome = novoNome.replace(/GLOBAL|\(INDIANO\)|\(INDIANO|\(ÍNDIA\)|\(INDIA\)|\(INDIA|ÍNDIA|INDIA|INDONESIA|CHINA/gi, '').trim();
    if (cor) novoNome = novoNome.replace(/A2783 RED|ROXO PROFUNDO|PRETO ESPACIAL|CHROME SILVER|VERDE|ICY BLUE|GRAF.GRAY|BIFROST BLUE|GLACIAR|GRAF.G|GLAC.B|STAR BLUE|STAR BLU|AWESOME GRAPHITE|ICE AZUL|COOL AZUL|AZUL|ROXO|CINZA ESCURO|BIEGE|BEIGE|CINZA|PRETO|LITE GREEN|BRANCO|CORAL|BURGUNDY|DARK NIGHT|NIGHT|BLANCO|ORANGE|LARANJA|AMARILLO|NEBULA|ONYX BLACK|SUNRISE|POWER BLACK|POW BLACK|CHARCOAL BLACK|S.BLACK|PHANTOM BLACK|ESTELAR|BLACK|GLACIER BLUE|LIGHT GREEN|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|ONYX GRAY|BRONZE|SPACE BLACK|SPACE BLAC|NEPTUNE|LAVANDER PURPLE|LAVANDER|LAVAN|MOONLIGHT|OLIVE|CREAM|SPACE BLACK|LIME|SPACE|LIGHT BLUE|MOONSHADOW|GRAFITE|C.SILVER|SILVER|GRAPHITE GRAY|OCEAN BLUE|ONIX|DARK NIGHT|TWILIGHT|PEBBLE|POLAR|LAVENDER PURPLE|LAVENDER|SUNSET|CARBON|MATE|PRATA|PEPPY PURPLE|AMARELO|MINT|AURORA|FOREST GREEN|PINK|ROSA|HORIZON BLUE|LASER BLUE|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO|DEEP PURPLE|STARLIGHT|D.PURPLE|PURPLE|PRUPLE|GREEN|COPPER|STARSCAPE|PEARL WHITE|PEARL|STARDUST WHITE|ASTRAL WHITE|WHITE|VIOLET|METEORITE GRAY|SLATE GRAY|GRA GRAY|G.GRAY|GRAY|VIOLET|ONYX GREY\*|GREY|COPPER|GLACIAL|GRANITE|CORAL|MIRAGE|SEA|SKY|ONYX|WHITE|ROSE/gi, '');
    if (rede) novoNome = novoNome.replace(/ 4G\b| 5G\b|/gi, '');
    if (capacidade) novoNome = novoNome.replace(new RegExp(/C1024GB|C512GB|C256GB|C128GB|C64GB|C32GB|C16GB/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(/R16GB|R12GB|R8GB|R6GB|R4GB|R3GB|R2GB|R1GB|\- LPDDR5 \-|LPDDR5/gi, '');
    if (categoria) novoNome = novoNome.replace(/CELULAR|RELOGIO/gi, '');
    novoNome = novoNome.replace(/XIAOMI|APPLE|SAMSUNG/gi, '');
    novoNome = novoNome.replace(/200MP|108MPX|108MP\+|64MP\+|64MP \+|50MP\+|54\/32MPX|13MP \+|13MP\+|DE 12MP\+|E 12MP|12MP\+|12MP|8MP \+|8MP\+|8 MP\+|5MP \+|0.08MP E|0.08 MP|0.8MP E|0.3MP|HDR10\+|\+2MP E|\+ 16MP|\+16MP|\+8MP|\+2MP|50MP|48MP\+|48MP|16MP|E 13MP|13MP|E 8MP|8MP|E 5MP|5MP|E 32MP|E 20MP|E 16MP|E 2MP|2MP|\+ E|13\+8\+2|4K/g, '');
    novoNome = novoNome.replace(/GOLBAL|\(CAIXA DANIFICADA\)|\(SIM FISICO\)|S ACS|CÂMERAS DUPLA|CÂMERA DUPLA|CÁMARA DUPLA|ESIM|CORE|\(CX FEIA\)|\(LACRE PEQUENO\)|\(Dual SIM Físico\)|\(DUAL SIM FIS|\(SIM FÍSICO\)|A \(CPO\)|\(CPO\)|LTE|SEM LACRE|OLED|LCD|C ROTA|S LACRE|\(CARREGADOR 3 PINOS\)|CEL|DUAL SIM|TELA|CÂMERA QUÁDRUPLA|CÂMERAS DE|CÂMERAS |CÂMERAS|TRIPLA|CÂMERA|\+ ADAPTADOR|\+ADAPTADOR|\+ADATAP|ADAPTADOR|DESLACRADO S TIGO PERSONA|ATLA|\(VITRINA\)|\(VITRINA\)|C FEA(?!.*C FEA)|\-(?!.*\-)|DP(?!.*DP)|DG(?!.*DG)|\(NFC\)(?!.*\(NFC\))|NFC(?!.*NFC)|L P-(?!.*L P-)|US L P(?!.*US L P)|L P(?!.*L P)|US(?!.*US)|\.(?!.*\.)|\S CAPA(?!.*\S CAPA)|GLO(?!.*GLO)|(?!.*\S CAPA)/gi, '').replace(/\s+/g, ' ').trim();
    novoNome = novoNome.replace(/\s643|\s653"|\s628''|\s667|\s67''|\s61''|SLIM BOX|\(SIM FÍSICO\+\)|\(SIM FÍSICO\+ \)|\(SIM FÍSICO SIM\)|\(SIM FISICO\+\)|D\+ \(CAIXA SLIM\)|\(CAIXA SLIM\)|JP SLIM BOX|LACP|C DETALLE|\(CARREGADOR PADRAO ARG\)|\(NANOSIMESIM\)|OPEN BOX 30 DIAS GARANTIA|\(30 DIAS GARANTIA\)|OPEN BOX 30 DIAS GAR|OPEN BOX|GT667"|\(ANATEL\)|\(C.F\)|\(CF\)|S CX S ACS| S L|S CX|CAM13\+2| ALED| CPO|\(SIM\)| LT(?!.* LT)/g, '');
    novoNome = novoNome.replace(/\s65''| LL| LZ/g, '');
    novoNome = novoNome.replace(/MLPH3LZ A2633|C6GB|MLQ63LZ A2633|MLQ73LZ A2633|A2633 HN|A2633HN|A2890 BE|A2890BE|A2894BE|FGJ63B|FGJ93B|MLPG3LZ|A2484|A2651|A2402 3J|A2402|A2892 CH|A2892|A2893 3J|A2893|MLQA3LZ|A2884 CH|A2884|A2886 AA|A2886 BEA|A2886 BE|A2886 HNA|A2886 HN|A2886|A2221|FJNP3B|FGJG3B|A2882 HN|A2882HN|A2882 BE|MQAJ3BE|MPUR3BE|A2894|MQC23BE|A2890|MQ2V3BE|MPWA3BE|MPV03BE|A2882|FGJH3ZD|FJNM3B|FGJG3QL|FGJF3B|FGJA3B|A A2403 HN|A2403 HN|A2403 QL|A2403 ZD|A2650 CH|A A2403|A2403 LE|A2403 CH|FGJC3B|A2403|FGJC3ZD|A2650|A2215|A2160|VC A1984|A1984|A1920|A2161|A2783|A2650LL|A2218 ZD|A2218 2B|A2218|BE A2886|A1864|A2275|A2896 CH|A2896CH|A2896|A2651LL|A2633|MQ9X3BE A2894|LZ A2221|MQ503BE A2886|MR6D3BE A2886|MHDJ3LZ A2221|MQ523BE A2886|MQ083BE A2890|MQ9U3BE A2894|MQ023BE A2890|MPVN3BE A2882|MNGK3LZ A2633|MLPK3LZ A2633|MLPF3LZ A2633|MPUF3BE A2882|MQ913LL A2651|MQ9P3BE A2894|MHDC3LZ A2221|MQ9T3BE A2894|MQ9W3BE A2894|MQ0G3BE A2890|MQ183BE A2890|MQ1F3BE A2890|MLQ83LZ A2633/g, '');  //Iphone
    novoNome = novoNome.replace(/G990E GARANTIPY AR|G990E GARANTIA PY AR|GARPY AR|F711B SS|SMG990E|SMA032F|SMS918B|F711B|F936B|SMA042F|SMF946B|SMF731B|SMA032F|SMS911B|SMA546E|SMA346M|SMS916B|SMA245M|SMA146M|SMA145M|SMA107M|SMA047M|SMA042M|SMA037M|CORE SMA032F|SMA035M|S918B|F946B|A042F|F731B|A032F|A536E|S911B|A236M|A546E|A346M|S916B|A245M|A146M|A145M|A107M|A047M|A042M|A037M|CORE A032F|A035M|S908E|\(SO PAR BRASIL\)|BR| RDF/g, '');  //SAMSUNG
 
   
    produtoLoja.nome = novoNome.replace(/\s+/g, ' ');

    return produtoLoja;
}
