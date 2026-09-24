import { PrismaClient } from '@prisma/client';

// ─── SQLite (Prisma) Setup ──────────────────────────────────────────
// Sandbox uses a local SQLite database. DATABASE_URL is a file: URL set in .env.
// We reuse a single PrismaClient across hot-reloads in dev to avoid exhausting
// SQLite connection handles.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let db: any;

try {
  const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

  db = prisma;
} catch (err) {
  console.warn(
    '[DB] Prisma client initialization failed — using in-memory mock:',
    err instanceof Error ? err.message : err,
  );

  // Fallback: in-memory mock (keeps the site functional even without a DB)
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
    },
  );
}

export { db };
