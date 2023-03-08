export interface IFreteiro {
  id: string;
  nome: string;
  fixo: number;
  percentual: number;
  prioridade: number;
  valor_min: number;
  valor_max: number;
  global: boolean;
}

export class Freteiro implements IFreteiro {
  id: string;
  nome: string;
  fixo: number;
  percentual: number;
  prioridade: number;
  valor_min: number;
  valor_max: number;
  global: boolean;

  public constructor() {
    this.id = "";
    this.nome = "";
    this.fixo = 0;
    this.percentual = 0;
    this.prioridade = 0;
    this.valor_min = 0;
    this.valor_max = 0;
    this.global = false;

  }

  public static async get(id: string) {
    let options: RequestInit = {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    };
    let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro/${id}`, options);
    let responseData = await response.json();
    let freteiro = new Freteiro();
    freteiro.id = responseData.id;
    return new Freteiro();
  }



  public static async create(freteiro: Freteiro) {

    console.log(freteiro);
    let options: RequestInit = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(freteiro)

    };
    let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro`, options);
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  }



  public static async update(freteiro: Freteiro) {
    console.log(freteiro);
    let options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(freteiro)
    };
    let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro/${freteiro.id}`, options);
    console.log(response);
    let responseData = await response.json();
    console.log(responseData);
    return responseData;

  }



  public static async delete(id: string) {
    let options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    };
    await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro/${id}`, options);
  }


  public static async search() {
    let options: RequestInit = {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    };
    let response = await fetch(`https://us-central1-megapreco-d9449.cloudfunctions.net/api/freteiro`, options);
    let responseData: any[] = await response.json();
    let freteiros: Freteiro[] = [];
    for (let data of responseData) {
      let freteiro = new Freteiro();
      freteiro.id = data.id;
      freteiro.nome = data.nome;
      freteiro.fixo = data.fixo;
      freteiro.percentual = data.percentual;
      freteiro.prioridade = data.prioridade;
      freteiro.valor_min = data.valor_min;
      freteiro.valor_max = data.valor_max;
      freteiro.global = data.global;
      freteiros.push(freteiro);
    }
    return freteiros;
  }


}