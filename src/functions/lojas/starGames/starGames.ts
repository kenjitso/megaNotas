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

    const text = pdfArray.join(' ');

    const regex = /(\d+-\d+)\s+(.*?)\s+(\d+)\s+(\d+\.\d+)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const codigo = match[3];
        let descricao = match[2].toLocaleUpperCase().trim()
            .replace(/(\b\d\.\d{2}\"|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{2}\")/g, '')
            .replace(/XMI RDM/g, ' XIAOMI REDMI ')
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

        if (/IPHONE/gi.test(descricao) && !descricao.includes(' APPLE ')) {
            descricao = "APPLE " + descricao;
        }

        if (!/( 5G )/gi.test(descricao) && !descricao.includes(' 4G ')) {
            descricao = descricao + " 4G";
        }

        if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao) && !descricao.includes('GLOBAL')) {
            descricao = descricao + " GLOBAL";
        }

        const preco = String(match[4]);
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
