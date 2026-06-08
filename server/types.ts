import type { User as DbUser } from "@shared/schema";

// Make passport's req.user resolve to our database User shape.
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends DbUser {}
  }
}

export {};
