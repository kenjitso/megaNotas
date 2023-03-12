
export interface IProdutoLoja {
    codigo: string,
    idloja: string,
    preco: number,
    ultima_atualizacao: string
}

export interface IProduto {
    id: string;
    nome: string;
    url_catalogo_premium: string;
    url_catalogo_classic: string;
    comissao_premium: number;
    comissao_classic: number;
    frete: number;
    preco_ml_premium: number;
    preco_ml_classic: number;
    lojas: IProdutoLoja[]
}


export class Produto implements IProduto {

    id: string
    nome: string
    url_catalogo_premium: string
    url_catalogo_classic: string
    comissao_premium: number
    comissao_classic: number
    frete: number
    preco_ml_premium: number
    preco_ml_classic: number
    lojas: IProdutoLoja[]

    public constructor() {
        this.id = "";
        this.nome = "";
        this.url_catalogo_premium = "";
        this.url_catalogo_classic = "";
        this.comissao_premium = 0;
        this.comissao_classic = 0;
        this.frete = 0;
        this.preco_ml_premium = 0;
        this.preco_ml_classic = 0;
        this.lojas = [
            {
                codigo: "",
                idloja: "",
                preco: 0,
                ultima_atualizacao: "",
            },];
    }



    public static async get(id: string) {

        let options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtos/${id}`, options);
        let responseData = await response.json();
        let produto = new Produto();
        produto = responseData;
        console.log(produto);
        return produto;

    }

    public static async create(produto: Produto) {
    
        let options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produto)
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtos`, options);
        let responseData = await response.json();
        console.log(responseData);
        return responseData;
    }


    public static async update(produto: Produto) {
        let options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(produto)
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtos/${produto.id}`, options);
        let responseData = await response.json();
        console.log(responseData);
        return responseData;
    }

    public static async delete(id: string): Promise<void> {
        let options: RequestInit = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        };
        await fetch(`${process.env.PACKEND_URL}/produtos/${id}`, options);
    }



    public static async search() {
        let options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/produtos`, options);
        let responseData: any[] = await response.json();
        let produtos: Produto[] = [];

        for (let data of responseData) {
            let produto = new Produto();
            produto.id = data.id;
            produto.nome = data.nome;
            produto.url_catalogo_premium = data.url_catalogo_premium;
            produto.url_catalogo_classic = data.url_catalogo_classic;
            produto.comissao_premium = data.comissao_premium;
            produto.comissao_classic = data.comissao_classic;
            produto.frete = data.frete;
            produto.preco_ml_premium = data.preco_ml_premium;
            produto.preco_ml_classic = data.preco_ml_classic;
            produto.lojas = data.lojas;
            produtos.push(produto);
        }
        return produtos;
    }

}