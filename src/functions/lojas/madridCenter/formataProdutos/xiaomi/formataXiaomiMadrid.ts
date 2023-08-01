import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const formataXiaomiMadrid = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {

    const marca =
        /XIAOMI/i.test(produtoLoja.nome) ? "XIAOMI" :
            null;

    if (marca !== null) {
        produtoLoja.marca = marca;
    }



    const ram =
        /32\+/i.test(produtoLoja.nome) ? 32 :
            /32G\+/i.test(produtoLoja.nome) ? 32 :
                /16\+/i.test(produtoLoja.nome) ? 16 :
                    /16G\+/i.test(produtoLoja.nome) ? 16 :
                        /12\+/i.test(produtoLoja.nome) ? 12 :
                            /12G\+/i.test(produtoLoja.nome) ? 12 :
                                /12\//i.test(produtoLoja.nome) ? 12 :
                                    /8\+/i.test(produtoLoja.nome) ? 8 :
                                        /8G\+/i.test(produtoLoja.nome) ? 8 :
                                            /8\//i.test(produtoLoja.nome) ? 8 :
                                                /6\+/i.test(produtoLoja.nome) ? 6 :
                                                    /6G\+/i.test(produtoLoja.nome) ? 6 :
                                                        /6\//i.test(produtoLoja.nome) ? 8 :
                                                            /4\+/i.test(produtoLoja.nome) ? 4 :
                                                                /4G\+/i.test(produtoLoja.nome) ? 4 :
                                                                    /4\//i.test(produtoLoja.nome) ? 4 :
                                                                        /3\+/i.test(produtoLoja.nome) ? 3 :
                                                                            /3\//i.test(produtoLoja.nome) ? 3 :
                                                                                /3G\+/i.test(produtoLoja.nome) ? 3 :
                                                                                    /2\+/i.test(produtoLoja.nome) ? 2 :
                                                                                        /2\//i.test(produtoLoja.nome) ? 2 :
                                                                                            /2G\+/i.test(produtoLoja.nome) ? 2 :
                                                                                                /2GB\+/i.test(produtoLoja.nome) ? 2 :
                                                                                                    null;

    if (ram !== null) {
        produtoLoja.ram = ram;
    }


    const capacidade =
        /\+512/i.test(produtoLoja.nome) ? 512 :
            /\+512G/i.test(produtoLoja.nome) ? 512 :
                /512GB/i.test(produtoLoja.nome) ? 512 :
                    /\+256/i.test(produtoLoja.nome) ? 256 :
                        /\+256G/i.test(produtoLoja.nome) ? 256 :
                            /256GB/i.test(produtoLoja.nome) ? 256 :
                                /\+128/i.test(produtoLoja.nome) ? 128 :
                                    /\+128G/i.test(produtoLoja.nome) ? 128 :
                                        /128GB/i.test(produtoLoja.nome) ? 128 :
                                            /\+64/i.test(produtoLoja.nome) ? 64 :
                                                /\+64G/i.test(produtoLoja.nome) ? 64 :
                                                    /64GB/i.test(produtoLoja.nome) ? 64 :
                                                        /\+32/i.test(produtoLoja.nome) ? 32 :
                                                            /\+32G/i.test(produtoLoja.nome) ? 32 :
                                                                /32GB/i.test(produtoLoja.nome) ? 32 :
                                                                    null;


    if (capacidade !== null) {
        produtoLoja.capacidade = capacidade;
    }

    const rede =
        /\b5G\b/i.test(produtoLoja.nome) ? 5 :
            /\b4G\b/i.test(produtoLoja.nome) ? 4 :
                /\bLTE\b/i.test(produtoLoja.nome) ? 4 :
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
                                                                                                                                                                                                    /GRAY/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                        /GREY/i.test(produtoLoja.nome) ? "CINZA" :
                                                                                                                                                                                                            /CORAL/i.test(produtoLoja.nome) ? "CORAL" :
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
    let posicaoUltimo2plus = produtoLoja.nome.lastIndexOf(" 2+");
    let posicaoUltimoBarra = produtoLoja.nome.lastIndexOf("/");

   // let novoNome = produtoLoja.nome;

    // Pega a última ocorrência entre " 2+" e "/"
    let posicaoCorte = Math.max(posicaoUltimo2plus, posicaoUltimoBarra);

    let posicaoUltimoDS = produtoLoja.nome.indexOf("DS");

     let novoNome = posicaoUltimoDS !== -1 ? produtoLoja.nome.substring(0, posicaoUltimoDS) : produtoLoja.nome;



    if (origem) novoNome = novoNome.replace(/GLOBAL|INDIA|INDONESIA|CHINA/gi, '').trim();
    if (cor) novoNome = novoNome.replace(/VERDE|AZUL|CINZA|PRETO|LITE GREEN|BRANCO|ONYX BLACK|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|LIGHT BLUE|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|LAVENDER PURPLE|PRATA|PEPPY PURPLE|AMARELO|FOREST GREEN|PINK|ROSA|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO|DEEP PURPLE|STARLIGHT|PURPLE|GREEN|COPPER|WHITE|VIOLET|GRAY|GREY|CORAL/gi, '');
    if (rede) novoNome = novoNome.replace(/\b4g\b|\b4G\b|\b5g\b|\b5G\b|\b2G\+\b|\b3G\b|\b LTE\b/gi, '').replace(/ \+| 2\+/g, '').trim();
    if (capacidade) novoNome = novoNome.replace(new RegExp(/\b512GB\b|\b512G\b|\b512\b|\b256GB\b|\b256G\b|\b256GB\b|\b256\b|\b128GB\b|\b128G\b|\b128\b|\b64GB\b|\b64G\b|\b64\b|\b32GB\b|\b32G\b|\b32\b|\b16GB\b|\b16G\b|\b16\b/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(/16\+|12\+|8G\+|8\+|6G\+|6\+|4\+|3\+|2GB\+|\b12\/|\b8\/|\b6\//gi, '');
    novoNome = novoNome.replace(/XIAOMI|APPLE/gi, '');
    novoNome = novoNome.replace(/CELULAR|CEL/gi, '').replace(/\s+/g, ' ').trimStart();

    produtoLoja.nome = novoNome;

    return produtoLoja;
}
