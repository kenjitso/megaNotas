import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const formataXiaomiMega = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {

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
                                /8\+/i.test(produtoLoja.nome) ? 8 :
                                    /8G\+/i.test(produtoLoja.nome) ? 8 :
                                        /6\+/i.test(produtoLoja.nome) ? 6 :
                                            /6G\+/i.test(produtoLoja.nome) ? 6 :
                                                /4\+/i.test(produtoLoja.nome) ? 4 :
                                                    /4G\+/i.test(produtoLoja.nome) ? 4 :
                                                        /3\+/i.test(produtoLoja.nome) ? 3 :
                                                            /3G\+/i.test(produtoLoja.nome) ? 3 :
                                                                /2\+/i.test(produtoLoja.nome) ? 2 :
                                                                    /2G\+/i.test(produtoLoja.nome) ? 2 :
                                                                        /2GB\+/i.test(produtoLoja.nome) ? 2 :
                                                                            null;

    if (ram !== null) {
        produtoLoja.ram = ram;
    }


    const capacidade =
        /\+512/i.test(produtoLoja.nome) ? 512 :
            /\+512G/i.test(produtoLoja.nome) ? 512 :
                /\+256/i.test(produtoLoja.nome) ? 256 :
                    /\+256G/i.test(produtoLoja.nome) ? 256 :
                        /\+128/i.test(produtoLoja.nome) ? 128 :
                            /\+128G/i.test(produtoLoja.nome) ? 128 :
                                /\+64/i.test(produtoLoja.nome) ? 64 :
                                    /\+64G/i.test(produtoLoja.nome) ? 64 :
                                        /\+32/i.test(produtoLoja.nome) ? 32 :
                                            /\+32G/i.test(produtoLoja.nome) ? 32 :
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

        /PRETO/i.test(produtoLoja.nome) ? "PRETO" :
            /VERDE/i.test(produtoLoja.nome) ? "VERDE" :
                /CINZA/i.test(produtoLoja.nome) ? "CINZA" :
                    /BRANCO/i.test(produtoLoja.nome) ? "BRANCO" :
                        /AZUL/i.test(produtoLoja.nome) ? "AZUL" :
                            /AMARELO/i.test(produtoLoja.nome) ? "AMARELO" :
                                /SILVER/i.test(produtoLoja.nome) ? "SILVER" :
                                    /ROXO/i.test(produtoLoja.nome) ? "ROXO" :
                                        /ROSA/i.test(produtoLoja.nome) ? "ROSA" :
                                        /DOURADO/i.test(produtoLoja.nome) ? "DOURADO" :
                                        / B/i.test(produtoLoja.nome) ? "BRANCO" :
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
    
    let novoNome = produtoLoja.nome;

    // Pega a última ocorrência entre " 2+" e "/"
    let posicaoCorte = Math.max(posicaoUltimo2plus, posicaoUltimoBarra);

    // Se nenhum existe, o nome original é mantido
    if (posicaoCorte !== -1) {
        // Caso contrário, corta a string no último " 2+" ou "/"
        novoNome = novoNome.substring(0, posicaoCorte);
    }


    if (origem) novoNome = novoNome.replace(/GLOBAL|INDIA|INDONESIA|CHINA/gi, '').trim();
    if (cor) novoNome = novoNome.replace(/PRETO|VERDE|CINZA|BRANCO|AMARELO|AZUL|ROXO|ROSA|SILVER|DOURADO|\(BR CN\)/gi, '');
    if (rede) novoNome = novoNome.replace(/\b4g\b|\b4G\b|\b5g\b|\b5G\b|\b2G\+\b|\b3G\b|\b LTE\b/gi, '').replace(/ \+| 2\+/g, '').trim();
    if (capacidade) novoNome = novoNome.replace(new RegExp(/\b512GB\b|\b512G\b|\b512\b|\b256GB\b|\b256G\b|\b256\b|\b128GB\b|\b128G\b|\b128\b|\b64GB\b|\b64G\b|\b64\b|\b32GB\b|\b32G\b|\b32\b|\b16GB\b|\b16G\b|\b16\b/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(/16\+|12\+|8G\+|8\+|6G\+|6\+|4\+|3\+|2GB\+/gi, '');
    novoNome = novoNome.replace(/XIAOMI|APPLE/gi, '');
    novoNome = novoNome.replace(/CELULAR/gi, '').replace(/\s+/g, ' ').trimStart();

    produtoLoja.nome = novoNome;

    return produtoLoja;
}
