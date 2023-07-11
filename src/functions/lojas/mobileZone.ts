import { toast } from "react-toastify";

import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { z } from "zod";


export function MobileZoneFormat(idLoja: string, excelArray: unknown[]): Array<IProdutoLoja> {

    
    try {
        excelArray.splice(0, 2);
        const filteredArray = excelArray.filter((array: unknown) => {
            return Array.isArray(array) && array.length > 2;
          }) as Array<unknown[]>;
          
      
          const lineValidation = z.array(
            z.string().or(z.number().transform(numero => numero.toString())).or(z.null().transform(() => ""))
        ).min(3).transform(array => ({
            id: "",
            loja: idLoja,
            codigo: array[0],
            nome: array[1],
            marca: "",
            origem: "",
            categoria: "",
            preco: parseFloat(array[2]),
            estoque: true,
            rede: 0, // Incluir o novo campo rede
            capacidade: 0, // Incluir o novo campo capacidade
            ram: 0, // Incluir o novo campo ram
            cor: "n/a", // Incluir o novo campo cor
            ultima_atualizacao: new Date(), // .toISOString() exemplo de data válida
            vinculos: [],
        }));
        
        const itens: IProdutoLoja[] = z.array(lineValidation).parse(filteredArray);
        
        return itens;
        
    } catch (error) {
        toast.error(`Erro ao processar arquivo: ${error}`);
        return [];
    }
}

