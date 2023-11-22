import connectDB from "@/utils/db";
import Order from "@/models/order"

export async function GET(req: any, res: any) {
  await connectDB();
  
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const orders = await Order.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
    
    res.status(200).json({ orders })
  } catch (error) {
        res.status(500).json({ error })
    }
}