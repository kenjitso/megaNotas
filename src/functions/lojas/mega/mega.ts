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


    let match;


    while ((match = regex.exec(text)) !== null) {
        const codigo = match[1].toLocaleUpperCase().replace(/-/g, '');
        let descricao = match[2].toLocaleUpperCase().split("|")[0].trim()
            .replace(/\s/g, ' ')
            .replace(/6.55\"/g, '')
            .replace(/6.67\"/g, '')
            .replace(/6.36\"/g, '')
            .replace(/6.28\"/g, '')
            .replace(/6.71\"/g, '')
            .replace(/6.58\"/g, '')
            .replace(/6.43\"/g, '')
            .replace(/6.5\"/g, '')
            .replace(/6.53\"/g, '')
            .replace(/6.79\"/g, '')
            .replace(/6.7\"/g, '')
            .replace(/6.73\"/g, '')
            .replace(/6.52\"/g, '')
            .replace(/6.6\"/g, '')
            .replace(/6.58\"/g, '')
            .replace(/ NFC/g, '')
            .replace(/NT12PR\+/g, 'NOTE 12 PRO PLUS')
            .replace(/NT12PR/g, 'NOTE 12 PRO')
            .replace(/NT12S/g, 'NOTE 12S')
            .replace(/NT12/g, 'NOTE 12')
            .replace(/PRIM/g, 'PRIME')
            .replace(/11PR\+/g, '11 PRO PLUS')
            .replace(/NT11S/g, 'NOTE 11S')
            .replace(/NT11/g, 'NOTE 11')
            .replace(/NT10/g, 'NOTE 10')
            .replace(/REDM/g, 'REDMI')
            .replace(/SPOR/g, " SPORT ")
            .replace(/CEL/g, 'CELULAR')
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

        if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao)) {
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
