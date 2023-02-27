export interface ILoja {
    id: string;
    nome: string;
    cotacao: number;
    freteiro: string[];
    url_cotacao: string;
    url_catalogo: string;
}

export class Loja implements ILoja {
    id: string;
    nome: string;
    cotacao: number;
    freteiro: string[];
    url_cotacao: string;
    url_catalogo: string;


    public constructor() {

        this.id = "";
        this.nome = "";
        this.cotacao = 0;
        this.freteiro = [];
        this.url_cotacao = "";
        this.url_catalogo = "";


    }

    public static async get(id: string) {

        let options: RequestInit = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas/${id}`, options);
        let responseData = await response.json();
        let loja = new Loja();
        loja.id = responseData.id;
        return new Loja();

    }

    public static async search(): Promise<Loja[]> {
        try {
            let options: RequestInit = {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            };

            let response = await fetch(
                `https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas`,
                options
            );

            let responseData = await response.json();
            let lojas: Loja[] = [];

            for (let data of responseData) {
                let loja = new Loja();
                loja.id = data.id;
                loja.nome = data.nome;
                loja.cotacao = data.cotacao;
                loja.freteiro = data.freteiro;
                loja.url_cotacao = data.url_cotacao;
                loja.url_catalogo = data.url_catalogo;

                lojas.push(loja);
            }

            return lojas;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public static async create(loja: Loja) {
        let options: RequestInit = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loja)
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas`, options);
        let responseData = await response.json();
        return responseData;
    }

    public static async update(loja: Loja) {
        let options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loja)
        };
        let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/lojas/${loja.id}`, options);
        let responseData = await response.json();

        return responseData;
    }
}

