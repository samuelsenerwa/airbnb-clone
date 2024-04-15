import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// preventing creation of mutiple prisma client when nextjs 13 hot reloading

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
