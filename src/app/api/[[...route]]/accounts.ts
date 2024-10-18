
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";

const db = drizzle(process.env.DATABASE_URL!);


const app = new Hono()
    .get("/", clerkMiddleware() ,async(ctx)=>{
        const auth = getAuth(ctx);
        if(!auth?.userId){
            
                return ctx.json({
                    error:"Unauthorized access"
                },401);
            
        }
        const data = await db.select({
            id:accounts.id,
            name:accounts.name
        }).from(accounts).where(eq(accounts.userId, auth.userId));

    return ctx.json({data})
})

export default app