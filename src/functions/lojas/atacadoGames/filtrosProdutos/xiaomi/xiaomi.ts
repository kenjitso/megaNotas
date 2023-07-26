import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const filtraXiaomiAtacadoGames = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {

    const marca =
        /XIAOMI/i.test(produtoLoja.nome) ? "XIAOMI" :
            null;

    if (marca !== null) {
        produtoLoja.marca = marca;
    }



    const ram =
        /16GB RAM/i.test(produtoLoja.nome) ? 16 :
            /16RAM/i.test(produtoLoja.nome) ? 16 :
                /12GB RAM/i.test(produtoLoja.nome) ? 12 :
                    /12RAM/i.test(produtoLoja.nome) ? 12 :
                        /8GB RAM/i.test(produtoLoja.nome) ? 8 :
                            /8RAM/i.test(produtoLoja.nome) ? 8 :
                                /6GB RAM/i.test(produtoLoja.nome) ? 6 :
                                    /6RAM/i.test(produtoLoja.nome) ? 6 :
                                        /4GB RAM/i.test(produtoLoja.nome) ? 4 :
                                        / 4GB/i.test(produtoLoja.nome) ? 4:
                                            /4RAM/i.test(produtoLoja.nome) ? 4 :
                                                /3GB RAM/i.test(produtoLoja.nome) ? 3 :
                                                    /3RAM/i.test(produtoLoja.nome) ? 3 :
                                                        /2GB RAM/i.test(produtoLoja.nome) ? 2 :
                                                            /2RAM/i.test(produtoLoja.nome) ? 2 :

                                                                null;

    if (ram !== null) {
        produtoLoja.ram = ram;
    }


    const capacidade =
        /512GB/i.test(produtoLoja.nome) ? 512 :
            /256GB/i.test(produtoLoja.nome) ? 256 :
                /128GB/i.test(produtoLoja.nome) ? 128 :
                    /64GB/i.test(produtoLoja.nome) ? 64 :
                        /32GB/i.test(produtoLoja.nome) ? 32 :
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
                    /AZUL/i.test(produtoLoja.nome) ? "AZUL" :
                        /GLACIER BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                            /ICE BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                /TWILIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                    /STAR BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                        /LIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                            /OCEAN BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                /CINZA/i.test(produtoLoja.nome) ? "CINZA" :
                                                    /SILVER/i.test(produtoLoja.nome) ? "CINZA" :
                                                        /PRETO/i.test(produtoLoja.nome) ? "PRETO" :
                                                            /BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                /ONYX GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                    /GRAPHITE GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                        /GRANITE GREY/i.test(produtoLoja.nome) ? "CINZA" :
                                                                            /GRAPHITE/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                /ONYX BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                    /MIDNIGHT/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                        /BRANCO/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                            /ROXO/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                /COSMIC PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                    /LAVANDER PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                        /LAVENDER PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                            /PEPPY PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                                /BRONZE/i.test(produtoLoja.nome) ? "BRONZE" :
                                                                                                                    /PRATA/i.test(produtoLoja.nome) ? "PRATA" :
                                                                                                                        /AMARELO/i.test(produtoLoja.nome) ? "AMARELO" :
                                                                                                                            /FOREST GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                                                                                                                                /GREEN/i.test(produtoLoja.nome) ? "VERDE" :
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
                                                                                                                                                                            /ORANGE/i.test(produtoLoja.nome) ? "LARANJA" :
                                                                                                                                                                            /GRAY/i.test(produtoLoja.nome) ? "CINZA":
                                                                                                                                                                            /GREY/i.test(produtoLoja.nome)?"CINZA":
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
    let posicaoUltimoDS = produtoLoja.nome.indexOf("/");
    let novoNome = posicaoUltimoDS !== -1 ? produtoLoja.nome.substring(0, posicaoUltimoDS) : produtoLoja.nome;



    if (origem) novoNome = novoNome.replace(/INDIA|GLOBAL|INDONESIA/gi, '');
    if (cor) novoNome = novoNome.replace(/VERDE|AZUL|CINZA|PRETO|LITE GREEN|BRANCO|ONYX BLACK|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|GRANITE GREY|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|LIGHT BLUE|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|LAVENDER PURPLE|PRATA|PEPPY PURPLE|ORANGE|AMARELO|FOREST GREEN|PINK|ROSA|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO/gi, '');
    if (rede) novoNome = novoNome.replace(/\b4g\b|\b4G\b|\b5g\b|\b5G\b/gi, '');
    if (capacidade) novoNome = novoNome.replace(new RegExp(/\b32GB\b|\b64GB\b|\b128GB\b|\b256GB\b|\b512GB\b/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(new RegExp(/\b2GB RAM\b|\b3GB RAM\b|\b4GB RAM\b|\b6GB RAM\b|\b8GB RAM\b|\b12GB RAM\b|\b16GB RAM\b/gi, 'i'), '');
    novoNome = novoNome.replace(/XIAOMI|APPLE/gi, '');
    novoNome = novoNome.replace(/CELULAR|DUAL SIM|CEL/gi, '').replace(/\s+/g, ' ').trimStart();


    if (novoNome.trim().toUpperCase() === "REDMI 12") produtoLoja.rede = 5;
    if (novoNome.trim().toUpperCase() === "REDMI 10A SPORT" && produtoLoja.cor.trim().toLocaleUpperCase() === "PRETO") produtoLoja.cor = "CINZA";
    if (novoNome.trim().toUpperCase() === "REDMI NOTE 12" && produtoLoja.cor.trim().toLocaleUpperCase() === "CINZA") produtoLoja.cor = "PRETO";

    if (novoNome.trim().toUpperCase() === "REDMI NOTE 11 PRO+" && produtoLoja.cor.trim().toLocaleUpperCase() === "CINZA") produtoLoja.cor = "PRETO";


    if (novoNome.trim().toUpperCase() === "REDMI 10C" && produtoLoja.cor.trim().toLocaleUpperCase() === "PRETO") produtoLoja.cor = "CINZA";
    if (novoNome.trim().toUpperCase() === "REDMI 9C" && produtoLoja.cor.trim().toLocaleUpperCase() === "PRETO") produtoLoja.cor = "CINZA";
    if (novoNome.trim().toUpperCase() === "REDMI 12C") produtoLoja.rede = 4;

    produtoLoja.nome = novoNome;

    return produtoLoja;
}
