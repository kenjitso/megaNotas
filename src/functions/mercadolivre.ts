
import { z } from "zod";

export default class MercadoLivre {

    public static async getCatalogo(url: string) {


        if (!url.startsWith("https://www.mercadolivre.com.br/")) {
            throw new Error(`Parece que o link inserido não é do mercado livre ou não é um catalogo. Verifique se o link começa com: ${"https://www.mercadolivre.com.br/"}`)
        }

        const urlPart1 = url.split("/p/");

        if (urlPart1.length < 2) {
            throw new Error("O link inserido não encontrou o catalogo do produto.");
        }

        const urlSplit = url.split("/p/")[1].split('product_trigger')[0];

        const urlSplitMatch = urlSplit.match(/MLB\d+/);

        if (!urlSplitMatch) {
            throw new Error("O link inserido não encontrou o catalogo do produto.");
        }

        const result = await fetch(`https://us-central1-mega-notas.cloudfunctions.net/api/mercadolivre/catalogo/${urlSplitMatch[0]}`);

        if (!result.ok) throw new Error("Não foi possivel encontrar o catálogo no mercado livre.");

        const dados = await result.json();

        const validation = z.object({

            id: z.string(),
            name: z.string(),
            buy_box_winner: z.null().or(z.object({
                price: z.number(),
                listing_type_id: z.string(),
                item_id: z.string(),
                shipping: z.null().or(z.object({
                    free_shipping: z.boolean()

                }))
            }))

        });

        const dado = validation.parse(dados);

        const competicaoML = await fetch(`https://us-central1-mega-notas.cloudfunctions.net/api/mercadolivre/catalogo/${urlSplitMatch[0]}/competidores`);

        if (!competicaoML.ok) throw new Error("Não foi possivel encontrar o catálogo no mercado livre.");

        const dadosCompeticao = await competicaoML.json();

        const validationCompeticao = z.object({
            results: z.array(z.object({
                sold_quantity: z.number(),
                available_quantity: z.number(),
                price: z.number(),
                listing_type_id: z.string(),
                shipping: z.null().or(z.object({
                    free_shipping: z.boolean()
                }))
            }))
        }).transform(item => item.results).parse(dadosCompeticao);

        return {
            dados_catalogo: dados,
            dados_competicao: validationCompeticao,
        };
    }

    public static async getComissao(listing_type_id: string) {

        const apiUrl = `https://api.mercadolibre.com/sites/MLB/listing_prices?price=1`;

        const result = await fetch(apiUrl);

        if (!result.ok) throw new Error("Não foi possivel encontrar o id da comissão no mercado livre.");

        const dados = await result.json();

        const validation = z.array(z.object({
            listing_type_id: z.string(),
            sale_fee_amount: z.number(),
        }))

        const parse = validation.parse(dados);
        const dado = parse.find(item => item.listing_type_id === listing_type_id)?.sale_fee_amount ?? 0;
  
        return dado;

    }


    public static async getProduct(item_id: string) {
      

        //https://api.mercadolibre.com/items/MLB12866565
        const apiUrl = `https://api.mercadolibre.com/items/${item_id}`;
      
        const result = await fetch(apiUrl);

        if (!result.ok) throw new Error("Não foi possivel encontrar o id do item no mercado livre.");

        const dados = await result.json();

        const validation = z.object({
            pictures: z.array(
                z.object({
                    secure_url: z.string(),
                })
            ),
        });

        const dado = validation.parse(dados);

        return dado.pictures[0]?.secure_url ?? "";

    }


    public static async getPriceFrete(item_id: string) {
     
        const apiUrl = `https://api.mercadolibre.com/items/${item_id}/shipping_options?zip_code_from=11920000&zip_code_to=11920000`;

        const result = await fetch(apiUrl);

        if (!result.ok) throw new Error("Não foi possivel encontrar o id do item no mercado livre.");

        const dados = await result.json();

        const validation = z.object({
            options: z.array(
                z.object({
                    list_cost: z.number(),
                })
            ),
        });

        const dado = validation.parse(dados);

        return dado.options[0]?.list_cost ?? 0;
    }

}
