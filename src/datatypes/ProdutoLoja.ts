import { parseISO } from "date-fns";
import { z } from "zod";

export const schema = z.object({

    id: z.string().default(""),
    codigo: z.string().default(""),
    loja: z.string().default(""),
    nome: z.string().default(""),
    categoria: z.string().default(""),
    estoque: z.boolean().default(false),
    preco: z.number().min(0).default(0),
    ultima_atualizacao: z.date().or(
        z.string().datetime({ offset: true }).transform(date => parseISO(date))
    ).default(new Date()),
    vinculos: z.array(z.string()).default([]),

})

export type IProdutoLoja = z.infer<typeof schema>;

export class ProdutoLojaController {
    public static createNew(): IProdutoLoja {
        return {
            id: "",
            codigo: "",
            loja: "",
            nome: "",
            categoria: "",
            estoque: false,
            preco: 0,
            ultima_atualizacao: new Date(),
            vinculos: []
        }
    }

    public static async getByLoja(idLoja: string) {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja?loja=${idLoja}`, options);
        const responseData: unknown = await response.json();
        const produtoLojaSchema = z.array(schema).parse(responseData);
        return produtoLojaSchema;
    }

    public static async importar(produtos: IProdutoLoja[]) {
        console.log(produtos);
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ produtos })
        };
        console.log(options);
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja`, options);

        const responseData: unknown = await response.json();
        console.log(responseData);
        const produtosLojaSchema = z.array(schema).parse(responseData);
        return produtosLojaSchema;
    }

    public static async update(produtoLoja: IProdutoLoja) {
        console.log(produtoLoja);
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produtoLoja)
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja/${produtoLoja.id}`, options);
        const responseData: unknown = await response.json();
        console.log(responseData);
        const produtoLojaSchema = schema.parse(responseData);
        return produtoLojaSchema;
    }

    public static async search(loja: string, page = 1, limit = 25, q: string = "", ordenar = "nome", ordem = "crescente", ativo: boolean | undefined = true) {

        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (ativo !== undefined) params.set("ativo", ativo.toString());
        params.set("loja", loja);
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

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja?${params}`, options);
        const responseData: unknown = await response.json();
        console.log(responseData);
        const catalogos = z.object({
            page: z.number().min(1),
            limit: z.number().min(1),
            items: z.array(schema),
            total: z.number().min(1)
        }).parse(responseData);
        return catalogos;
    }

}
