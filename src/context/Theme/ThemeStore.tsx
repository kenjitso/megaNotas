import CreateStore from "@/context/lib/CreateStore";

interface Theme {
    darkmode: boolean;
}

const defaultStore: Theme = {
    darkmode: false
};

interface Actions {
    type: "TOGGLE" | "SET",
    theme: keyof Theme,
    value?: boolean
}

function reducer(state: Theme, action: Actions) {
    const newState = { ...state };
    // SET
    if (action.type === "SET") {
        if (!action.value) throw new Error("Falta o valor do tema à ser gravado");
        newState[action.theme] = action.value;
        return newState;
    }
    // TOGGLE
    newState[action.theme] = !newState[action.theme];
    return newState;
}

const { StoreProvider, useStore, useDispatch } = CreateStore<Theme, Actions>(reducer, defaultStore, "theme");

export abstract class ThemeStore {
    public static Provider = StoreProvider;
    public static useStore = useStore;
    public static useDispatch = useDispatch;
}