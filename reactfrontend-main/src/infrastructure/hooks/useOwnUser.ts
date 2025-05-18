import { useAppSelector } from "@application/store"
import {useGetUser} from "@infrastructure/apis/api-management";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { isUndefined } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * You can use this hook to retrieve the own user from the backend.
 * You can create new hooks by using and combining other hooks.
 */
export const useOwnUser = () => {
    const { userId, token } = useAppSelector(x => x.profileReducer);
    const { data, refetch, isFetching } = useGetUser(userId);
    const queryClient = useQueryClient();
    // Refetch user data when token changes (e.g., after login)
    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token, refetch]);
    return data?.response;
}

/**
 * This hook returns if the current user has the given role.
 */
export const useOwnUserHasRole = (role: UserRoleEnum) => {
    const ownUser = useOwnUser();

    if (isUndefined(ownUser)) {
        return;
    }

    return ownUser?.role === role;
}

/**
 * This hook returns if the JWT token has expired or not.
 */
export const useTokenHasExpired = () => {
    const { loggedIn, exp } = useAppSelector(x => x.profileReducer);
    const now = Date.now() / 1000;

    return {
        loggedIn,
        hasExpired: !exp || exp < now
    };
}