import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const formataSamsungMadrid = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {
    const marca =
        /SAMSUNG/i.test(produtoLoja.nome) ? "SAMSUNG" :
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
                                /32GB/i.test(produtoLoja.nome) ? 32 :
                                    /64GB/i.test(produtoLoja.nome) ? 64 :
                                        /128GB/i.test(produtoLoja.nome) ? 128 :
                                            /256GB/i.test(produtoLoja.nome) ? 256 :
                                                /512/i.test(produtoLoja.nome) ? 512 :

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
                    /FOREST GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                        /GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                            /PRETO ESPACIAL/i.test(produtoLoja.nome) ? "PRETO" :
                                /SPACE BLAC/i.test(produtoLoja.nome) ? "PRETO" :
                                    /AZUL/i.test(produtoLoja.nome) ? "AZUL" :
                                        /GLACIER BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                            /ICE BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                /TWILIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                    /STAR BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                        /LIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                            /OCEAN BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                                /CINZA/i.test(produtoLoja.nome) ? "CINZA" :
                                                                    /SILVER/i.test(produtoLoja.nome) ? "PRATA" :
                                                                        /PRETO/i.test(produtoLoja.nome) ? "PRETO" :
                                                                            /BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                /ONYX GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                    /GRAPHITE GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                        /GRAPHITE/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                            /ONYX BLACK/i.test(produtoLoja.nome) ? "PRETO" :
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
                                                                                                                                                                                        /COPPER/i.test(produtoLoja.nome) ? "COPPER" :
                                                                                                                                                                                            /WHITE/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                                /VIOLET/i.test(produtoLoja.nome) ? "VIOLETA" :
                                                                                                                                                                                                    /BURGUNDY/i.test(produtoLoja.nome) ? "BURGUNDY" :
                                                                                                                                                                                                        /CREAM/i.test(produtoLoja.nome) ? "WHITE" :
                                                                                                                                                                                                            /BEIGE/i.test(produtoLoja.nome) ? "WHITE" :
                                                                                                                                                                                                                /GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                                                                                                                                                    null;

    if (cor !== null) {
        produtoLoja.cor = cor;
    }



    const origem =

        /GLOBAL/i.test(produtoLoja.nome) ? "GLOBAL" :
            /INDIA/i.test(produtoLoja.nome) ? "INDIA" :
                /INDONESIA/i.test(produtoLoja.nome) ? "INDONESIA" :
                    /CHINA/i.test(produtoLoja.nome) ? "CHINA" :
                        null;

    if (origem !== null) {
        produtoLoja.origem = origem;
    }

    let novoNome = produtoLoja.nome;

    if (origem) novoNome = novoNome.replace(/GLOBAL|INDIA|INDONESIA|CHINA/gi, '').trim();
    if (cor) novoNome = novoNome.replace(/VERDE|AZUL|ROXO|CINZA|PRETO|LITE GREEN|AWESOME|LIGHT|BRANCO|ONYX BLACK|BURGUNDY|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|SPACE BLAC|NEPTUNE|MOONLIGHT|SPACE BLACK|SPACE|LIGHT BLUE|MOONSHADOW|SILVER|GRANITE|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|ONIX|DARK NIGHT|TWILIGHT|PEBBLE|POLAR|LAVENDER PURPLE|SUNSET|CARBON|MATE|PRATA|PEPPY PURPLE|AMARELO|AURORA|FOREST GREEN|PINK|ROSA|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO|DEEP PURPLE|STARLIGHT|PURPLE|GREEN|COPPER|STARSCAPE|PEARL WHITE|PEARL|WHITE|VIOLET|GRAY|GREY|CORAL|LARANJA|MIRAGE|SEA|SKY/gi, '');
    if (rede) novoNome = novoNome.replace(/ 4G\b| 5G\b/gi, '');
    if (capacidade) novoNome = novoNome.replace(new RegExp(/C1024GB|C512GB|C256GB|C128GB|C64GB|C32GB|C16GB|32GB|64GB|128GB|256GB|512GB/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(/R12GB|R8GB|R6GB|R4GB|R3GB|R2GB|R1GB/gi, '');
    novoNome = novoNome.replace(/XIAOMI|APPLE/gi, '');
    novoNome = novoNome.replace(/CELULAR|CEL|DUAL SIM|ESCURO|CORE|SEM LACRE|LCD|S LACRE|A\.LED|S CX S ACS| S LA| S L|\(C.F.\)|\(NO\)|\(C.F\)|DP(?!.*DP)|MP(?!.*MP)|K(?!.*K)|DG(?!.*DG)|NFC(?!.*NFC)|CRE(?!.*CRE)|\s\+(?!.*\s\+)|\.(?!.*\.)|\(.*(?!\().*$/gi, '').replace(/CAM13\+2\+2 5|CAM13\+2\+2MP 5|\s+/g, ' ').trim();



    //MODELOS ML




    //SAMSUNG
    if (novoNome.trim().toUpperCase() === ("SAMSUNG A03 SM-A032F")) produtoLoja.ram = 2;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG A04E SM-A042F")) produtoLoja.ram = 3;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG A04E SM-A042M")) produtoLoja.ram = 3;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG A04S SM-A047M")) produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG A24 SM-A245M")) produtoLoja.ram = 4;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG A24 SM-A245M")) produtoLoja.ram = 4;



    if (novoNome.trim().toUpperCase() === ("SAMSUNG A34 SM-A346M")) produtoLoja.ram = 6;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG S23+ S916B")) produtoLoja.ram = 8;



    if (novoNome.trim().toUpperCase() === ("SAMSUNG Z FLIP 3 F711B")) produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === ("SAMSUNG Z FOLD 4 F936B")) produtoLoja.rede = 5;
    produtoLoja.nome = novoNome;

    return produtoLoja;
}
