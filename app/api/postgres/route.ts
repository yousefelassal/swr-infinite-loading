import { NextResponse, NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const q = searchParams.get('q') || ''
    if (q === '') {
        const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC OFFSET ${page - 1} LIMIT ${limit}`
        return NextResponse.json(orders.rows)
    }
    const query = `%${q}%`
    const orders = await sql`SELECT * FROM orders WHERE name ILIKE ${query} ORDER BY created_at DESC OFFSET ${page - 1} LIMIT ${limit}`
    return NextResponse.json(orders.rows)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const newOrder = {
        name: body.name,
        value: body.value,
    }
    const order = await sql`INSERT INTO orders (name, value) VALUES (${newOrder.name}, ${newOrder.value}) RETURNING *`
    return NextResponse.json({ message: 'Order created successfully', order })
}
