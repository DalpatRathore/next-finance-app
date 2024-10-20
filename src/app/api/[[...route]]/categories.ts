
import { categories, insertCategorySchema } from "@/db/schema";
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
            id:categories.id,
            name:categories.name
        }).from(categories).where(eq(categories.userId, auth.userId));

    return ctx.json({data})
})
    .get("/:id", zValidator("param",z.object({
        id:z.string().optional()
    })), clerkMiddleware(), async(ctx)=>{
        const auth = getAuth(ctx);
        const {id} = ctx.req.valid("param");

        if(!auth?.userId){
            return ctx.json({error: "Unauthorized access"},401)
        }

        if(!id){
            return ctx.json({error:"Missing Id"},400)
        }
        const [data] = await db.select({
            id:categories.id,
            name:categories.name,
        }).from(categories).where(and(eq(categories.userId, auth.userId),eq(categories.id,id)))

        if(!data){
            return ctx.json({error:"Record not found!"},404)
        }

        return ctx.json({data})
        
    })
    .post("/", clerkMiddleware(), zValidator("json", insertCategorySchema.pick({
    name:true,
})), async(ctx)=>{
    const auth = getAuth(ctx);

    const values = ctx.req.valid("json");

    if(!auth?.userId){
        return ctx.json({error: "Unauthorized access"},401)
    }
    const [data] = await db.insert(categories).values({
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

        const data = await db.delete(categories)
            .where(and(eq(categories.userId, auth.userId), inArray(categories.id, values.ids)))
            .returning({ id: categories.id });

        return ctx.json({ data });
    })
    .patch("/:id", clerkMiddleware(), zValidator(
        "param", z.object({
            id:z.string().optional()
        })),
        zValidator(
            "json", insertCategorySchema.pick({
                name:true
            })
        ),
        async(ctx) =>{
            const auth = getAuth(ctx);
            const {id} = ctx.req.valid("param");
            const values = ctx.req.valid("json");

            if(!id){
                return ctx.json({error: "Missing id"},400)
            }
            if(!auth?.userId){
                return ctx.json({error: "Unauthorized access"},401)
            }

            const [data] = await db.update(categories).set(values).where(and(eq(categories.userId, auth.userId), eq(categories.id, id))).returning();

            if(!data){
                return ctx.json({error: "No record found"},404)


            }
            return ctx.json({data})
        }
    )
    .delete("/:id", clerkMiddleware(), zValidator(
        "param", z.object({
            id:z.string().optional()
        })),
    
        async(ctx) =>{
            const auth = getAuth(ctx);
            const {id} = ctx.req.valid("param");

            if(!id){
                return ctx.json({error: "Missing id"},400)
            }
            if(!auth?.userId){
                return ctx.json({error: "Unauthorized access"},401)
            }

            const [data] = await db.delete(categories)
                .where(
                    and(
                        eq(categories.userId, auth.userId),
                        eq(categories.id, id)
                    )
                    ).returning({id:categories.id});

            if(!data){
                return ctx.json({error: "No record found"},404)


            }
            return ctx.json({data})
        }
    )


export default app