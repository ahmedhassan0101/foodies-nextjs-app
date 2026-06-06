// src\lib\db.js
import mongoose from "mongoose";

// We reuse the same connection across requests in development (hot reload)
// and across serverless invocations in production via the global cache below.
// Without this, every request would open a new connection and exhaust the pool.

// 1. Create a global cache object to store the connection and promise
// what is the cache for? It prevents multiple connections being created during
// hot reload or concurrent requests in serverless environments.
// It stores the connection and promise so they can be reused.

let cached = global._mongooseCache;

// 2. Check if the cache already has a connection or promise before creating a new one
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

// 3. Export an async function to connect to the database, using the cache to avoid redundant connections
export async function connectDB() {
  // If a connection already exists, return it immediately
  if (cached.conn) return cached.conn;
  // If a connection is in the process of being established, wait for it to complete and return the result
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI);
  }
  // Await the promise to establish the connection and store it in the cache
  cached.conn = await cached.promise;
  // Return the established connection from the cache
  return cached.conn;
}
