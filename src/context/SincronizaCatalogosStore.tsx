import CreateStore from "@/context/lib/CreateStore";

interface SincronizaCatalogos {
    sincronizaCatalogos: string;
    showToast: boolean;
}

const defaultStore: SincronizaCatalogos = {
    sincronizaCatalogos: '',
    showToast: false,
};

type Action = { type: string, payload: string };


function reducer(state: SincronizaCatalogos, action: Action): SincronizaCatalogos {
    switch(action.type) {
        case 'SET_MESSAGE':
            return { ...state, sincronizaCatalogos: action.payload };
        case 'TOGGLE_TOAST':
            return { ...state, showToast: !state.showToast };
        default:
            return state;
    }
}


const { StoreProvider, useStore, useDispatch } = CreateStore<SincronizaCatalogos, Action>(reducer, defaultStore);

export abstract class SincronizaCatalogosStore {
    public static Provider = StoreProvider;
    public static useStore = useStore;
    public static useDispatch = useDispatch;
}