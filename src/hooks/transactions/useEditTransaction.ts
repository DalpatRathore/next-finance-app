import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferRequestType,InferResponseType} from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"]

export const useEditTransaction = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json)=>{
            const reponse = await client.api.transactions[":id"]["$patch"]({json, param:{id}});
            return await reponse.json();
        },
        
        onSuccess:()=>{
            toast.success("Transaction updated!")
            queryClient.invalidateQueries({queryKey:["transactions"]})
            queryClient.invalidateQueries({queryKey:["transaction",{id}]})
            // TODO:
        },
        onError:()=>{
            toast.error("Failed to update transaction")

        }
    })
    return mutation;
}