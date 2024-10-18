import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { accounts } from '@/db/schema';
  
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const transaction: typeof accounts.$inferInsert = {
    name: 'John',
    userId: 'john@example.com',
  };

  await db.insert(accounts).values(transaction);
  console.log('New transaction created!')

  const transactions = await db.select().from(accounts);
  console.log('Getting all transactions from the database: ', transactions)
  
}

main();