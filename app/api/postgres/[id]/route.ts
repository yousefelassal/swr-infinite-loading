import { NextResponse, NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(
    req: NextRequest,
    { params } : { params : { id: string }}
) {
    const order = await sql`SELECT * FROM orders WHERE id = ${params.id}`
    return NextResponse.json(order.rows)
}