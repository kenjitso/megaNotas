import React from "react";

/**
 * Cria um hook para atualizar dados de uma classe/objeto.
 */
export default function useClass<T>(initialState: T) {
    const [state, set] = React.useState<T>(initialState);

    const update = <P extends keyof T>(key: P, value: T[P]) => {
        const update = structuredClone(state);
        update[key] = value;
        set(update);
    };

    return {state, update, set};
}