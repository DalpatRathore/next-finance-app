import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetAccount =(id?:string)=>{
    const query = useQuery({
        enabled:!!id,
        queryKey:["account",{id}],
        queryFn: async()=>{
            // const response:AccountType = fetch("/api/accounts")
            const reponse = await client.api.accounts[":id"].$get({
                param:{id}
            });

            if(!reponse.ok) throw new Error ("Failed to fetch account");
            
            const {data} = await reponse.json();
            return  data;
        }
    })
    return query;
}