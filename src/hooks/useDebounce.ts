import React from "react";

/**
 * Utilizado em campos de busca, o usuÃ¡rio digitando algum valor de pesquisa o sistema aguarda algum tempo antes
 * de fazer uma pesquisa de fato.
 */
export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}