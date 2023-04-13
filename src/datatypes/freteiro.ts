import { TypeOf, z } from "zod";

export const schema = z.object({

  id: z.string().default(""),
  ativo: z.boolean().default(false),
  nome: z.string().default(""),
  fixo: z.number().default(0),
  percentual: z.number().min(0).default(0),

})

export type IFreteiro = z.infer<typeof schema>;
export class FreteiroController {

  public static createNew(): IFreteiro {
    return {
      id: "",
      ativo: false,
      nome: "",
      fixo: 0,
      percentual: 0,
    }
  }

  public static async get(id: string) {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    };
    const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro/${id}`, options);
    const responseData: unknown = await response.json();
    const freteiro = schema.parse(responseData);
    return freteiro;
  }

  public static async create(freteiro: IFreteiro) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(freteiro)

    };
    const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro`, options);
    const responseData: unknown = await response.json();
    const freteiroSchema = schema.parse(responseData);
    return freteiroSchema;
  }

  public static async update(freteiro: IFreteiro) {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(freteiro)
    };
    const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro/${freteiro.id}`, options);
    const responseData: unknown = await response.json();
    const freteiroSchema = schema.parse(responseData);
    return freteiroSchema;
  }

  public static async deactivate(id: string) {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ ativo: false })

    };
    const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro/${id}`, options);
    const responseData: unknown = await response.json();
    const freteiro = schema.parse(responseData);
    return freteiro;
  }

  public static async save(freteiro: IFreteiro) {
    if (freteiro.id) {
      return await FreteiroController.update(freteiro);
    }
    return await FreteiroController.create(freteiro);

  }

  public static async search(page = 1, limit = 25, q: string, ordenar = "nome", ordem = "crescente", ativo: boolean | undefined = true) {

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
    const response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro?${params}`, options);
    const responseData: unknown = await response.json();
    console.log(responseData);
    const freteiroSchema = z.object({
      page: z.number().min(1),
      limit: z.number().min(1),
      items: z.array(schema),
      total: z.number().min(1)
    }).parse(responseData);
    return freteiroSchema;
  }
}