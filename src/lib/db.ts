import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// ─── Prisma Postgres Setup ────────────────────────────────────────────
// Uses @prisma/adapter-pg to connect to Prisma Postgres (cloud PostgreSQL).
// DATABASE_URL = pooled connection (for runtime — optimized for serverless)
// DIRECT_URL  = direct connection (for Prisma CLI migrations only)

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[DB] No DATABASE_URL set — database features will be unavailable');
}

let db: any;

try {
  if (connectionString) {
    // Create the PostgreSQL adapter with the pooled connection string
    const adapter = new PrismaPg({ connectionString });
    
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };
    
    const prisma =
      globalForPrisma.prisma ??
      new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
      });
    
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
    
    db = prisma;
    console.log('[DB] Connected to Prisma Postgres via @prisma/adapter-pg');
  } else {
    throw new Error('DATABASE_URL not configured');
  }
} catch (err) {
  console.warn('[DB] Prisma Postgres connection failed — using in-memory mock:', err instanceof Error ? err.message : err);
  
  // Fallback: in-memory mock (for development without database)
  let mockId = 1;
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: any) => {
      const id = String(mockId++);
      console.log('[DB] Mock create:', d?.data ? Object.keys(d.data) : 'unknown');
      return { id, ...d?.data };
    },
    update: async (d: any) => ({ id: d?.where?.id ?? 'mock', ...d?.data }),
    delete: async () => ({}),
    count: async () => 0,
    upsert: async (d: any) => ({ id: d?.where?.id ?? 'mock', ...d?.create }),
  };
  db = new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === 'then' || typeof prop === 'symbol') return undefined;
        return new Proxy(noOp, {
          get: (_t, method) => {
            if (typeof noOp[method as string] === 'function') return noOp[method as string];
            return noOp;
          },
        });
      },
    }
  );
}

export { db };
