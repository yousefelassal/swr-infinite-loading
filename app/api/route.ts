import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Order from '@/models/order'

export async function GET(req: NextRequest) {
  await dbConnect()
  const searchParams = req.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const orders = await Order.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)
  return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const body = await req.json()
  const newOrder = {
    name: body.name,
    value: body.value,
  }
  const order = new Order(newOrder)
  await order.save()
  return NextResponse.json({ message: 'Order created successfully', newOrder })
}