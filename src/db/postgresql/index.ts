import { Pool } from "pg"
import "dotenv/config"

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

pool.on('connect', () => {
  console.log("Client connected")
})

pool.on('error', (err, _client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})  

pool.on('release', (err, _client) => {
  if (err) console.error('Unexpected error on idle client trying to release')
  console.log('Client released')
})