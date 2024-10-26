import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType} from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>


export const useDeleteTransaction = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async()=>{
            const reponse = await client.api.transactions[":id"]["$delete"]({param:{id}});
            return await reponse.json();
        },
        
        onSuccess:()=>{
            toast.success("Transaction deleted!")
            queryClient.invalidateQueries({queryKey:["transactions"]})
            queryClient.invalidateQueries({queryKey:["transaction",{id}]})
            // TODO:
        },
        onError:()=>{
            toast.error("Failed to delete transaction")

        }
    })
    return mutation;
}