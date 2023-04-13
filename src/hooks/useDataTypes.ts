import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";

interface ISearchData<T> {
    page: number;
    limit: number;
    items: T[];
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


    const { isFetching, isError, refetch, data } = useQuery([queryKey, filtro, ordenar, ordem], queryFn, {
        enabled: true,
        refetchOnMount: true
    });

    const orderBy = (campo: keyof T) => {
        if (typeof campo !== "string") throw new Error;
        if (ordenar === campo) setOrdem(!ordem);
        setOrdenar(campo);
    }

    React.useEffect(() => {
        refetch();
    }, [ordem, ordenar, filtro])

    const result = {

        refetch,
        isLoading: isFetching,
        orderBy,
        ordem,
        ordenar,
        data,
        isError
    }

    return result;

}