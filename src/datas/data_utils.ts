export interface oi{

    a:string;
}

/*
export interface IProduct {
    id?: number;
    nome: string;
    preco_ml_classic: string;
    preco_ml_premium: string;
    frete: string;
    comissao_classic: string;
    comissao_premium: string;
    url_catalogo_classic: string;
    url_catalogo_premium: string;
}

export interface ILoja {
    id: string;
    nome: string;
    cotacao: string;
    freteiro: string[];
    url_cotacao: string;
    url_catalogo: string;
}


export interface IFreteiro {
    id: string;
    nome: string;
    fixo: number;
    percentual: number;
    prioridade: number;
    valor_min: string;
    valor_max: number;
    global: boolean;
}


export interface IProductList {
    products: IProduct[];
}

export interface IFreteiroList {
    freteiros: IFreteiro[];
}

export interface ILojaList {
    lojas: ILoja[];
}

export interface IDataList<T> {
    data: T[];
}




type dataProps = | IProduct | ILoja | IFreteiro;


export class DataFetcher<T extends dataProps> {

    private url: string;
    private method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";

    constructor(url: string, method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH") {
        this.url = url;
        this.method = method;
    }

    //USA SOMENTE GET e DELETE NAO USA BODY RETORNA UMA LISTA
    public async getList(): Promise<T[]> {
        let options: RequestInit = {
            method: this.method,
            headers: {
                "Content-type": "application/json"
            },
        };
        let response = await fetch(this.url, options);
        let responseData = await response.json();
        const items = responseData ?? []; // define um array vazio caso a resposta seja undefined

        return items;
    }


    //USA PUT POST e PATCH NORMALMENTE USA PUT,POST,PATCH, USA GET E DELETE NÃO RETORNA LISTA
    public async getDatas(data?: T): Promise<T> {
        let options: RequestInit = {
            method: this.method,
            headers: {
                "Content-type": "application/json"
            }
        };

        if (this.method === "GET") {

        } else {

            options.body = JSON.stringify(data);
        }

        let response = await fetch(this.url, options);
        let responseData = await response.json();
        //  if (!responseData.success) throw new Error(responseData.message);
        //if (!responseData.item) throw new Error("ITEM NAO ESTA DEFINIDO!");

        return responseData.item;
    }
}*/