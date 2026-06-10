-- Session store table for connect-pg-simple (express-session).
-- Created here so it is guaranteed to exist; idempotent (IF NOT EXISTS) so it
-- is safe whether or not connect-pg-simple's createTableIfMissing already made it.
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");