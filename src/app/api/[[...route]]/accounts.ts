
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
import { z } from "zod";

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
    .post("/", clerkMiddleware(), zValidator("json", insertAccountSchema.pick({
    name:true,
})), async(ctx)=>{
    const auth = getAuth(ctx);

    const values = ctx.req.valid("json");

    if(!auth?.userId){
        return ctx.json({error: "Unauthorized access"},401)
    }
    const [data] = await db.insert(accounts).values({
        userId:auth.userId,
        ...values
    }).returning();
    
    return ctx.json({data})

})
.post("/bulk-delete", clerkMiddleware(), zValidator("json", z.object({
    ids: z.array(z.string()),
})), async (ctx) => {
    const auth = getAuth(ctx);
    const values = ctx.req.valid("json");

    if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized access" }, 401);
    }
    
    if (!values.ids || !Array.isArray(values.ids)) {
        return ctx.json({ error: "Invalid input: 'ids' must be a non-empty array of strings" }, 400);
    }

    const data = await db.delete(accounts)
        .where(and(eq(accounts.userId, auth.userId), inArray(accounts.id, values.ids)))
        .returning({ id: accounts.id });

    return ctx.json({ data });
});

export default app