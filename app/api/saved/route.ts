import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Order from '@/models/order'
import { sql } from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.floor(parseInt(searchParams.get('limit') || '10') / 2)
    const q = searchParams.get('q') || ''
    const query = `%${q}%`
    const offset = (page - 1) * limit
    
    let allSaved:any = []

    const postgresSaved = await sql`SELECT * FROM orders WHERE name ILIKE ${query} AND saved = true ORDER BY "savedAt" DESC OFFSET ${offset} LIMIT ${limit}`
    const postgres = postgresSaved.rows.map((row:any) => {
        return {
            ...row,
            db: 'postgres'
        }
    })
    allSaved = allSaved.concat(postgres)

    await dbConnect()
    const mongoSaved = await Order.find({ name: { $regex: q, $options: 'i' }, saved:true }).sort({ savedAt: -1 }).skip((page - 1) * limit).limit(limit)
    const mongo = mongoSaved.map((row:any) => {
        const { _id, __v, ...rest } = row._doc
        return {
            ...rest,
            id: row._doc._id,
            db: 'mongo'
        }
    })
    allSaved = allSaved.concat(mongo)

    return NextResponse.json(allSaved.sort((a:any, b:any) => b.savedAt - a.savedAt))
}