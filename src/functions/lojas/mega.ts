import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";


export function MegaFormat(idLoja: string, pdfArray: string[]): Array<IProdutoLoja> {
  
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
            nome: item.descricao,
            modelo: "n/a", // Incluir o novo campo modelo
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
    pdfArray: string[]
): Array<{ codigo: string; descricao: string; preco: string }> {
    const result = [];

    const text = pdfArray.join(' ').replace(/\\/g, '');

    const regex = /\|\s*(\d+-\d+)\|\s*\d+\|\s*(.*?)\s*\|\s*([\d.]+)\|\s*([\d.]+)\|/g;
  
    let match;
   
 
    while ((match = regex.exec(text)) !== null) {
        const codigo = match[1];
        let descricao = match[2];
        let preco = match[3];
       



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
