import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {InferRequestType,InferResponseType} from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>

export const useBulkDeleteAccounts = () =>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            console.log("Request data:", json);
            const response = await client.api.accounts["bulk-delete"]["$post"](json);
            
            // Check if the response is not OK
            if (!response.ok) {
                const errorData = await response.json();  
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();  
            return data;
        }, 
        onSuccess: () => {
            toast.success("Accounts deleted!");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError: (error) => {
            toast.error(`Failed to delete accounts: ${error.message}`);
            console.error("Mutation error:", error);
        }
    });
    return mutation;
}