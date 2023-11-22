import mongoose from 'mongoose'

export interface Orders extends mongoose.Document {
  name: string
  value: number
  createdAt: Date
}

/* Orderschema will correspond to a collection in your MongoDB database. */
const OrderSchema = new mongoose.Schema<Orders>({
  name: {
    /* The name of this Order */

    type: String,
    required: [true, 'Please provide a name for this Order.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  value: {
    /* The value of this Order */

    type: Number,
    required: [true, 'Please provide a value for this Order.'],
  },
  createdAt: {
    /* The date this Order was created */

    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order || mongoose.model<Orders>('Order', OrderSchema)