import MercadoLivre from "@/functions/mercadolivre";
import { parseISO } from "date-fns";
import { z } from "zod";
import { schemaLoja } from "./loja";
import { schemaProdutoLoja } from "./ProdutoLoja";

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
            precoC: 0,
            precoP: 0,
            lucroC: 0,
            lucroP: 0,
            margemC: 0,
            margemP: 0,
            competicaoML: [],
            ultima_atualizacao: new Date(),
            ultima_atualizacao_competidores: new Date(0),
            competidores: [],

        }
    }


    public static async get(id: string) {

        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos/${id}`, options);
       
        
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
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos`, options);
       
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
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos/sync`, options);
     

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
       const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos/${produto.id}`, options);
   
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
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos/${id}`, options);
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


    public static async search(q: string = "", ativo: boolean | undefined = true) {

        const params = new URLSearchParams();
        if (q) params.set("q", q);

        params.set("limit", "9999");


        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };



        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos?${params}`, options);
        const responseData: unknown = await response.json();


        const catalogosSchema = z.object({
            items: z.array(schemaCatalogo),
        }).transform(dados => dados.items).parse(responseData);
        return catalogosSchema;
    }

    public static async searchCompetidor(q: string = "") {

        const params = new URLSearchParams();
        if (q) params.set("q", q);
        params.set("limit", "9999");
        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };

        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/catalogos/competidores?${params}`, options);
        const responseData: unknown = await response.json();
        const catalogos = z.object({
            items: z.array(schemaCatalogo).transform(items => items.filter(item => item.competidores && item.competidores.length > 0)),
        }).transform(dados => dados.items).parse(responseData);

        return catalogos;
    }


    public static async searchCatalogoML(q: string = "") {

        if (!q || q.trim() === "") return [];

        const params = new URLSearchParams();
        params.set("q", q);

        const options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };

        const response = await fetch(`https://us-central1-mega-notas.cloudfunctions.net/api/mercadolivre/catalogo/search?${params}`, options);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro na resposta da API:", errorText);
            throw new Error(errorText);
        }
        const responseData: unknown = await response.json();

        const attributeSchema = z.object({
            id: z.string(),
            name: z.string(),
            value_name: z.string().optional(),
        });



        const schemaProduto = z.object({
            id: z.string(),
            name: z.string(),
            pictures: z.array(z.object({
                url: z.string(),
            })),
            attributes: z.array(attributeSchema).optional()
        });

        const catalogos = z.object({
            results: z.array(schemaProduto)
        }).parse(responseData);

        const produtos = catalogos.results.map(product => {
            const marca = product.attributes?.find(attribute => attribute.id === "BRAND")?.value_name;
            const modelo = product.attributes?.find(attribute => attribute.id === "MODEL")?.value_name;
            let cor = product.attributes?.find(attribute => attribute.id === "COLOR")?.value_name;
            const memoriaInterna = product.attributes?.find(attribute => attribute.id === "INTERNAL_MEMORY")?.value_name;
            let memoriaRam = product.attributes?.find(attribute => attribute.id === "RAM")?.value_name;
            let mobileNetwork = product.attributes?.find(attribute => attribute.id === "MOBILE_NETWORK")?.value_name;
            let caixaMedida = product.attributes?.find(attribute => attribute.id === "CASE_SIZE")?.value_name;
            let corPulseira = product.attributes?.find(attribute => attribute.id === "WRISTBAND_COLOR")?.value_name;
            let tipoPulseira = product.attributes?.find(attribute => attribute.id === "WRISTBAND_TYPE")?.value_name;
          
            if (memoriaRam === undefined) memoriaRam = product.attributes?.find(attribute => attribute.id === "RAM_MEMORY")?.value_name;
            if (mobileNetwork === undefined) mobileNetwork = product.attributes?.find(attribute => attribute.id === "WITH_MOBILE_NETWORK")?.value_name;
            if (cor === undefined) cor = product.attributes?.find(attribute => attribute.id === "CASE_COLOR")?.value_name;
            if (tipoPulseira === undefined) tipoPulseira = product.attributes?.find(attribute => attribute.id === "SMARTWATCH_VERSION")?.value_name;
            return {
                codigo_catalogo: product.id,
                nome: product.name,
                url_Imagem: product.pictures.length > 0 ? product.pictures[0].url : null,
                marca: marca,
                modelo: modelo,
                cor: cor,
                memoriaInterna: memoriaInterna,
                memoriaRam: memoriaRam,
                mobileNetwork: mobileNetwork,
                caixaMedida: caixaMedida,
                corPulseira: corPulseira,
                tipoPulseira: tipoPulseira,
            };
        });

        return produtos;
    }






}
