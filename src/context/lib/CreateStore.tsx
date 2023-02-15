import React from "react";

/**
 * Cria uma store (context)
 * Contexts facilitam a comunicação entre diferentes componentes sem que haja um controle direto pelos componentes pai
 * Use Cases: Theme, Authentication, User Config
 *  
 * @param reducer função reducer, responsável pela lógica de como criar um novo estado a partir do estado anterior (state: T) + parametros (action: S).
 * @param initialState estado (state: T) inicial
 * @param persistKey persiste o estado no localStorage (cache) entre sessões do usuario. Deixar em branco não salva o estado.
 */
export default function CreateStore<T, S>(reducer: (state: T, action: S) => T, initialState: T, persistKey = "") {
    const storeContext = React.createContext<T>(initialState);
    const dispatchContext = React.createContext<React.Dispatch<S>>(() => { });

    function StoreProvider({ children }: {children: React.ReactNode}) {
        const [store, dispatch] = React.useReducer(reducer, load());

        React.useEffect(() => {
            if (!persistKey) return;
            localStorage.setItem(persistKey, JSON.stringify(store));
        }, [persistKey, store]);

        return (
            <dispatchContext.Provider value={dispatch}>
                <storeContext.Provider value={store}>
                    {children}
                </storeContext.Provider>
            </dispatchContext.Provider>
        );
    }
    
    function load(): T {
        if (!persistKey) return initialState; 
        const storage = localStorage.getItem(persistKey);
        const state = storage ? JSON.parse(storage) : initialState;
        return state;
    }

    function useStore() {
        return React.useContext<T>(storeContext);
    }

    function useDispatch() {
        return React.useContext<React.Dispatch<S>>(dispatchContext);
    }

    return { StoreProvider, useStore, useDispatch };
}