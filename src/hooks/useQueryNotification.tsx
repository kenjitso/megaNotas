import { toast } from "react-toastify";

import { useQuery } from "@tanstack/react-query";


interface Props<T> {
    // Chave de busca dos dados, utilizada para caching.
    queryKey: string[],
    // Função utilizada para buscar os dados do objeto no backend.
    queryFn: () => Promise<T>,
    // Função executada caso haja um erro ao buscar os dados do objeto no backend.
    onQueryError?: (error: unknown) => void,
    // Função executada ao terminar o carregamento do objeto no backend.
    onQuerySuccess?: (data: T) => void,
    // Habilita o carregamento dos dados da função.
    // Use case para falso: Criar novo objeto no backend => Não fazer o download do estado atual e apenas usar o mutation para gravar.
    queryEnabled?: boolean,
    // Caso esteja definido, utiliza o mecanismo de toasts para informar o status de carregamento/gravação dos dados.
    toasts?: {
        // Status de carregamento
        fetching?: string,
        // Status de conclusão
        fetchComplete?: string,
        // Status de erro
        fetchError?: string
    }
}

export default function useQueryNotification<T>({
    queryKey,
    queryFn,
    onQuerySuccess = () => { },
    onQueryError = () => { },
    queryEnabled = true,
    toasts
}: Props<T>) {
    const idToast = queryKey.join(";");
    const query = useQuery(queryKey, () => {
        // Caso haja toasts, cria as mensagens.
        if (toasts?.fetching) toast.loading(toasts.fetching, { toastId: idToast });
        return queryFn();
    }, {
        onSuccess: (data) => {
            // Manda o objeto para a função pai.
            onQuerySuccess(data);

            // Caso haja toasts, atualiza as mensagens.
            if (!toasts?.fetchComplete) return;
            toast.update(idToast, { render: toasts.fetchComplete, type: "success", isLoading: false, autoClose: 3000 });
        },
        onError: (error) => {
            // Manda o objeto para a função pai.
            onQueryError(error);

            // Caso haja toasts, atualiza as mensagens.
            if (!toasts?.fetchError) return;
            toast.update(idToast, { render: toasts.fetchError, type: "error", isLoading: false, autoClose: false });
        },
        enabled: queryEnabled
    });

    return query;
}