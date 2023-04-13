import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import { toast } from "react-toastify";
import { z } from "zod";


export function AtacadoGamesFormat(idLoja: string, excelArray: unknown[]): Array<IProdutoLoja> {


  try {
    excelArray.splice(0, 1);

    const removeUSDollar = (value: string) => value.replace("U$", "").trim();

    const lineValidation = z.array(
      z.string().or(z.number().transform(numero => numero.toString())).or(z.null().transform(() => ""))
    ).min(3).transform(array => ({
      loja: idLoja,
      codigo: array[0],
      nome: array[1],
      categoria: "",
      preco: parseFloat(removeUSDollar(array[2])),
      estoque: true,
      ultima_atualizacao: new Date(), // .toISOString() exemplo de data válida
      vinculos: [],
    }));



    const itens: Array<IProdutoLoja> = z.array(lineValidation).parse(excelArray);

    return itens;
  } catch (error) {
    toast.error(`Erro ao processar arquivo: ${error}`);
    return [];
  }
}

