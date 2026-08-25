import { PrismaClient } from '@prisma/client';

let prisma: any;

// Detect if we're running on Vercel (serverless) or in a local/self-hosted env.
// Vercel has an ephemeral filesystem — SQLite file-based DB will NOT persist.
// In that case, we use a lightweight in-memory mock that silently absorbs writes.
const isVercel = !!process.env.VERCEL;
const isServerless = isVercel || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

if (isServerless) {
  // Serverless / Vercel: use mock DB — SQLite file won't persist across invocations
  console.log('[DB] Serverless environment detected — using in-memory mock (writes are fire-and-forget)');
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
  prisma = new Proxy(
    {},
    {
      get: (_target, prop) => {
        // Allow .contactSubmission, .user, .post etc. to return the noOp proxy
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
} else {
  // Local / self-hosted: use real Prisma + SQLite
  try {
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };
    prisma =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
      });
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  } catch {
    console.warn('[DB] SQLite connection failed — using in-memory mock');
    let mockId = 1;
    const noOp = {
      findMany: async () => [],
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (d: any) => ({ id: String(mockId++), ...d?.data }),
      update: async (d: any) => ({ id: d?.where?.id ?? 'mock', ...d?.data }),
      delete: async () => ({}),
      count: async () => 0,
    };
    prisma = new Proxy({}, { get: () => noOp });
  }
}

export const db = prisma;
