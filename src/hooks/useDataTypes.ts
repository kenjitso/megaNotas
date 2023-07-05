import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

interface ISearchData<T> {
    page: number;
    limit?: number;
    items?: T[];
    total: number;
}

interface IProps<T> {

    queryKey: string[];
    queryFn: () => Promise<ISearchData<T>>;
    filtro: string;
    defaultOrder: string;
}

export default function useDataTypes<T>({
    queryKey,
    queryFn,
    filtro,
    defaultOrder
}: IProps<T>) {

    const [ordem, setOrdem] = useState(true);
    const [ordenar, setOrdenar] = useState<string>(defaultOrder);


    const { isFetching, isError, data } = useQuery([...queryKey, filtro, ordenar, ordem], queryFn, {
        enabled: true,
        refetchOnMount: true
    });

    const orderBy = (campo: keyof T) => {
        if (typeof campo !== "string") throw new Error;
        if (ordenar === campo) setOrdem(!ordem);
        setOrdenar(campo);
    };


    const result = {


        isLoading: isFetching,
        orderBy,
        ordem,
        ordenar,
        data,
        isError
    };

    return result;

}