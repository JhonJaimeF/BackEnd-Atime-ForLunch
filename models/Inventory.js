const mongoose = require('mongoose');

const {Schema} = mongoose;

const SchemaInventory = new Schema({
  Product : {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required : true,
  },  
  quantity: { 
    type: Number, 
    required: true }
})

const Inventory = mongoose.model('Inventory',SchemaInventory,);
module.exports = Inventory;