import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";


export function StarGamesFormat(
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
    let result = [];
    var exclusions = ['PAD', 'CASE', 'CAPA', 'PELICULA', 'CABO', 'CARREGADOR', 'FONE', 'RELOJ','RELOGIO'];

    const text = pdfArray.join(' ');

    const regex = /(\d+-\d+)\s+(.*?)\s+(\d+)\s+([\d,]+\.\d+)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const codigo = match[3];
        let descricao = match[2].toUpperCase().trim()
            .replace(/(\b\d\.\d{2}\"|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{2}\")/g, '')
            .replace(/XMI RDM/g, ' XIAOMI REDMI ')
            .replace(/CEL/g, ' CELULAR ')
            .replace(/RELOJ/g, ' RELOGIO ')
            .replace(/XMI NT/g, ' XIAOMI NOTE ')
            .replace(/XMI POCO/g, ' XIAOMI POCO ')
            .replace(/XMI 13/g, ' XIAOMI 13 ')
            .replace(/ 32GB\//g, ' 32GB ')
            .replace(/ 32G\//g, ' 32GB ')
            .replace(/ 32\//g, ' 32GB ')
            .replace(/ 64GB\//g, ' 64GB ')
            .replace(/ 64G\//g, ' 64GB ')
            .replace(/ 64\//g, ' 64GB ')
            .replace(/ 128GB\//g, ' 128GB ')
            .replace(/ 128G\//g, ' 128GB ')
            .replace(/ 128\//g, ' 128GB ')
            .replace(/ 256GB\//g, ' 256GB ')
            .replace(/ 256G\//g, ' 256GB ')
            .replace(/ 256\//g, ' 256GB ')
            .replace(/ 2R/g, ' 2GB ')
            .replace(/ 4R/g, ' 4GB ')
            .replace(/ 6R/g, ' 6GB ')
            .replace(/ 8R/g, ' 8GB ')

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


        if (descricao.includes('XIAOMI') && descricao.includes('CEL') ||
            descricao.includes('XIAOMI') && descricao.includes('CELULAR') ||
            descricao.includes('XIAOMI 13') && descricao.includes('LITE 5G') ||
            (descricao.includes('XIAOMI REDMI') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            (descricao.includes('XIAOMI NOTE') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            (descricao.includes('XIAOMI POCO') && !exclusions.some(exclusion => descricao.includes(exclusion))) ||
            descricao.includes('IPHONE') ||
            descricao.includes('SAMSUNG') && descricao.includes('CEL') ||
            descricao.includes('SAMSUNG') && descricao.includes('CELULAR')
        ) {
            if (!descricao.includes("CELULAR")) descricao = "CELULAR " + descricao;
        }

        if (descricao.includes('WATCH') || descricao.includes('ROLOGIO')) {
            if (!descricao.includes("RELOGIO")) descricao = "RELOGIO " + descricao;
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

        const preco = String(match[4]).replace(',', '');
        // assegurando que o preço é tratado como um número

        result.push({
            codigo,
            descricao,
            preco
        });
    }

    result = result.filter(item => parseFloat(item.preco) >= 40); // Filtre itens cujo preço é maior ou igual a 40


    return result;
}
