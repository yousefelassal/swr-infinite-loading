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

export async function read(id:number) {
    'use server'
    const orders = await sql`
      SELECT * FROM orders WHERE id = ${id}
    `;
    return orders.rows;
}

export async function update(id:number, name:string, value:any) {
    'use server'
    await sql`
      UPDATE orders
      SET name = ${name}, value = ${value}
      WHERE id = ${id}
    `;
}

export async function del(id:number) {
    'use server'
    await sql`
      DELETE FROM orders WHERE id = ${id}
    `;
}