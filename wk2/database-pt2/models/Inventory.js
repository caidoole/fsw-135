const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  description: String,
  inventory: Number,
  price: Number
});

module.exports = mongoose.model('Inventory', InventorySchema)