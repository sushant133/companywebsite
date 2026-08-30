import "server-only";

import { MongoClient, ServerApiVersion, type Db } from "mongodb";

import { env, requireMongoUri } from "@/lib/env";

/**
 * One client per process. Next.js reloads modules on every edit in development,
 * so the promise is parked on `globalThis` to stop each reload from opening a
 * fresh pool against Atlas.
 */
const globalForMongo = globalThis as typeof globalThis & {
  __mantrasphereMongo?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  if (!globalForMongo.__mantrasphereMongo) {
    const client = new MongoClient(requireMongoUri(), {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
      retryWrites: true,
    });
    globalForMongo.__mantrasphereMongo = client.connect();
  }
  return globalForMongo.__mantrasphereMongo;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(env.mongoDbName);
}
