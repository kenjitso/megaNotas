import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";


export function CellShopFormat(
    idLoja: string,
    excelArray: unknown[][],
    produtoParaguay?: IProdutoLoja[]

): {
    cadastrados: IProdutoLoja[],
    naoCadastrados: IProdutoLoja[],
    naoEncontrados: IProdutoLoja[]
} {

    try {


        const priceColumn = identifyPriceColumn(excelArray);
        const extractedItems = processExcelArray(excelArray, priceColumn);



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


function identifyPriceColumn(
    excelArray: Array<Array<any>>,
    sampleSize: number = 10
): number {
    let counts = [0, 0];  // Contadores para item[2] e item[3]
    for (let i = 2; i < excelArray.length && i < 2 + sampleSize; i++) {
        if (isNumber(String(excelArray[i][2]))) counts[0]++;
        if (isNumber(String(excelArray[i][3]))) counts[1]++;
    }
    return counts[0] > counts[1] ? 2 : 3;
}

function isNumber(str: string) {
    return /^\d+(\.\d+)?$/.test(str.replace(',', '.'));
}




function processExcelArray(
    excelArray: Array<Array<any>>,
    priceColumn: number
): Array<{ codigo: string; descricao: string; preco: string }> {

    const sliceArray = excelArray.slice(2);
    var exclusions = ['PAD', 'CASE', 'TABLET', 'CAPA', 'PELICULA', 'CABO', 'CARREGADOR', 'FONE', 'RELOJ'];

    const processedArray = sliceArray.map(item => {
        const codigo = String(item[0]).trim().replace(/-/g, '')
        let descricao = String(item[1]).toLocaleUpperCase().trim()
            .replace(/(\b\d\.\d{2}\"|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{2}\")/g, '')
            .replace(/CEL/g, ' CELULAR ')
            .replace(/ PLUS /g, "+ ")
            .replace(/ 128G /g, ' 128GB ')
            .replace(/\b128G\b/g, '128GB')
            .replace(/ 1TB /g, ' 1024GB ')
            .replace(/2GB\+32GB/g, ' 2GB 32GB ')
            .replace(/64GB\+4GB/g, ' 64GB 4GB ')
            .replace(/64GB\+6GB/g, ' 64GB 6GB ')
            .replace(/128GB\+4GB/g, ' 128GB 4GB ')
            .replace(/128GB\+6GB/g, ' 128GB 4GB ')
            .replace(/128GB\+8GB/g, ' 128GB 8GB ')
            .replace(/64GB\+4/g, ' 64GB 4GB ')
            .replace(/64GB\+6/g, ' 64GB 6GB ')
            .replace(/128GB\+4/g, ' 128GB 4GB ')
            .replace(/128GB\+6/g, ' 128GB 6GB ')
            .replace(/128GB\+8/g, ' 128GB 8GB ')
            .replace(/32GB\+/g, ' 32GB ')
            .replace(/64GB\+/g, ' 64GB ')
            .replace(/128GB\+/g, ' 128GB ')
            .replace(/256GB\+/g, ' 256GB ')
            .replace(/512GB\+/g, ' 512GB ')
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



        if (descricao.includes('WATCH') || descricao.includes('ROLOGIO')) {
            if (!descricao.includes("RELOGIO")) descricao = "RELOGIO " + descricao;
        }

        if (descricao.includes('XIAOMI') && descricao.includes('CEL') ||
            descricao.includes('XIAOMI') && descricao.includes('CELULAR') ||
            descricao.includes('XIAOMI 13') && descricao.includes('LITE') && descricao.includes('5G') ||
            descricao.includes('XIAOMI 12') && descricao.includes('LITE') && descricao.includes('5G') ||
            (descricao.includes('XIAOMI REDMI') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            (descricao.includes('XIAOMI NOTE') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            (descricao.includes('XIAOMI POCO') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            descricao.includes('IPHONE') ||
            descricao.includes('SAMSUNG') && descricao.includes('CEL') ||
            descricao.includes('SAMSUNG') && descricao.includes('CELULAR')
        ) {
            if (!descricao.includes("CELULAR")) descricao = "CELULAR " + descricao;

            if (descricao.includes("IPHONE 6S") ||
                descricao.includes("IPHONE 7") &&
                !descricao.includes("2GB")) descricao = descricao + " 2GB"

            if ((descricao.includes("IPHONE 11") ||
                descricao.includes("IPHONE 12") ||
                descricao.includes("IPHONE 13")) &&
                !descricao.includes("PRO") &&
                !descricao.includes("PRO MAX") &&
                !descricao.includes(" 4GB")) {
                descricao = descricao + " 4GB";
            }

            if (descricao.includes("IPHONE 11 PRO MAX")
                && !descricao.includes(" 4GB")) descricao = descricao + " 4GB"

            if (descricao.includes("IPHONE 13 PRO MAX") ||
                descricao.includes("IPHONE 14 PRO MAX") ||
                descricao.includes("IPHONE 14+") ||
                descricao.includes("IPHONE 13 PRO") ||
                descricao.includes("IPHONE 14 PRO") ||
                descricao.includes("IPHONE 14") &&
                !descricao.includes(" 6GB")) descricao = descricao + " 6GB"

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

        if (!/( 5G )/gi.test(descricao) && !descricao.includes(' 4G ')) {
            descricao = descricao + " 4G";
        }

        if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao) && !descricao.includes('GLOBAL')) {
            descricao = descricao + " GLOBAL";
        }


        const preco = String(item[priceColumn]);
        // assegurando que o preço é tratado como um número

        return {
            codigo,
            descricao,
            preco
        };
    });


    const filteredArray = processedArray.filter(item => parseFloat(item.preco) >= 40);

    return filteredArray;
}

