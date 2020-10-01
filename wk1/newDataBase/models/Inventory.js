const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: String,
  descriptions: String,
  inventory: Number,
  price: Number
});

module.exports = mongoose.model('InventoryModel', InventorySchema)