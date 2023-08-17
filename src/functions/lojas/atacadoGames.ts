import { toast } from "react-toastify";
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";

export function AtacadoGamesFormat(
    idLoja: string,
    pdfArray: string[],
    excelArray?: unknown[],
    produtoParaguay?: IProdutoLoja[]
): { cadastrados: IProdutoLoja[], naoCadastrados: IProdutoLoja[], naoEncontrados: IProdutoLoja[] } {

    try {
        let extractedItems = processPdfArray(excelArray ?? [], pdfArray);

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
    excelArray: unknown[],
    pdfArray: string[]
): Array<{ codigo: string; descricao: string; preco: string }> {
    const result = [];

    const text = pdfArray.join(" ");

    const regex = /(\d{4,}-\d)\s+(.*?)\s+((?:\d{1,3},)?\d+\.\d+)\s+\|/g;
    let match;

    // Ignorar o cabeçalho (primeira linha do excelArray)
    const dataRows = excelArray.slice(1);

    // Mapeia códigos para descrições do excelArray
    const excelDataMap: { [codigo: string]: string } = {};

    dataRows.forEach(row => {
        if (Array.isArray(row)) {
            const codigo = row[0].toString().trim();
            const descricao = row[1].toString().trim();
            excelDataMap[codigo] = descricao;
        }
    });

    while ((match = regex.exec(text)) !== null) {
        let codigo = match[1];
        let descricao = match[2].toUpperCase();


        let preco = match[3];

        // Remove traço do código
        codigo = codigo.replace("-", "");

        // Se o código existir em excelDataMap, substitua a descrição
        if (excelDataMap[codigo]) {
            descricao = excelDataMap[codigo];
        }

        descricao = descricao.replace(/(\/|\/UNI|\/EIG|\"UN)$/, "");
        preco = preco.replace(",", "");

        const precoNumero = parseFloat(preco);

        if (precoNumero < 30 || /swap/i.test(descricao) || /swa/i.test(descricao)) {
            continue;
        }

        result.push({
            codigo: codigo.trim(),
            descricao: descricao.trim(),
            preco: preco.trim(),
        });
    }

    return result;
}



export function updateFiltro(
    excelArray: unknown[],
    naoCadastrados: IProdutoLoja[],
    naoEncontrados: IProdutoLoja[]
): { updatedNaoCadastrados: IProdutoLoja[], updatedNaoEncontrados: IProdutoLoja[] } {
    // Ignorar o cabeçalho (primeira linha do excelArray)
    const dataRows = excelArray.slice(1);

    // Mapeia códigos para descrições do excelArray
    const excelDataMap: { [codigo: string]: string } = {};
    var exclusions = ['PAD', 'CASE', 'TABLET', 'CAPA', 'PELICULA', 'CABO', 'CARREGADOR', 'FONE', 'RELOJ', 'RELOGIO'];

    dataRows.forEach(row => {
        if (Array.isArray(row)) {
            const codigo = row[0].toString().trim();
            let descricao = row[1].toUpperCase().trim()
                .replace(/(\b\d\.\d{2}\"|\b\d\.\d\"|\b\d\"|\b\d\d\.\d\"|\b\d\d\.\d{2}\")/g, '')
                .replace(/ CEL /g, ' CELULAR ')
                .replace(/ RELOJ /g, ' RELOGIO ')
                .replace(/RELÓGIO /g, ' RELOGIO ')
                .replace(/ PLUS /g, '+ ')
                .replace(/2RAM\/32GB/g, ' 2GB 32GB ')
                .replace(/3RAM\/64GB/g, ' 3GB 64GB ')
                .replace(/6RAM\/128GB/g, ' 6GB 128GB ')
                .replace(/XMI RDM/g, ' XIAOMI REDMI ')
                .replace(/\(VERSÃO GLOBAL\)/g, ' GLOBAL ')
                .replace(/VERSÃO/g, '')
                .replace(/\(GLOBAL\)/g, ' GLOBAL ')
                .replace(/RAM/g, '')
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
                .replace(/512GB\//g, ' 512GB ')
                .replace(/ 2R/g, ' 2GB ')
                .replace(/ 4R/g, ' 4GB ')
                .replace(/ 6R/g, ' 6GB ')
                .replace(/ 8R/g, ' 8GB ')
                .replace(/ 12R/g, ' 12GB ')
                .replace(/\/12\//g, ' 12GB ')


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
                descricao.includes('XIAOMI 12') && descricao.includes('LITE') && descricao.includes('5G') ||
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

            if (!/( 5G )/gi.test(descricao) && !descricao.includes(' 4G ')) {
                descricao = descricao + " 4G";
            }

            if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao) && !descricao.includes('GLOBAL')) {
                descricao = descricao + " GLOBAL";
            }

            excelDataMap[codigo] = descricao;
        }
    });

    const updatedNaoEncontrados: IProdutoLoja[] = [];

    // Atualiza o array 'naoCadastrados'
    const updatedNaoCadastrados = naoCadastrados.reduce((accumulator, product) => {
        // Se o código existir em excelDataMap, substitua o nome e adicione ao acumulador
        if (excelDataMap[product.codigo]) {
            accumulator.push({
                ...product,
                nome: excelDataMap[product.codigo],
            });
        } else {
            updatedNaoEncontrados.push(product);
        }
        return accumulator;
    }, [] as IProdutoLoja[]);

    return { updatedNaoCadastrados, updatedNaoEncontrados };
}
