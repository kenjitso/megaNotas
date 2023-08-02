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


        const extractedItems = processExcelArray(excelArray);


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




function processExcelArray(
    excelArray: Array<Array<any>>
): Array<{ codigo: string; descricao: string; preco: string }> {

    const sliceArray = excelArray.slice(2);

    const processedArray = sliceArray.map(item => {
        const codigo = String(item[0]).trim().replace(/-/g, '')
        let descricao = String(item[1]).toLocaleUpperCase().trim()
            .replace(/(\b\d\.\d{2}\"|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{2}\")/g, '')
            .replace(/ 128G /g, ' 128GB ')
            .replace(/\b128G\b/g, '128GB')
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

        let memoryValues = descricao.match(/(\b\d+GB\b)/g);  // encontra todos os valores de memória na descrição

        if (memoryValues && memoryValues.length > 1) {
            memoryValues.sort((a, b) => parseInt(a) - parseInt(b));  // classifica os valores em ordem crescente

            // substitui os valores na descrição original pelo valor classificado com o prefixo 'R' e 'C'
            for (let i = 0; i < memoryValues.length; i++) {
                let prefix = i == 0 ? 'R' : 'C';
                let regex = new RegExp("\\b" + memoryValues[i] + "\\b", "g"); // cria um regex para substituir todas as ocorrências
                descricao = descricao.replace(regex, prefix + memoryValues[i]);
            }
        }

        if (/IPHONE/gi.test(descricao) && !descricao.includes(' APPLE ')) {
            descricao = "APPLE " + descricao;
        }

        if (!/( 5G )/gi.test(descricao) && !descricao.includes(' 4G ')) {
            descricao = descricao + " 4G";
        }

        if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao) && !descricao.includes('GLOBAL')) {
            descricao = descricao + " GLOBAL";
        }

        const preco = String(item[3]);
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

