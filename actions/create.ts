'use server'

import { sql } from '@vercel/postgres';

export async function create(name:string, value:any) {
    'use server'
    await sql`
      INSERT INTO orders (name, value)
      VALUES (${name}, ${value})
      RETURNING *
    `;
}