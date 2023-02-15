
export interface IResult {
    success: boolean;
    message: string;

}
export interface IUpdateResult<T> {
    success: boolean;
    message: string;
    item?: T;
    itens?: T[];

}
export interface IResponse {
    success: boolean;
    message: string;
}

export interface ILoginData {

    email: string;
    password: string;
}

export interface IClient {

    id?: number;
    nome: string;
    sobrenome: string;
    email: string;
    password: string;
}

export interface IProduct {
    id?: number;
    nome: string;
    preco: string;
    descricao: string;
    categoria: string;
}

export interface IService {
    id?: number;
    nome: string;
    preco: string;
    descricao: string;
    categoria: string;
    horas: string;
}

export interface IProductList {
    products: IProduct[];
}

export interface IClientList {
    clients: IClient[];
}

export interface IServiceList {
    service: IService[];
}

export interface IDataList<T> {
    data: T[];
}




type dataProps = IClient | IProduct | IService | ILoginData;


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
        let responseData: IUpdateResult<T> = await response.json();

        if (!responseData.success) throw new Error(responseData.message);
        if (!responseData.itens) throw new Error("ITENS NAO ESTA DEFINIDO!");
        return responseData.itens;
    };


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
        let responseData: IUpdateResult<T> = await response.json();
        if (!responseData.success) throw new Error(responseData.message);
        if (!responseData.item) throw new Error("ITEM NAO ESTA DEFINIDO!");

        return responseData.item;
    }
}