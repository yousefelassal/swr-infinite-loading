import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Order from '@/models/order'
import { sql } from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const q = searchParams.get('q') || ''
    const query = `%${q}%`
    const offset = (page - 1) * limit
    
    let allSaved:any = []

    const postgresSaved = await sql`SELECT * FROM orders WHERE name ILIKE ${query} AND saved = true ORDER BY "createdAt" DESC OFFSET ${offset} LIMIT ${limit/2}`
    const postgres = postgresSaved.rows.map((row:any) => {
        return {
            ...row,
            db: 'postgres'
        }
    })
    allSaved = allSaved.concat(postgres)

    await dbConnect()
    const mongoSaved = await Order.find({ name: { $regex: q, $options: 'i' }, saved:true }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit/2)
    const mongo = mongoSaved.map((row:any) => {
        return {
            ...row._doc,
            db: 'mongo'
        }
    })
    allSaved = allSaved.concat(mongo)

    return NextResponse.json(allSaved.sort((a:any, b:any) => b.createdAt - a.createdAt))
}