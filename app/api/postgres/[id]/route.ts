import { NextResponse, NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(
    req: NextRequest,
    { params } : { params : { id: string }}
) {
    const order = await sql`SELECT * FROM orders WHERE id = ${params.id}`
    return NextResponse.json(order.rows)
}

export async function PUT(
    req: NextRequest,
    { params } : { params : { id: string }}
) {
    const body = await req.json()
    const order = await sql`UPDATE orders SET name = ${body.name}, value = ${body.value} WHERE id = ${params.id} RETURNING *`
    return NextResponse.json({ message: 'Order updated successfully', order })
}

export async function DELETE(
    req: NextRequest,
    { params } : { params : { id: string }}
) {
    const order = await sql`DELETE FROM orders WHERE id = ${params.id} RETURNING *`
    return NextResponse.json({ message: 'Order deleted successfully', order })
}