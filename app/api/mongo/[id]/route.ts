import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Order from '@/models/order'

export async function GET(
    req: NextRequest,
    { params } : { params : { id: string }}
) {
    await dbConnect()
    const order = await Order.findById(params.id)
    return NextResponse.json(order)
}