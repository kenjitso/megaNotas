import MercadoLivre from "@/functions/mercadolivre";
import { parseISO } from "date-fns";
import { z } from "zod";
import { schemaLoja } from "./loja";
import { schemaProdutoLoja } from "./ProdutoLoja";
import { IFreteiro } from "./freteiro";

export const schemaCatalogo = z.object({
    id: z.string().optional(),
    ativo: z.boolean().default(true),
    nome: z.string().default(""),
    url_thumbnail: z.string().default(""),
    url_catalogo: z.string().default(""),
    comissao: z.number().default(0),
    frete: z.number().default(0),
    premium: z.boolean().default(false),
    preco: z.number().default(0),
    custoTotal: z.number().default(0),
    precoC: z.number().default(0),
    precoP: z.number().default(0),
    lucroC: z.number().default(0),
    lucroP: z.number().default(0),
    margemC: z.number().default(0),
    margemP: z.number().default(0),
    competicaoML: z.array(z.object({
        vendas: z.number().min(0).default(0),
        unidades: z.number().min(0).default(0),
        preco: z.number().min(0),
        premium: z.boolean(),
        frete_gratis: z.boolean()
    })).default([]),
    ultima_atualizacao: z.date().or(z.string().datetime({ offset: true }).transform(item => parseISO(item))).or(z.number().transform(item => new Date(item))).default(new Date(0)),
    ultima_atualizacao_competidores: z.date().or(z.string().datetime({ offset: true }).transform(item => parseISO(item))).or(z.number().transform(item => new Date(item))).default(new Date(0)),
    competidores: z.array(z.object({
        loja: schemaLoja,
        produto: schemaProdutoLoja,
        frete: z.number().min(0).default(0),
    })).default([])
});


export type ICatalogo = z.infer<typeof schemaCatalogo>;
export class CatalogoController {

    public static createNew(): ICatalogo {
        return {
            id: "",
            ativo: true,
            nome: "",
            url_thumbnail: "",
            url_catalogo: "",
            comissao: 0,
            frete: 0,
            premium: false,
            preco: 0,
            custoTotal: 0,
            precoC:0,
            precoP:0,
            lucroC:0,
            lucroP:0,
            margemC:0,
            margemP:0,
            competicaoML: [],
            ultima_atualizacao: new Date(),
            ultima_atualizacao_competidores: new Date(0),
            competidores: [],

        }
    }

    // o metodo get retorna 1 item ou um array?
    public static async get(id: string) {

        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/${id}`, options);
        const responseData: unknown = await response.json();
        const catalogoSchema = schemaCatalogo.parse(responseData);
        return catalogoSchema;

    }

    public static async create(produto: ICatalogo) {

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produto)
        };

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos`, options);
        const responseData: unknown = await response.json();

        const catalogoSchema = schemaCatalogo.parse(responseData);
        return catalogoSchema;
    }

    public static async sync(data: string, catalogos: number) {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ data, catalogos })
        };

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/sync`, options);
        const responseData = await response.json();
  
        return responseData;
    }

    public static async update(produto: ICatalogo) {
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produto)
        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/${produto.id}`, options);
        const responseData: unknown = await response.json();

        const catalogoSchema = schemaCatalogo.parse(responseData);
        return catalogoSchema;
    }

    public static async deactivate(id: string) {
        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ ativo: false })

        };
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/${id}`, options);
        const responseData: unknown = await response.json();
        const catalogoSchema = schemaCatalogo.parse(responseData);
        return catalogoSchema;
    }

    public static async integrarML(catalogo: ICatalogo) {
        const {
            dados_catalogo, dados_competicao
        } = await MercadoLivre.getCatalogo(catalogo.url_catalogo);

        if (!dados_catalogo.buy_box_winner) return catalogo;
        catalogo.nome = dados_catalogo.name;
        catalogo.preco = dados_catalogo.buy_box_winner.price;
        const dataComissao = await MercadoLivre.getComissao(dados_catalogo.buy_box_winner.listing_type_id);
        catalogo.comissao = dataComissao;
        const dataProduct = await MercadoLivre.getProduct(dados_catalogo.buy_box_winner.item_id);
        catalogo.url_thumbnail = dataProduct;
        const dataPriceFrete = await MercadoLivre.getPriceFrete(dados_catalogo.buy_box_winner.item_id);
        catalogo.frete = dataPriceFrete;

        catalogo.competicaoML = dados_competicao.map(objeto => {
            return {
                premium: objeto.listing_type_id === "gold_pro",
                preco: objeto.price,
                vendas: objeto.sold_quantity,
                unidades: objeto.available_quantity,
                frete_gratis: objeto.shipping?.free_shipping ?? true,
            };
        })

        return catalogo;
    }

    public static async save(catalogo: ICatalogo) {

        if (catalogo.id) {
            return await CatalogoController.update(catalogo);
        }
        return await CatalogoController.create(catalogo);
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

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos?${params}`, options);
        const responseData: unknown = await response.json();
        const catalogosSchema = z.object({
            page: z.number().min(1),
            limit: z.number().min(1),
            items: z.array(schemaCatalogo),
            total: z.number().min(0)
        }).parse(responseData);
        return catalogosSchema;
    }


    public static async searchCompetidor(freteiro: IFreteiro | null, page = 1, limit = 25, q: string = "") {

        const params = new URLSearchParams();
        if (q) params.set("q", q);
        params.set("limit", limit.toString());
        params.set("page", page.toString());

        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };
        const url = `https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/competidores?${params}`;
   
        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/competidores?${params}`, options);
        const responseData: unknown = await response.json();

        const catalogos = z.object({
            page: z.number().min(1),
            limit: z.number().min(1),
            items: z.array(schemaCatalogo),
            total: z.number().min(0)
        }).parse(responseData);



        return catalogos;
    }

    public static getValoresML(catalogo: ICatalogo, custo: number) {


        if (catalogo.premium) {
            const precoP = catalogo.preco;
            const precoC = precoP * 1.11 / 1.16;
            const lucroC = precoC - custo;
            const lucroP = precoP - custo;
            return { precoP, precoC, lucroC, lucroP };

        }

        const precoC = catalogo.preco;
        const precoP = precoC * 1.16 / 1.11;
        const lucroC = precoC - custo;
        const lucroP = precoP - custo;
        return { precoP, precoC, lucroC, lucroP };


    }



}
