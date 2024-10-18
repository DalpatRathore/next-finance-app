import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetAccounts =()=>{
    const query = useQuery({
        queryKey:["accounts"],
        queryFn: async()=>{
            // const response:AccountType = fetch("/api/accounts")
            const reponse = await client.api.accounts.$get();

            if(!reponse.ok) throw new Error ("Failed to fetch accounts");
            
            const {data} = await reponse.json();
            return  data;
        }
    })
    return query;
}