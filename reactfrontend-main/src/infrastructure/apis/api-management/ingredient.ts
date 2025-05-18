import { useAppSelector } from "@application/store";
import { Configuration, IngredientApi } from "../client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";

const getIngredientsQueryKey = "getIngredientsQuery";
const getIngredientQueryKey = "getIngredientQuery";
const addIngredientMutationKey = "addIngredientMutation";
const updateIngredientMutationKey = "updateIngredientMutation";
const deleteIngredientMutationKey = "deleteIngredientMutation";

const getFactory = (token: string | null) => new IngredientApi(new Configuration({ accessToken: token ?? "" }));

export const useGetIngredients = (page: number, pageSize: number, search: string = "") => {
    const { token } = useAppSelector(x => x.profileReducer);
    return {
        ...useQuery({
            queryKey: [getIngredientsQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiIngredientGetPageGet({ page, pageSize, search }),
            refetchInterval: Infinity,
            refetchOnWindowFocus: false
        }),
        queryKey: getIngredientsQueryKey
    };
};

export const useGetIngredient = (id: string | null) => {
    const { token } = useAppSelector(x => x.profileReducer);
    return {
        ...useQuery({
            queryKey: [getIngredientQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiIngredientGetByIdIdGet({ id: id ?? "" }),
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
            enabled: !isEmpty(id)
        }),
        queryKey: getIngredientQueryKey
    };
};

export const useAddIngredient = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [addIngredientMutationKey, token],
        mutationFn: async (ingredient: any) => await getFactory(token).apiIngredientAddPost({ ingredientAddDTO: ingredient }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [getIngredientsQueryKey] })
    });
};

export const useUpdateIngredient = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [updateIngredientMutationKey, token],
        mutationFn: async (ingredient: any) => await getFactory(token).apiIngredientUpdatePut({ ingredientUpdateDTO: ingredient }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [getIngredientsQueryKey] })
    });
};

export const useDeleteIngredient = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [deleteIngredientMutationKey, token],
        mutationFn: async (id: string) => await getFactory(token).apiIngredientDeleteIdDelete({ id }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [getIngredientsQueryKey] })
    });
};
