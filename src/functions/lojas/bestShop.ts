import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";


export function BestShopFormat(idLoja: string, pdfArray: string[]): Array<IProdutoLoja> {
    try {



        if (pdfArray.length === 0) {
            toast.error("Verifique se o arquivo é de BEST SHOP e se não está vazio. Caso contrario entre em contato com o desenvolvedor.");
            return [];
        }

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
            origem: "",
            categoria: "",
            preco: parseFloat(item.preco),
            estoque: true,
            rede: 0, // Incluir o novo campo rede
            capacidade: 0, // Incluir o novo campo capacidade
            ram: 0, // Incluir o novo campo ram
            cor: "n/a", // Incluir o novo campo cor
            ultima_atualizacao: new Date(), // .toISOString() exemplo de data válida
            vinculos: [],
        }));
        
        const itens: IProdutoLoja[] = z.array(lineValidation).parse(extractedItems);
        
        return itens;
        
    } catch (error) {
        toast.error(`Entre em contato com o desenvolvedor, parece que a estrutura fornecida pela loja mudou.`);
        return [];
    }
}

function processPdfArray(
    pdfArray: unknown[]
): Array<{ codigo: string; descricao: string; preco: string }> {
    const result = [];

    const text = pdfArray.join(' ');

    const regex = /(\d{4,}-\d)\s+(.*?)\s+((?:\d{1,3},)?\d+\.\d+)\s+\|/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const codigo = match[1];
        let descricao = match[2];
        let preco = match[3];

        descricao = descricao
            .split('  ')
            .map((word) =>
                word.split(' ').filter((letter) => letter.trim() !== '').join('')
            )
            .join(' ');

        // Remove /, /D ou /EIG no final da descrição
        descricao = descricao.replace(/(\/|\/D|\/EIG)$/, '');


        // Remove a vírgula do preço antes de adicioná-lo ao resultado
        preco = preco.replace(',', '');

        result.push({
            codigo: codigo.trim(),
            descricao: descricao.trim(),
            preco: preco.trim(),
        });
    }

    return result;
}
