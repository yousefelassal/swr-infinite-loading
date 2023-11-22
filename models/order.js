const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    value: Number,
    createdAt: { type: Date, default: Date.now },
});

orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id; 
        delete returnedObject.__v;
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;