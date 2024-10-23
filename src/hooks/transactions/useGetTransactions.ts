import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

export const useGetTransactions =()=>{
    const params = useSearchParams();
    const from = params.get("from")||"";
    const to = params.get("to")||"";
    const accountId = params.get("accountId")||"";

    const query = useQuery({
        queryKey:["transactions",{from,to, accountId}],
        queryFn: async()=>{
            // const response:AccountType = fetch("/api/transactions")
            const reponse = await client.api.transactions.$get({
                query:{
                    from,to,accountId
                }
            });

            if(!reponse.ok) throw new Error ("Failed to fetch transactions");
            
            const {data} = await reponse.json();
            return  data;
        }
    })
    return query;
}