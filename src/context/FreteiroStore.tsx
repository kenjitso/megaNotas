import CreateStore from "@/context/lib/CreateStore";

interface Freteiro {
    id: string;
}

const defaultStore: Freteiro = {
    id: ""
};



function reducer(state: Freteiro, value: string) {
   
    return {id: value};
}

const { StoreProvider, useStore, useDispatch } = CreateStore<Freteiro, string>(reducer, defaultStore, "freteiro");

export abstract class FreteiroStore {
    public static Provider = StoreProvider;
    public static useStore = useStore;
    public static useDispatch = useDispatch;
}