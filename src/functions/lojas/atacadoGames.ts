import { toast } from "react-toastify";
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";

export function AtacadoGamesFormat(
    idLoja: string,
    pdfArray: string[],
    excelArray?: unknown[],
    produtoParaguay?: IProdutoLoja[]
): { cadastrados: IProdutoLoja[], naoCadastrados: IProdutoLoja[] } {

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

        if (produtoParaguay) {
            const produtoParaguayCodigos = new Set(produtoParaguay.map(item => item.codigo.trim()));

            cadastrados = itensFormatados.filter(item => produtoParaguayCodigos.has(item.codigo.trim()));
            naoCadastrados = itensFormatados.filter(item => !produtoParaguayCodigos.has(item.codigo.trim()));
        }

        return { cadastrados, naoCadastrados };

    } catch (error) {
        toast.error("Entre em contato com o desenvolvedor, parece que a estrutura fornecida pela loja mudou.");
        return { cadastrados: [], naoCadastrados: [] };
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
        let descricao = match[2];
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




export function updateNaoCadastrados(
    excelArray: unknown[],
    naoCadastrados: IProdutoLoja[]
): IProdutoLoja[] {
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

    // Atualiza o array 'naoCadastrados'
    const updatedNaoCadastrados = naoCadastrados.reduce((accumulator, product) => {
        // Se o código existir em excelDataMap, substitua o nome e adicione ao acumulador
        if (excelDataMap[product.codigo]) {
            accumulator.push({
                ...product,
                nome: excelDataMap[product.codigo],
            });
        }
        return accumulator;
    }, [] as IProdutoLoja[]);

    return updatedNaoCadastrados;
}
