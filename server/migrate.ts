import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import { env } from "./env";

/**
 * Apply pending SQL migrations. Run on deploy (e.g. Railway pre-deploy command
 * `npm run db:migrate`) rather than on every instance boot to avoid races.
 */
async function main() {
  const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
  const db = drizzle(pool);
  console.log("Running migrations…");
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("✅ Migrations complete.");
  await pool.end();
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
