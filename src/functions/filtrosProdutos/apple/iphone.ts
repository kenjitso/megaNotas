import { IProdutoLoja } from "@/datatypes/ProdutoLoja";

export const filtraIphone = (produtoLoja: IProdutoLoja): IProdutoLoja | null => {
    const marca =
        /APPLE/i.test(produtoLoja.nome) ? "APPLE" :
            null;

    if (marca !== null) {
        produtoLoja.marca = marca;
    }



    const ram =
        /16GB RAM/i.test(produtoLoja.nome) ? 16 :
            /12GB RAM/i.test(produtoLoja.nome) ? 12 :
                /8GB RAM/i.test(produtoLoja.nome) ? 8 :
                    /6GB RAM/i.test(produtoLoja.nome) ? 6 :
                        /4GB RAM/i.test(produtoLoja.nome) ? 4 :
                            /3GB RAM/i.test(produtoLoja.nome) ? 3 :
                                /2GB RAM/i.test(produtoLoja.nome) ? 2 :
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
                            /1TB/i.test(produtoLoja.nome) ? 1 :
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
    // let novoNome =  produtoLoja.nome;
    let novoNome = posicaoUltimoDS !== -1 ? produtoLoja.nome.substring(0, posicaoUltimoDS) : produtoLoja.nome;



    if (origem) novoNome = novoNome.replace(/INDIA|GLOBAL|INDONESIA/gi, '');
    if (cor) novoNome = novoNome.replace(/VERDE|AZUL|CINZA|PRETO|LITE GREEN|BRANCO|ONYX BLACK|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|LIGHT BLUE|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|LAVENDER PURPLE|PRATA|PEPPY PURPLE|AMARELO|FOREST GREEN|PINK|ROSA|BLUE|GOLD|VERMELHO|GRAPHITE|YELLOW|MIDNIGHT|DOURADO|DEEP PURPLE|STARLIGHT|PURPLE/gi, '');
    if (rede) novoNome = novoNome.replace(/\b4g\b|\b4G\b|\b5g\b|\b5G\b/gi, '');
    if (capacidade) novoNome = novoNome.replace(new RegExp(/\b32GB\b|\b64GB\b|\b128GB\b|\b256GB\b|\b512GB\b|\b1TB\b/gi, 'i'), '');
    if (ram) novoNome = novoNome.replace(new RegExp(/\b2GB RAM\b|\b3GB RAM\b|\b4GB RAM\b|\b6GB RAM\b|\b8GB RAM\b|\b12GB RAM\b|\b16GB RAM\b/gi, 'i'), '');
    novoNome = novoNome.replace(/XIAOMI|APPLE/gi, '');
    novoNome = novoNome.replace(/CELULAR|DUAL SIM|CEL/gi, '').replace(/\s+/g, ' ').trimStart();
    novoNome = novoNome.split("-")[0].trim();


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
