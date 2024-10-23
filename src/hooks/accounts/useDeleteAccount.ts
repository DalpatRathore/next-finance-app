import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType} from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>


export const useDeleteAccount = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async()=>{
            const reponse = await client.api.accounts[":id"]["$delete"]({param:{id}});
            return await reponse.json();
        },
        
        onSuccess:()=>{
            toast.success("Account deleted!")
            queryClient.invalidateQueries({queryKey:["accounts"]})
            queryClient.invalidateQueries({queryKey:["account",{id}]})
            // TODO:
        },
        onError:()=>{
            toast.error("Failed to delete account")

        }
    })
    return mutation;
}