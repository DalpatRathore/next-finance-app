
import { accounts } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";

const db = drizzle(process.env.DATABASE_URL!);


const app = new Hono()
    .get("/", async(ctx)=>{
        const data = await db.select({
            id:accounts.id,
            name:accounts.name
        }).from(accounts);

    return ctx.json({data})
})

export default app