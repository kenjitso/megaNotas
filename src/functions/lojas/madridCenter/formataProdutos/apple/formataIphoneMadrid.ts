import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const formataIphoneMadrid = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {
    const marca =
        /APPLE/i.test(produtoLoja.nome) ? "APPLE" :
            null;

     if (marca !== null) {
        produtoLoja.marca = marca;
    }

    const ram =
    /R32GB/i.test(produtoLoja.nome) ? 32 :
        /R16GB/i.test(produtoLoja.nome) ? 16 :
            /R12GB/i.test(produtoLoja.nome) ? 12 :
                /R8GB/i.test(produtoLoja.nome) ? 8 :
                    /R6GB/i.test(produtoLoja.nome) ? 6 :
                        /R4GB/i.test(produtoLoja.nome) ? 4 :
                            /R3GB/i.test(produtoLoja.nome) ? 3 :
                                /R2GB/i.test(produtoLoja.nome) ? 2 :
                                    /R1GB/i.test(produtoLoja.nome) ? 1 :
                                        null;

    if (ram !== null) {
        produtoLoja.ram = ram;
    }

    const capacidade =
    /C1024GB/i.test(produtoLoja.nome) ? 1024 :
        /C512GB/i.test(produtoLoja.nome) ? 512 :
            /C256GB/i.test(produtoLoja.nome) ? 256 :
                /C128GB/i.test(produtoLoja.nome) ? 128 :
                    /C64GB/i.test(produtoLoja.nome) ? 64 :
                        /C32GB/i.test(produtoLoja.nome) ? 32 :
                            /C16GB/i.test(produtoLoja.nome) ? 16 :
                                null;

    if (capacidade !== null) {
        produtoLoja.capacidade = capacidade;
    }

    const rede =
        /\b5G\b/i.test(produtoLoja.nome) ? 5 :
            /\b4G\b/i.test(produtoLoja.nome) ? 4 :
                null;

    if (rede !== null) {
        produtoLoja.rede = rede;
    }


    const cor =
        /VERDE/i.test(produtoLoja.nome) ? "VERDE" :
            /MINT GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                /LITE GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                    /PRETO ESPACIAL/i.test(produtoLoja.nome) ? "PRETO" :
                        /SPACE BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                            /AZUL/i.test(produtoLoja.nome) ? "AZUL" :
                                /GLACIER BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                    /ICE BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                        /TWILIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                            /STAR BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                /LIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                    /OCEAN BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                        /CINZA/i.test(produtoLoja.nome) ? "CINZA" :
                                                            /SILVER/i.test(produtoLoja.nome) ? "PRATA" :
                                                                /ONYX BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                    /PRETO/i.test(produtoLoja.nome) ? "PRETO" :
                                                                        /BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                            /ONYX GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                /GRAPHITE GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                    /GRAPHITE/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                        /MIDNIGHT/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                            /BRANCO/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                /DEEP PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                    /ROXO/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                        /COSMIC PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                            /LAVANDER PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                /LAVENDER PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                    /PEPPY PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                        /BRONZE/i.test(produtoLoja.nome) ? "BRONZE" :
                                                                                                                            /PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                                /PRATA/i.test(produtoLoja.nome) ? "PRATA" :
                                                                                                                                    /AMARELO/i.test(produtoLoja.nome) ? "AMARELO" :
                                                                                                                                        /FOREST GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                                                                                                                                            /PINK/i.test(produtoLoja.nome) ? "ROSA" :
                                                                                                                                                /ROSA/i.test(produtoLoja.nome) ? "ROSA" :
                                                                                                                                                    /VERMELHO/i.test(produtoLoja.nome) ? "VERMELHO" :
                                                                                                                                                        /ESTELAR/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                            /STARLIGHT/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                /GOLD/i.test(produtoLoja.nome) ? "GOLD" :
                                                                                                                                                                    /PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                                                                        /BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                            /YELLOW/i.test(produtoLoja.nome) ? "AMARELO" :
                                                                                                                                                                                /DOURADO/i.test(produtoLoja.nome) ? "DOURADO" :
                                                                                                                                                                                /WHITE/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                /GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                                                                                                                                                                                /ROSE/i.test(produtoLoja.nome) ? "ROSA" :
                                                                                                                                                                                    null;

    if (cor !== null) {
        produtoLoja.cor = cor;
    }


    const origem =
        /ÍNDIA/i.test(produtoLoja.nome) ? "INDIA" :
            /INDIA/i.test(produtoLoja.nome) ? "INDIA" :
                /GLOBAL/i.test(produtoLoja.nome) ? "GLOBAL" :
                    /INDONESIA/i.test(produtoLoja.nome) ? "INDONESIA" :
                        "GLOBAL";

                        if (origem !== null) {
                            produtoLoja.origem = origem;
                        }
                    
                        let novoNome = produtoLoja.nome;
                    
                        if (origem) novoNome = novoNome.replace(/GLOBAL|INDIA|INDONESIA|CHINA/gi, '').trim();
                        if (cor) novoNome = novoNome.replace(/VERDE|AZUL|ROXO|CINZA|PRETO|LITE GREEN|BRANCO|ONYX BLACK|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|SPACE BLAC|NEPTUNE|MOONLIGHT|SPACE BLACK|SPACE|LIGHT BLUE|MOONSHADOW|SILVER|GRANITE|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|ONIX|DARK NIGHT|TWILIGHT|PEBBLE|POLAR|LAVENDER PURPLE|SUNSET|CARBON|MATE|PRATA|PEPPY PURPLE|AMARELO|AURORA|FOREST GREEN|PINK|ROSA|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO|DEEP PURPLE|STARLIGHT|PURPLE|GREEN|COPPER|STARSCAPE|PEARL WHITE|PEARL|WHITE|VIOLET|GRAY|GREY|CORAL|LARANJA|MIRAGE|SEA|SKY/gi, '');
                        if (rede) novoNome = novoNome.replace(/ 4G\b| 5G\b/gi, '');
                        if (capacidade) novoNome = novoNome.replace(new RegExp(/C1024GB|C512GB|C256GB|C128GB|C64GB|C32GB|C16GB/gi, 'i'), '');
                        if (ram) novoNome = novoNome.replace(/R12GB|R8GB|R6GB|R4GB|R3GB|R2GB|R1GB/gi, '');
                        novoNome = novoNome.replace(/XIAOMI|APPLE|SAMSUNG/gi, '');
                        novoNome = novoNome.replace(/CELULAR|CEL|DUAL SIM|ESCURO|SEM LACRE|S LACRE|A\.LED|OLED|S CX S ACS| S LA| S L|\(C.F.\)|\(SIM\)|\(NO\)|\(C.F\)|DP(?!.*DP)|MP(?!.*MP)|K(?!.*K)|DG(?!.*DG)|NFC(?!.*NFC)|CRE(?!.*CRE)|\s\+(?!.*\s\+)|\.(?!.*\.)/gi, '').replace(/CAM13\+2\+2 5|CAM13\+2\+2MP 5|\s+/g, ' ').trim();
                    

    //MODELOS ML



    //MODELOS
    if (novoNome.trim().toUpperCase() === "IPHONE 11 A2221") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 12 A2402 3J") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 12 A2403 HN") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 11 PRO MAX A2218 ZD") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 12 A2403 LE") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 12 A2403 QL") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 12 A2403 ZD") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 13 A2633 HN") produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 HN") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 BE") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 HN") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO A2650") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PLUS A2886 AA") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 A2884 CH") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 13 PRO MAX A2484 LL") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2896 CH") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2893 3J") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO MAX A2651") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO A2892 CH") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO A2890 BE") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 A2882 HN") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 A2882 BE") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO A2890 LE") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 13 PRO") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO MAX") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === "IPHONE 14 PRO A2650 CH") produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === ("IPHONE 13 A2633 LZ")) produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX ESIM A2651")) produtoLoja.ram = 6;



    //REDES

    if (novoNome.trim().toUpperCase() === ("IPHONE 13 A2633HN")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 A2882HN")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO A2650LL")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO A2890BE")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX A2651LL")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX A2894BE")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX A2651LL")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX A2896CH")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX A2894BE")) produtoLoja.rede = 5;


    if (novoNome.trim().toUpperCase() === ("IPHONE 13 A2633 LZ")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 13 PRO MAX A2484 LL")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PLUS *SWAP A+*")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO A2892 CH")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO MAX A2896 CH")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 12 A2403 ZD *CPO*")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("IPHONE 14 PRO A2890 LE")) produtoLoja.rede = 5;


    produtoLoja.nome = novoNome;

    return produtoLoja;
}
