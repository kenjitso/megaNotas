import { toast } from "react-toastify";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useClass from "./useClass";

interface Props<T> {
    // Chave de busca dos dados, utilizada para caching.
    queryKey: string[],
    // Função utilizada para buscar os dados do objeto no backend.
    queryFn: () => Promise<T>,
    // Função utilizada para gravar os dados do objeto no backend.
    saveFn: (data: T) => Promise<T>,
    // Chave de busca dos dados para invalidar ao salvar o objeto no banco de dados (invalida o cache).
    invalidateKeys?: string[][],
    // Função executada caso haja um erro ao gravar os dados do objeto no backend.
    onSaveError?: (error: unknown) => void,
    // Função executada caso haja um erro ao buscar os dados do objeto no backend.
    onQueryError?: (error: unknown) => void,
    // Função executada ao terminar de gravar o objeto no backend.
    onSaveSuccess?: (data: T) => void,
    // Função executada ao terminar o carregamento do objeto no backend.
    onQuerySuccess?: (data: T) => void,
    // Habilita o carregamento dos dados da função.
    // Use case para falso: Criar novo objeto no backend => Não fazer o download do estado atual e apenas usar o mutation para gravar.
    queryEnabled?: boolean,
    // Caso esteja definido, utiliza o mecanismo de toasts para informar o status de carregamento/gravação dos dados.
    toasts?: {
        // Status de carregamento
        fetching?: string,
        saving?: string,
        // Status de conclusão
        fetchComplete?: string,
        saveComplete?: string,
        // Status de erro
        fetchError?: string,
        saveError?: string
    }
}

/**
 * Cria um hook para atualizar dados de uma classe/objeto e salvar no banco de dados.
 */
export default function useQueryMutation<T>(initialState: T, {
    queryKey,
    queryFn,
    saveFn,
    invalidateKeys = [queryKey],
    onQuerySuccess = () => {},
    onQueryError = () => {},
    onSaveSuccess = () => {},
    onSaveError = () => {},
    queryEnabled = true,
    toasts
}: Props<T>) {
    const idToast = queryKey.join(";");
    const queryClient = useQueryClient();
    // Cria as funções para edição do objeto interno.
    const { state, set, update } = useClass<T>(initialState);
    const query = useQuery(queryKey, () => {
        // Caso haja toasts, cria as mensagens.
        if (toasts?.fetching) toast.loading(toasts.fetching, { toastId: idToast });

        return queryFn();
    }, {
        onSuccess: (data) => {
            // Ao fazer o download do objeto, atualiza o objeto interno para edição.
            set(data); 

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
    const mutation = useMutation(() => {
        // Caso haja toasts, cria as mensagens.
        if (toasts?.saving) toast.loading(toasts.saving, { toastId: idToast });
        return saveFn(state);
    }, {
        onSuccess: (data) => {
            // Invalida todas as chaves de busca (cache) relacionados à esse objeto
            for(const keys of invalidateKeys) {
                queryClient.invalidateQueries(keys);
            }
            
            // Manda o objeto salvo para a função pai.
            onSaveSuccess(data);

            // Caso haja toasts, atualiza as mensagens.
            if (!toasts?.saveComplete) return;
            toast.update(idToast, { render: toasts.saveComplete, type: "success", isLoading: false, autoClose: 3000 });
        },
        onError: (error) => {
            // Manda o objeto de errro para a função pai.
            onSaveError(error);

            // Caso haja toasts, atualiza as mensagens.
            if (!toasts?.saveError) return;
            toast.update(idToast, { render: toasts.saveError, type: "error", isLoading: false, autoClose: false });
        }
    });

    return {
        isLoading: query.isLoading || mutation.isLoading,
        isError: query.isError || mutation.isError,
        isQueryLoading: query.isLoading,
        isQueryError: query.isError,
        isMutationLoading: mutation.isLoading,
        isMutationError: mutation.isError,
        refetch: query.refetch,
        save: mutation.mutate,
        state,
        update,
        set
    };
}