import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";




export function MegaFormat(
    idLoja: string,
    pdfArray: string[],
    excelArray: unknown[],
    produtoParaguay?: IProdutoLoja[]
): {
    cadastrados: IProdutoLoja[],
    naoCadastrados: IProdutoLoja[],
    naoEncontrados: IProdutoLoja[]
} {

    try {

        const extractedItems = processPdfArray(pdfArray);


        const lineValidation = z.object({
            codigo: z.string(),
            descricao: z.string(),
            preco: z.string()
        }).transform(item => ({
            id: "",
            loja: idLoja,
            codigo: item.codigo,
            nome_original: "",
            nome: item.descricao,
            marca: "",
            modelo: "n/a",
            origem: "",
            categoria: "",
            preco: parseFloat(item.preco),
            estoque: true,
            rede: 0,
            capacidade: 0,
            ram: 0,
            cor: "n/a",
            caixaMedida: "n/a",
            corPulseira: "n/a",
            tipoPulseira: "n/a",
            ultima_atualizacao: new Date(),
            vinculos: [],
        }));

        const itensFormatados: IProdutoLoja[] = z.array(lineValidation).parse(extractedItems);

        let cadastrados: IProdutoLoja[] = [];
        let naoCadastrados: IProdutoLoja[] = [];
        let naoEncontrados: IProdutoLoja[] = [];

        if (produtoParaguay) {
            const produtoParaguayCodigos = new Set(produtoParaguay.map(item => item.codigo.trim()));

            cadastrados = itensFormatados.filter(item => produtoParaguayCodigos.has(item.codigo.trim()));
            naoCadastrados = itensFormatados.filter(item => !produtoParaguayCodigos.has(item.codigo.trim()));
            naoEncontrados = naoCadastrados.filter(item => !produtoParaguayCodigos.has(item.codigo));

        }

        return { cadastrados, naoCadastrados, naoEncontrados };

    } catch (error) {
        toast.error("Entre em contato com o desenvolvedor, parece que a estrutura fornecida pela loja mudou.");
        return { cadastrados: [], naoCadastrados: [], naoEncontrados: [] };
    }
}



