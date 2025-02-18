import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/apiClient";

const getProfile = async () => {
    const res = await apiClient.get(`/profile/me`);
    return res.data;
};

const updateProfile = async (data: any) => {
    const res = await apiClient.put(`/profile/me`, data);
    return res.data;
};

const getSuggestions = async (params: any) => {
    const res = await apiClient.get(`/profile/suggestion`, { params });
    return res.data;
};

const getUser = async (profileId: string) => {
    const res = await apiClient.get(`/profile/${profileId}`);
    return res.data;
};

export function useUserProfile() {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: getProfile,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
    });
}

export function useUserSuggestions(params: any) {
    return useQuery({
        queryKey: ["userSuggestions", params],
        queryFn: () => getSuggestions(params),
        enabled: !!params,
    });
}

export function useUser(profileId: string) {
    return useQuery({
        queryKey: ["userProfile", profileId],
        queryFn: () => getUser(profileId),
        enabled: !!profileId,
    });
}
