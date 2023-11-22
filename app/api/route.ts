import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/utils/dbConnect'
import Order from '@/models/order'

export async function GET() {
  await dbConnect()
  const orders = await Order.find({}).sort({ createdAt: -1 })
  return NextResponse.json(orders)
}