function processPdfArray(
    pdfArray: string[]
): Array<{ codigo: string; descricao: string; preco: string }> {
    const result = [];

    const text = pdfArray.join(' ').replace(/\\/g, '');

    const regex = /\|\s*(\d+-\d+)\|\s*\d+\|\s*(.*?)\s*\|\s*([\d.,]+)\|\s*([\d.,]+)\|/g;
    var exclusions = ['PAD', 'CASE', 'TABLET', 'CAPA', 'PELICULA', 'CABO', 'CARREGADOR', 'FONE', 'RELOJ'];

    let match;


    while ((match = regex.exec(text)) !== null) {
        const codigo = match[1].toLocaleUpperCase().replace(/-/g, '');
        let descricao = match[2].toLocaleUpperCase().split("|")[0].trim()
            .replace(/\s/g, ' ')
            .replace(/(\b\d\.\d{2}\"|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{2}\")/g, '')
            .replace(/ ULTR /g, ' ULTRA ')
            .replace(/ NFC/g, '')
            .replace(/NT12PR\+/g, 'NOTE 12 PRO+')
            .replace(/NT12PR/g, 'NOTE 12 PRO')
            .replace(/NT12S/g, 'NOTE 12S')
            .replace(/NT12/g, 'NOTE 12')
            .replace(/PRIM/g, 'PRIME')
            .replace(/11PR\+/g, '11 PRO+')
            .replace(/NT11S/g, 'NOTE 11S')
            .replace(/NT11/g, 'NOTE 11')
            .replace(/NT10/g, 'NOTE 10')
            .replace(/REDM/g, 'REDMI')
            .replace(/SPOR/g, " SPORT ")
            .replace(/CEL/g, 'CELULAR')

         
            .replace(/2GB\+32GB/g, ' 2GB 32GB ')
            .replace(/ 8G\+256GB/g, ' 8GB 256GB ')
            .replace(/ 2G\+32GB/g, ' 2GB 32GB ')
            .replace(/ 3G\+64GB/g, ' 3GB 64GB ')
            .replace(/ 12G\+256G/g, ' 12GB 256GB ')
            .replace(/ 4\+64GB/g, ' 4GB 128GB ')
            .replace(/ 2\+32GB/g, ' 2GB 32GB ')
            .replace(/ 3\+64GB/g, ' 3GB 64GB ')
            .replace(/ 4\+128GB/g, ' 4GB 128GB ')
            .replace(/ 6\+128GB/g, ' 6GB 128GB ')
            .replace(/ 8\+128GB/g, ' 8GB 128GB ')
            .replace(/ 8\+256GB/g, ' 8GB 256GB ')
            .replace(/ 2\+32G/g, ' 2GB 32GB ')
            .replace(/ 3\+64G/g, ' 3GB 64GB ')
            .replace(/ 8\+128G/g, ' 8GB 128GB ')
            .replace(/ 8\+256G/g, ' 8GB 256GB ')
            .replace(/ 12\+256G/g, ' 12GB 256GB ')
            .replace(/ 4\+64/g, ' 4GB 64GB ')
            .replace(/ 6\+64/g, ' 6GB 64GB ')
            .replace(/ 8\+256/g, ' 8GB 256GB ')
            .replace(/ 4\+128/g, ' 4GB 128GB ')
            .replace(/ 4\+128/g, ' 4GB 128GB ')
            .replace(/ 8\+128/g, ' 8GB 128GB ')
            .replace(/ 6\+128/g, ' 6GB 128GB ')
            .replace(/6\+128/g, ' 6GB 128GB ')
            .replace(/ 12\+256/g, ' 12GB 256GB ')
            .replace(/ 12\+512/g, ' 12GB 512GB ')
            .replace(/ 16\+512/g, ' 16GB 512GB ')
            .replace(/ 16\+1024/g, ' 16GB 1024GB ')
            .replace(/16\+1024/g, ' 16GB 1024GB ')
            .replace(/16\+512/g, ' 16GB 1024GB ')
            .replace(/6\+64/g, ' 6GB 64GB ')

            .replace(/\(B CN\)/g, ' CHINA ')
            .replace(/\(BR CN\)/g, ' CHINA ')
            .replace(/\(CN\)/g, ' CHINA ')
            .replace(/\(IND\)/g, ' INDIA ')
            .replace(/\(IN\)/g, ' INDIA ')
            .replace(/\(BR IND\)/g, ' INDIA ')
            .replace(/\(INDO\)/g, ' INDONESIA ')
            .replace(/PRE/g, "PRETO")
            .replace(/VED/g, "VERDE")
            .replace(/VRD/g, "VERDE")
            .replace(/CIN/g, "CINZA")
            .replace(/BRA/g, "-TEMP3")
            .replace(/AMA/g, "-TEMP2")
            .replace(/DOU/g, "DOURADO")
            .replace(/AZU/g, "AZUL")
            .replace(/SIL/g, "-TEMP1")
            .replace(/ROX/g, "ROXO")
            .replace(/ LIT /g, " LITE ")
            .replace(/\(22\)/g, " (2022) ")
            .replace(/A\/S/g, 'AZUL')
            .replace(/ RS/g, ' ROSA')
            .replace(/ SI/g, ' -TEMP1')
            .replace(/ -TEMP1/g, ' SILVER')
            .replace(/ AM/g, ' -TEMP2')
            .replace(/ -TEMP2/g, ' AMARELO')
            .replace(/ NE /g, " NOVA EDICAO ")
            .replace(/ VD /g, " VERDE ")
            .replace(/ AZ /g, " AZUL ")
            .replace(/ AM /g, " AMARELO ")
            .replace(/ PR /g, " PRETO ")
            .replace(/ CI /g, " CINZA ")
            .replace(/ BR /g, " -TEMP3 ")
            .replace(/ A /g, " AMARELO/AZUL ")
            .replace(/ P /g, " PRETO ")
            .replace(/SG$/g, '')
            .replace(/ CI$/g, ' CINZA')
            .replace(/ AZ$/g, ' AZUL')
            .replace(/ RX$/g, ' ROXO')
            .replace(/ BR$/g, ' BRANCO')
            .replace(/\)BR$/g, ') BRANCO')
            .replace(/PR$/g, ' PRETO')
            .replace(/ VD\/A$/g, ' VERDE')
            .replace(/VD$/g, ' VERDE')
            .replace(/\)CI$/g, ') CINZA')
            .replace(/\)AM$/g, ') AMARELO')
            .replace(/\)VD\/A$/g, ') VERDE')
            .replace(/\)P$/g, ') PRETO')
            .replace(/\)A\/S$/g, ') AZUL')
            .replace(/ A$/g, ' AMARELO/AZUL')
            .replace(/\b[a-z]\b/gi, ' -TEMP3')
            .replace(/ -TEMP3/g, ' BRANCO')
            .replace(/ C$/g, ' CINZA')
            .replace(/ P$/g, ' PRETO')
            .replace(/ NOTE 11PR /g, ' NOTE 11 PRO ')
            .replace(/ X5 PRETO /g, ' X5 PRO ')
            .replace(/ NOTE 10 PRETO /g, ' NOTE 10 PRO ')

        let memoryValues = descricao.match(/(\b\d+GB\b)/g);  // encontra todos os valores de memória na descrição

        if (memoryValues && memoryValues.length > 1) {
            memoryValues.sort((a: string, b: string) => parseInt(a) - parseInt(b));  // classifica os valores em ordem crescente

            // substitui os valores na descrição original pelo valor classificado com o prefixo 'R' e 'C'
            for (let i = 0; i < memoryValues.length; i++) {
                let prefix = i == 0 ? 'R' : 'C';
                let regex = new RegExp("\\b" + memoryValues[i] + "\\b", "g"); // cria um regex para substituir todas as ocorrências
                descricao = descricao.replace(regex, prefix + memoryValues[i]);
            }
        }

        if (descricao.includes('WATCH') || descricao.includes('ROLOGIO')) {
            if (!descricao.includes("RELOGIO")) descricao = "RELOGIO " + descricao;
        }

        if (descricao.includes('XIAOMI') && descricao.includes('CEL') ||
            descricao.includes('XIAOMI') && descricao.includes('CELULAR') ||
            descricao.includes('XIAOMI 13') && descricao.includes('LITE') && descricao.includes('5G') ||
            (descricao.includes('XIAOMI REDMI') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            (descricao.includes('XIAOMI NOTE') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            (descricao.includes('XIAOMI POCO') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            descricao.includes('IPHONE') ||
            descricao.includes('SAMSUNG') && descricao.includes('CEL') ||
            descricao.includes('SAMSUNG') && descricao.includes('CELULAR')
        ) {
            if (!descricao.includes("CELULAR")) descricao = "CELULAR " + descricao;
        }

        if (/IPHONE/gi.test(descricao) && !descricao.includes(' APPLE ')) {
            descricao = "APPLE " + descricao;
        }

        if (!/( 5G )/gi.test(descricao) && !descricao.includes(' 4G ') && !exclusions.some(exclusion => descricao.includes(exclusion))) {
            descricao = descricao + " 4G";
        }

        if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao) && !descricao.includes('GLOBAL') && !exclusions.some(exclusion => descricao.includes(exclusion)))  {
            descricao = descricao + " GLOBAL";
        }


        let preco = match[4];

        // Remove a vírgula do preço antes de adicioná-lo ao resultado
        preco = preco.replace(/,/g, '');

        result.push({
            codigo: codigo.trim(),
            descricao: (descricao).trim(),
            preco: preco.trim(),
        });
    }

    return result;
}
