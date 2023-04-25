import MercadoLivre from "@/functions/mercadolivre";
import { parseISO } from "date-fns";
import { z } from "zod";
import { schemaLoja } from "./loja";
import { schemaProdutoLoja } from "./ProdutoLoja";
import { IFreteiro } from "./freteiro";

export const schemaCatalogo = z.object({

    id: z.string().default(""),
    ativo: z.boolean().default(true),
    nome: z.string().default(""),
    url_thumbnail: z.string().default(""),
    url_catalogo: z.string().default(""),
    comissao: z.number().min(0).default(0),
    frete: z.number().min(0).default(0),
    premium: z.boolean().default(false),
    preco: z.number().min(0).default(0),
    ultima_atualizacao: z.date().or(
        z.string().datetime({ offset: true }).transform(date => parseISO(date))
    ).default(new Date())

})

export const schemaCompetidor = schemaCatalogo.merge(z.object({

    lucro: z.number(),
    margem: z.number(),
    frete: z.number(),
    vencedor: z.null().or(z.object({
        loja: schemaLoja,
        produto: schemaProdutoLoja,

    })),

    competidores: z.array(z.object({
        loja: schemaLoja,
        produto: schemaProdutoLoja,
        frete: z.number(),
    }))
}));

export type ICatalogo = z.infer<typeof schemaCatalogo>;
export type ICatalogoCompetidor = z.infer<typeof schemaCompetidor>;
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
            ultima_atualizacao: new Date(),
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
        const mlCatalogo = await MercadoLivre.getCatalogo(catalogo.url_catalogo);

        if (!mlCatalogo.buy_box_winner) return catalogo;
        catalogo.nome = mlCatalogo.name;
        catalogo.preco = mlCatalogo.buy_box_winner.price;
        const dataComissao = await MercadoLivre.getComissao(mlCatalogo.buy_box_winner.listing_type_id);
        catalogo.comissao = dataComissao;
        const dataProduct = await MercadoLivre.getProduct(mlCatalogo.buy_box_winner.item_id);
        catalogo.url_thumbnail = dataProduct;
        const dataPriceFrete = await MercadoLivre.getPriceFrete(mlCatalogo.buy_box_winner.item_id);
        catalogo.frete = dataPriceFrete;
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


    public static async searchCompetidor(freteiro: IFreteiro | null, page = 1, limit = 25, q: string = "", ordenar = "margem", ordem = "descrescente") {

        const params = new URLSearchParams();
        if (q) params.set("q", q);
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

        const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/catalogos/competidores?${params}`, options);
        const responseData: unknown = await response.json();

        const catalogos = z.object({
            page: z.number().min(1),
            limit: z.number().min(1),
            items: z.array(schemaCompetidor),
            total: z.number().min(0)
        }).parse(responseData);

       

        return catalogos;
    }
}