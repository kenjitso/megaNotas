import { parseISO } from "date-fns";
import { toast } from "react-toastify";
import { z } from "zod";

export const schemaProdutoLoja = z.object({

    id: z.string().default(""),
    codigo: z.string().default(""),
    loja: z.string().default(""),
    nome_original: z.string().default(""),
    nome: z.string().default(""),
    marca: z.string().default(""),
    origem: z.string().default("n/a"),
    categoria: z.string().default(""),
    estoque: z.boolean().default(false),
    preco: z.number().min(0).default(0),
    rede: z.number().min(0).optional().default(0),
    capacidade: z.number().optional().default(0),
    ram: z.number().min(0).optional().default(0),
    cor: z.string().optional().default("n/a"),
    caixaMedida: z.string().optional().default("n/a"),
    corPulseira: z.string().optional().default("n/a"),
    tipoPulseira: z.string().optional().default("n/a"),
    ultima_atualizacao: z.date().or(
        z.string().datetime({ offset: true }).transform(date => parseISO(date))
    ).default(new Date()),
    vinculos: z.array(z.string()).default([]),

})

export type IProdutoLoja = z.infer<typeof schemaProdutoLoja>;

export class ProdutoLojaController {
    static get(arg0: string) {
        throw new Error("Method not implemented.");
    }
    public static createNew(): IProdutoLoja {
        return {
            id: "",
            codigo: "",
            loja: "",
            nome_original: "",
            nome: "",
            marca: "",
            origem: "",
            categoria: "",
            estoque: false,
            preco: 0,
            rede: 0,
            capacidade: 0,
            ram: 0,
            cor: "",
            caixaMedida: "",
            corPulseira: "",
            tipoPulseira: "",
            ultima_atualizacao: new Date(),
            vinculos: []
        }
    }

    public static async delete(id: string) {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        };
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja/${id}`, options);

        // Verifique o conteúdo da resposta
        const text = await response.text();

        if (text === "success") {
            return null; // ou qualquer outro valor padrão que você deseja retornar em caso de sucesso
        } else {
            try {
                const responseData = JSON.parse(text);
                const produtoLojaSchema = schemaProdutoLoja.parse(responseData);
                return produtoLojaSchema;
            } catch (error) {
                console.error("Failed to parse JSON:", error);
                throw error;
            }
        }
    }

    public static async update(produtoLoja: IProdutoLoja) {

        if (produtoLoja.categoria === "") {
            toast.info("Não é possivel vincular o produto " + produtoLoja.codigo + ", produto sem \"categoria\".");
            return Promise.reject(new Error("Produto sem categoria"));
        }

        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produtoLoja)
        };


        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja/${produtoLoja.id}`, options);
        const responseData: unknown = await response.json();
        const produtoLojaSchema = schemaProdutoLoja.parse(responseData);
        return produtoLojaSchema;
    }

    public static async getId(id: string) {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/lojas/${id}`, options);
        const responseData: unknown = await response.json();
        const produtoLojaSchema = schemaProdutoLoja.parse(responseData);
        return produtoLojaSchema;
    }

    public static async getProduto(produtoLoja: IProdutoLoja) {


        return produtoLoja;
    }



    public static async getByLoja(idLoja: string) {
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };

        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja?loja=${idLoja}`, options);
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

        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja`, options);

        const responseData: unknown = await response.json();

        const produtosLojaSchema = z.array(schemaProdutoLoja).parse(responseData);
        return produtosLojaSchema;
    }


    //enviar um patch com o id na frente para editar os produtos
    public static async importar(produtos: IProdutoLoja[]) {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ produtos })
        };
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja/importar`, options);

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
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja/${produtoLoja.id}/vincular`, options);

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
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/produtoloja?${params}`, options);
        const responseData: unknown = await response.json();

        const produtoLoja = z.object({
            items: z.array(schemaProdutoLoja),
        }).transform(dados => dados.items).parse(responseData);


        return produtoLoja;
    }


}