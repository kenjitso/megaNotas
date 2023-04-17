import { z } from "zod";
import { parseISO } from "date-fns";

export const schemaLoja = z.object({

    id: z.string().default(""),
    ativo: z.boolean().default(true),
    nome: z.string().default(""),
    cotacao: z.number().default(0),
    url_cotacao: z.string().default(""),
    url_catalogo: z.string().default(""),
    ultima_atualizacao: z.date().or(
        z.string().datetime({ offset: true }).transform(date => parseISO(date))
    ).default(new Date()),
    algoritmo: z.number().default(0),
})

export type ILoja = z.infer<typeof schemaLoja>;

export class LojaController {

    public static createNew(): ILoja {
        return {
            id: "",
            ativo: true,
            nome: "",
            cotacao: 0,
            url_cotacao: "",
            url_catalogo: "",
            ultima_atualizacao: new Date(),
            algoritmo: 0
        }
    }

    public static async get(id: string) {

        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas/${id}`, options);
        const responseData: unknown = await response.json();
   
        const lojaSchema = schemaLoja.parse(responseData);
        return lojaSchema;
    }

    public static async create(loja: ILoja) {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loja)
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas`, options);
       
        const responseData: unknown = await response.json();
    
        const lojaSchema = schemaLoja.parse(responseData);
        return lojaSchema;
    }

    public static async update(loja: ILoja) {

  
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loja)
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas/${loja.id}`, options);
        const responseData: unknown = await response.json();
   
        const lojaSchema = schemaLoja.parse(responseData);
        return lojaSchema;
    }

    public static async updateCotacao(cotacao: number) {
     
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({cotacao})
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas/cotacao`, options);
       
        const responseData: unknown = await response.json();
        const schema = z.object({message:z.string()}).parse(responseData);
        return schema.message;
    }

    public static async deactivate(id: string) {
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ ativo: false })

        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas/${id}`, options);
        const responseData: unknown = await response.json();
        const lojaSchema = schemaLoja.parse(responseData);
        return lojaSchema;
    }

    public static async save(loja: ILoja) {

        if (loja.id) {
            return await LojaController.update(loja);
        }
        return await LojaController.create(loja);
    }

    public static async search(page = 1, limit = 25, q: string = "", ordenar = "nome", ordem = "crescente", ativo: boolean | undefined = true) {

        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (ativo !== undefined) params.set("ativo", ativo.toString());
        params.set("limit", limit.toString());
        params.set("page", page.toString());
        params.set("ordenar", ordenar);
        params.set("ordem", ordem);

        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas?${params}`, options);
        const responseData: unknown = await response.json();

        const lojasSchema = z.object({
            page: z.number().min(1),
            limit: z.number().min(1),
            items: z.array(schemaLoja),
            total: z.number().min(0)
        }).parse(responseData);
        return lojasSchema;
    }

}

