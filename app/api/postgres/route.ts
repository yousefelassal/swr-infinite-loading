import { NextResponse, NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const q = searchParams.get('q') || ''
    const query = `%${q}%`
    const offset = (page - 1) * limit
    if (q === '') {
        const orders = await sql`SELECT * FROM orders ORDER BY "createdAt" DESC OFFSET ${offset} LIMIT ${limit}`
        return NextResponse.json(orders.rows)
    }
    const orders = await sql`SELECT * FROM orders WHERE name ILIKE ${query} ORDER BY "createdAt" DESC OFFSET ${offset} LIMIT ${limit}`
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
