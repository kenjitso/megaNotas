import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";


export function MadridFormat(
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

    const text = pdfArray.join(' ').replace(/Preço/g, '');

   


    var exclusions = ['PAD', 'CASE', 'TABLET', 'CAPA', 'PELICULA', 'CABO', 'CARREGADOR', 'FONE', 'RELOJ', "RELOGIO"];
    // let match;

    const regex = /(\d{6})\s+(.+?)\s+U\$\s+(\d+\.\d+)|(.+?)\s+U\$\s+(\d+\.\d+)\s+CODIGO\s+(\d{6})/g
 

    let match;
    while (match = regex.exec(text)) {

    

        if (match[1]) {
            const formata = formatDescricao(match[1], match[2], match[3], exclusions);


            let preco = formata.preco;

            // Remove a vírgula do preço antes de adicioná-lo ao resultado
            preco = preco.replace(',', '');
            const precoNumero = parseFloat(preco);

            if (precoNumero <  40 || /swap/i.test(formata.descricao) || /swa/i.test(formata.descricao)) {
                continue;
            }

            result.push({
                codigo: formata.codigo,
                descricao: formata.descricao,
                preco: formata.preco

            });
        } else {
      
           const formata = formatDescricao(match[6], match[4], match[5], exclusions);

            let preco = formata.preco;

            // Remove a vírgula do preço antes de adicioná-lo ao resultado
            preco = preco.replace(',', '');
            const precoNumero = parseFloat(preco);

            if (precoNumero <  40 || /swap/i.test(formata.descricao) || /swa/i.test(formata.descricao)) {
                continue;
            }


            result.push({
                codigo: formata.codigo,
                descricao: formata.descricao,
                preco: formata.preco



            });

        }
    }
    return result;
}


function formatDescricao(codigo: string, descricao: string, preco: string, exclusions: string[]): { codigo: string, descricao: string, preco: string } {

    descricao = descricao.toLocaleUpperCase()
        .replace(/(\b\d\.\d{1,2}|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{1,2})/g, '')
        .replace(/CEL/g, ' CELULAR ')
        .replace(/RELOJ/g, ' RELOGIO ')
        .replace(/4\/128GB/g, ' 4GB 128GB ')
        .replace(/ 128G /g, ' 128GB ')
        .replace(/\b128G\b/g, '128GB')
        .replace(/\b128\b\//g, ' 128GB ')
        .replace(/\b256\b\//g, ' 256GB ')
        .replace(/\b512\b\//g, ' 512GB ')
        .replace(/ 12\+/g, ' 12GB ')
        .replace(/ 8\+/g, ' 8GB ')
        .replace(/ 6\+/g, ' 6GB ')
        .replace(/ 4\+/g, ' 4GB ')
        .replace(/ 3\+/g, ' 3GB ')
        .replace(/ 2\+/g, ' 2GB ')
        .replace(/\+12 /g, ' 12GB ')
        .replace(/\+8 /g, ' 8GB ')
        .replace(/\+6 /g, ' 6GB ')
        .replace(/\+4 /g, ' 4GB ')
        .replace(/\+3 /g, ' 3GB ')
        .replace(/\+2 /g, ' 2GB ')
        .replace(/ 12\//g, ' 12GB ')
        .replace(/ 8\//g, ' 8GB ')
        .replace(/ 6\//g, ' 6GB ')
        .replace(/ 4\//g, ' 4GB ')
        .replace(/ 3\//g, ' 3GB ')
        .replace(/ 2\//g, ' 2GB ')
        .replace(/ 2\//g, ' 2GB ')
        .replace(/\(CHINA\)/g, 'CHINA')
        .replace(/\(INDIA\)/g, 'INDIA')
        .replace(/\(IND\)/g, 'INDIA')
        .replace(/\(INDONESIA\)/g, 'INDONESIA')
        .replace(/\(GLOBAL\)/g, 'GLOBAL')
        .replace(/ SAMS /g, ' SAMSUNG ')
        .replace(/ LTE /g, ' ')
        .replace(/ DPJ /g, ' ')
        .replace(/ DPJ\b/g, ' ')
        .replace(/ DS /g, ' DUAL SIM ')
        .replace(/ DP /g, ' ')
        .replace(/ 128 /g, ' 128GB ')
        .replace(/\//g, ' ')



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

        if (descricao.includes("SAMSUNG A03") &&
            !descricao.includes(" 2GB")) descricao = descricao + " 2GB"
        if (descricao.includes("SAMSUNG A04E") &&
            !descricao.includes(" 3GB")) descricao = descricao + " 3GB"
        if (descricao.includes("SAMSUNG A04S") ||
            descricao.includes("SAMSUNG A24") &&
            !descricao.includes(" 4GB")) descricao = descricao + " 4GB"
        if (descricao.includes("SAMSUNG A34") &&
            !descricao.includes(" 6GB")) descricao = descricao + " 6GB"
        if (descricao.includes("SAMSUNG S23+") &&
            !descricao.includes(" 8GB")) descricao = descricao + " 8GB"


    }



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


    if (/IPHONE/gi.test(descricao) && !descricao.includes(' APPLE ')) {
        descricao = "APPLE " + descricao;
    }

    if (!/( 5G )/gi.test(descricao) && !descricao.includes(' 4G ') && !exclusions.some(exclusion => descricao.includes(exclusion))) {
        descricao = descricao + " 4G";
        if (descricao.includes("SAMSUNG Z FLIP 3") ||
            descricao.includes("SAMSUNG Z FOLD 4")) descricao.replace(" 4G ", " 5G ")
    }

    if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao) && !descricao.includes('GLOBAL') && !exclusions.some(exclusion => descricao.includes(exclusion)))  {
        descricao = descricao + " GLOBAL";
    }





    return { codigo, descricao, preco };
}