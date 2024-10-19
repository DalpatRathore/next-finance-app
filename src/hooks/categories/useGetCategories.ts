import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetCategories =()=>{
    const query = useQuery({
        queryKey:["categories"],
        queryFn: async()=>{
            // const response:AccountType = fetch("/api/categories")
            const reponse = await client.api.categories.$get();

            if(!reponse.ok) throw new Error ("Failed to fetch categories");
            
            const {data} = await reponse.json();
            return  data;
        }
    })
    return query;
}