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

    const regex = /(\d{6})\s+(.*?)\s+U\$\s+(\d+\.\d+)/g;

    let match;

    while ((match = regex.exec(text)) !== null) {
        const codigo = match[1];
        let descricao = match[2].toLocaleUpperCase()
            .replace(/6\.1/g, '')
            .replace(/6\.28/g, '')
            .replace(/6\.4/g, '')
            .replace(/6\.43/g, '')
            .replace(/6\.5/g, '')
            .replace(/6\.52/g, '')
            .replace(/6\.53/g, '')
            .replace(/6\.55/g, '')
            .replace(/6\.56/g, '')
            .replace(/6\.53/g, '')
            .replace(/6\.6/g, '')
            .replace(/6\.67/g, '')
            .replace(/6\.7/g, '')
            .replace(/6\.71/g, '')
            .replace(/6\.8/g, '')
            .replace(/INDIANO/g, 'INDIA')

        if (!/(INDONESIA|INDIA|CHINA)/gi.test(descricao)) {
            descricao = descricao + " GLOBAL";
        }

        if (/(IPHONE)/gi.test(descricao)) {
            descricao =  "APPLE " +descricao;
        }

        let preco = match[3];

        // Remove a vírgula do preço antes de adicioná-lo ao resultado
        preco = preco.replace(',', '');
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
