import { toast } from "react-toastify";
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";

export function AtacadoGamesFormat(idLoja: string, pdfArray: string[], produtoParaguay?: IProdutoLoja[]): Array<IProdutoLoja> {
    try {
        const atacadoGamesString = "ATACADO GAMES";
        const atacadoGamesPdf = pdfArray.some(text => text.includes(atacadoGamesString));

        if (!atacadoGamesPdf || pdfArray.length === 0) {
            toast.error("Verifique se o arquivo é de ATACADO GAMES e se não está vazio. Caso contrario entre em contato com o desenvolvedor.");
            return [];
        }

        let extractedItems = processPdfArray(pdfArray);

        if (produtoParaguay) {
            const produtoParaguayCodigos = new Set(produtoParaguay.map(item => item.codigo));
            extractedItems = extractedItems.filter(item => produtoParaguayCodigos.has(item.codigo));

            console.log(produtoParaguay);
            console.log(extractedItems);
            
        }

        const lineValidation = z.object({
            codigo: z.string(),
            descricao: z.string(),
            preco: z.string()
        }).transform(item => ({
            id: "",
            loja: idLoja,
            codigo: item.codigo,
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

        const itens: IProdutoLoja[] = z.array(lineValidation).parse(extractedItems);

        return itens;

    } catch (error) {
        toast.error("Entre em contato com o desenvolvedor, parece que a estrutura fornecida pela loja mudou.");
        return [];
    }
}

function processPdfArray(
    pdfArray: string[]
): Array<{ codigo: string; descricao: string; preco: string }> {
    const result = [];

    const text = pdfArray.join(" ");

    const regex = /(\d{4,}-\d)\s+(.*?)\s+((?:\d{1,3},)?\d+\.\d+)\s+\|/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const codigo = match[1];
        let descricao = match[2];
        let preco = match[3];

        descricao = descricao.replace(/(\/|\/UNI|\/EIG|\"UN)$/, "");
        preco = preco.replace(",", "");

        result.push({
            codigo: codigo.trim(),
            descricao: descricao.trim(),
            preco: preco.trim(),
        });
    }

    return result;
}