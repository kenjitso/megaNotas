import { parseISO } from "date-fns";
import { z } from "zod";

export const schemaProdutoLoja = z.object({

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

export type IProdutoLoja = z.infer<typeof schemaProdutoLoja>;

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
        const produtoLojaSchema = z.array(schemaProdutoLoja).parse(responseData);
        return produtoLojaSchema;
    }

    public static async cadastro(produtos: IProdutoLoja[]) {

        for (const produto of produtos) {
            produto.codigo = produto.codigo.trim();

        }

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ produtos })
        };

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja`, options);

        const responseData: unknown = await response.json();

        const produtosLojaSchema = z.array(schemaProdutoLoja).parse(responseData);
        return produtosLojaSchema;
    }



    public static async importar(produtos: IProdutoLoja[]) {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ produtos })
        };

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja/importar`, options);

        const responseData: unknown = await response.json();

        const produtosLojaSchema = z.array(schemaProdutoLoja).parse(responseData);
        return produtosLojaSchema;
    }


    public static async updateML(produtoLoja: IProdutoLoja, url_catalogoML: string) {


        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                url: url_catalogoML
            })
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja/${produtoLoja.id}/vincular`, options);
        const responseData: unknown = await response.json();



        const produtoLojaSchema = schemaProdutoLoja.parse(responseData);
        return produtoLojaSchema;

    }



    public static async update(produtoLoja: IProdutoLoja) {

        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produtoLoja)
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja/${produtoLoja.id}`, options);
        const responseData: unknown = await response.json();

        const produtoLojaSchema = schemaProdutoLoja.parse(responseData);
        return produtoLojaSchema;
    }

    public static async search(idLoja: string, q: string = "") {

        const params = new URLSearchParams();
        if (q) params.set("q", q);

        params.set("limit", "9999");
        params.set("loja", idLoja);
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtoloja?${params}`, options);
        const responseData: unknown = await response.json();

        const produtoLoja = z.object({
            items: z.array(schemaProdutoLoja),
        }).transform(dados => dados.items).parse(responseData);


        return produtoLoja;
    }

}
