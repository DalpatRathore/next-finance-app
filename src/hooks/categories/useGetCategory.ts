import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetCategory =(id?:string)=>{
    const query = useQuery({
        enabled:!!id,
        queryKey:["category",{id}],
        queryFn: async()=>{
            // const response:CategoryType = fetch("/api/categorys")
            const reponse = await client.api.categories[":id"].$get({
                param:{id}
            });

            if(!reponse.ok) throw new Error ("Failed to fetch category");
            
            const {data} = await reponse.json();
            return  data;
        }
    })
    return query;
}