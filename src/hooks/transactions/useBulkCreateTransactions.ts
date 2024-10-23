import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferRequestType,InferResponseType} from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>

export const useBulkCreateTransactions = () =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.transactions["bulk-create"]["$post"](json);
            
            // Check if the response is not OK
            if (!response.ok) {
                const errorData = await response.json();  
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();  
            return data;
        }, 
        onSuccess: () => {
            toast.success("Transactions created!");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error) => {
            toast.error(`Failed to create transactions: ${error.message}`);
            console.error("Mutation error:", error);
        }
    });
    return mutation;
}