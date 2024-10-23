import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferResponseType} from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>


export const useDeleteCategory = (id?:string) =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async()=>{
            const reponse = await client.api.categories[":id"]["$delete"]({param:{id}});
            return await reponse.json();
        },
        
        onSuccess:()=>{
            toast.success("Category deleted!")
            queryClient.invalidateQueries({queryKey:["categories"]})
            queryClient.invalidateQueries({queryKey:["category",{id}]})
            // TODO:
        },
        onError:()=>{
            toast.error("Failed to delete category")

        }
    })
    return mutation;
}