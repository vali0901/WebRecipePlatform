import { RecipeApi } from "../client/apis/RecipeApi";
import { Configuration } from "../client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@application/store";

const getRecipesQueryKey = "getRecipesQuery";
const addRecipeMutationKey = "addRecipeMutation";
const updateRecipeMutationKey = "updateRecipeMutation";
const deleteRecipeMutationKey = "deleteRecipeMutation";

const getFactory = (token: string | null) => new RecipeApi(new Configuration({ accessToken: token ?? "" }));

export const useGetRecipes = (page: number, pageSize: number, search: string = "") => {
    const { token } = useAppSelector(x => x.profileReducer);
    const enabled = Boolean(token && page > 0 && pageSize > 0);
    return useQuery({
        queryKey: [getRecipesQueryKey, token, page, pageSize, search],
        queryFn: async () => await getFactory(token).apiRecipeGetPageGet({ page, pageSize, search }),
        enabled,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchInterval: false,
        retry: 0 // fail fast for debug
    });
};

export const useAddRecipe = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [addRecipeMutationKey, token],
        mutationFn: async (recipe: any) => await getFactory(token).apiRecipeAddPost({ recipeAddDTO: recipe }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [getRecipesQueryKey] })
    });
};

export const useUpdateRecipe = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [updateRecipeMutationKey, token],
        mutationFn: async (recipe: any) => await getFactory(token).apiRecipeUpdatePut({ recipeUpdateDTO: recipe }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [getRecipesQueryKey] })
    });
};

export const useDeleteRecipe = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [deleteRecipeMutationKey, token],
        mutationFn: async (id: string) => await getFactory(token).apiRecipeDeleteIdDelete({ id }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [getRecipesQueryKey] })
    });
};
