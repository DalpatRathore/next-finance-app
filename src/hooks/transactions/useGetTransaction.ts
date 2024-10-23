import { convertAmountFromMiliUnits } from "@/lib/amountUtil";
import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetTransaction =(id?:string)=>{
    const query = useQuery({
        enabled:!!id,
        queryKey:["transaction",{id}],
        queryFn: async()=>{
            // const response:TransactionType = fetch("/api/transactions")
            const reponse = await client.api.transactions[":id"].$get({
                param:{id}
            });

            if(!reponse.ok) throw new Error ("Failed to fetch transaction");
            
            const {data} = await reponse.json();
            return  {
                ...data,
                amount: convertAmountFromMiliUnits(data.amount)
            };
        }
    })
    return query;
}