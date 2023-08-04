import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const formataSamsungCellShop = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {

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
                    /FOREST GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                        /GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                            /PRETO ESPACIAL/i.test(produtoLoja.nome) ? "PRETO" :
                                /SPACE BLAC/i.test(produtoLoja.nome) ? "PRETO" :
                                /SPACE BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                /SPACE/i.test(produtoLoja.nome) ? "PRETO" :
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
                                                                                                                        /LAVENDER/i.test(produtoLoja.nome) ? "ROXO" :
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
                                                                                                                                                                                        /WHITE PEARL/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                        /PEARL WHITE/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                            /WHITE/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                                /VIOLET/i.test(produtoLoja.nome) ? "VIOLETA" :
                                                                                                                                                                                                    /GRAY/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                        /GREY/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                            /CORAL/i.test(produtoLoja.nome) ? "CORAL" :
                                                                                                                                                                                                            /AURORA/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /CARBON/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                            /PEBBLE/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                                            /SEA/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /POLAR/i.test(produtoLoja.nome) ? "PRATA" :
                                                                                                                                                                                                            /SKY/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /MATE/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /SUNSET/i.test(produtoLoja.nome) ? "VERMELHO" :
                                                                                                                                                                                                            /DARK NIGHT/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                                                                                                                                            /TWILIGHT/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /ONIX/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                            /MOONLIGHT/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                                                                                                                                            /NEPTUNE/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /MOONSHADOW/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                            /STARSCAPE/i.test(produtoLoja.nome) ? "AZUL" :
                                                                                                                                                                                                            /LIME/i.test(produtoLoja.nome) ? "LIME" :
                                                                                                                                                                                                            /LAVAN/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                                                                                                            /OLIVE/i.test(produtoLoja.nome) ? "VERDE" :
                                                                                                                                                                                                            /CREAM/i.test(produtoLoja.nome) ? "BRANCO" :
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
    if (cor) novoNome = novoNome.replace(/VERDE|AZUL|ROXO|CINZA|PRETO|LITE GREEN|BRANCO|ONYX BLACK|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|SPACE BLAC|NEPTUNE|LAVAN|MOONLIGHT|OLIVE|CREAM|SPACE BLACK|LIME|SPACE|LIGHT BLUE|MOONSHADOW|SILVER|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|ONIX|DARK NIGHT|TWILIGHT|PEBBLE|POLAR|LAVENDER PURPLE|LAVENDER|SUNSET|CARBON|MATE|PRATA|PEPPY PURPLE|AMARELO|AURORA|FOREST GREEN|PINK|ROSA|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO|DEEP PURPLE|STARLIGHT|PURPLE|GREEN|COPPER|STARSCAPE|PEARL WHITE|PEARL|WHITE|VIOLET|GRAY|GREY|ONYX|CORAL|MIRAGE|SEA|SKY/gi, '');
    if (rede) novoNome = novoNome.replace(/ 4G\b| 5G\b/gi, '');
    if (capacidade) novoNome = novoNome.replace(new RegExp(/C1024GB|C512GB|C256GB|C128GB|C64GB|C32GB|C16GB/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(/R12GB|R8GB|R6GB|R4GB|R3GB|R2GB|R1GB/gi, '');
    novoNome = novoNome.replace(/XIAOMI|APPLE|SAMSUNG/gi, '');
    novoNome = novoNome.replace(/CELULAR|CEL|DUAL SIM|ADAPTADOR|CORE|GARANTIA|GARANTI|CARREGADOR PADRAO ARG|SO PAR|ASIL|DESLACRADO S TIGO PERSONA|ATLA|\(VITRINA\)|\*\*(?!.*\*\*)|\S L(?!.*\S L)|C FEA(?!.*C FEA)|GAR(?!.*GAR)|BR(?!.*BR)|PY AR(?!.*PY AR)|RDF(?!.*RDF)|\-(?!.*\-)|US(?!.*US)|DP(?!.*DP)|K(?!.*K)|DG(?!.*DG)|NFC(?!.*NFC)|L P-(?!.*L P-)|L P(?!.*L P)|\.(?!.*\.)|\S CAPA(?!.*\S CAPA)|(?!.*\S CAPA)|\s\+(?!.*\s\+)/gi, '').replace(/\s+/g, ' ').trim();
    novoNome = novoNome.replace(/\(\s*\)/g, '').trim();
    produtoLoja.nome = novoNome;

    return produtoLoja;
}
