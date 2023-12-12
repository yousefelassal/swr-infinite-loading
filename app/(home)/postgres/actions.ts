'use server'

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache'

export async function createOrder(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
  })
  const parse = schema.safeParse({
    name: formData.get('name'),
    value: formData.get('value'),
  })

  if (!parse.success) {
    return { message: 'Failed to create order' }
  }

  const data = parse.data

  try {
    await sql`
      INSERT INTO orders (name, value)
      VALUES (${data.name}, ${data.value})
      RETURNING *
    `;
    revalidatePath('/')
    
    return { message: `Added name ${data.name}` }
  } catch (e) {
    return { message: 'Failed to create name' }
  }
}

export async function create(name:string, value:any) {
    await sql`
      INSERT INTO orders (name, value)
      VALUES (${name}, ${value})
      RETURNING *
    `;
}

export async function read(id:number) {
    const orders = await sql`
      SELECT * FROM orders WHERE id = ${id}
    `;
    return orders.rows;
}

export async function update(order:any) {
    await sql`
      UPDATE orders
      SET name = ${order.name}, value = ${order.value}
      WHERE id = ${order.id}
    `;
}

export async function updateSaved(order:any) {
    await sql`
      UPDATE orders
      SET saved = ${order.saved}, "savedAt" = ${order.savedAt}
      WHERE id = ${order.id}
    `;
}

export async function del(id:number) {
    await sql`
      DELETE FROM orders WHERE id = ${id}
    `;
}