// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseGlobal | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ✅ Assert that cached is now defined
const safeCached = cached!;

async function dbConnect(): Promise<typeof mongoose> {
  if (safeCached.conn) return safeCached.conn;

  if (!safeCached.promise) {
    safeCached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  safeCached.conn = await safeCached.promise;
  return safeCached.conn;
}

export default dbConnect;
