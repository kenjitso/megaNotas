import CreateStore from "@/context/lib/CreateStore";
import { IFreteiro } from "@/datatypes/freteiro";

interface Freteiro {
    freteiro: IFreteiro | null;

}

const defaultStore: Freteiro = {
    freteiro: null,
};



function reducer(state: Freteiro, value: IFreteiro|null) {
   
    return {freteiro: value};
}

const { StoreProvider, useStore, useDispatch } = CreateStore<Freteiro, IFreteiro | null>(reducer, defaultStore);

export abstract class FreteiroStore {
    public static Provider = StoreProvider;
    public static useStore = useStore;
    public static useDispatch = useDispatch;
}