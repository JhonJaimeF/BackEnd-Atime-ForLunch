const Inventory = require("../models/Inventory")
const Product = require("../models/product")

module.exports = {
    'addProductsInventory': async (req, res) => { 
        const { externalId, product, quantity } = req.body; 
        try { 
            const existProductInventory = await Inventory.findOne({ externalId }); if (existProductInventory) { 
                return res.status(400).send({ state: false, message: "El producto ya existe en el inventario." }); 
            }  
            const existingProduct = await Product.findById(product); 
            if (!existingProduct) { 
                return res.status(400).send({ state: false, message: "El producto no existe." }); 
            } 
            const newProductInventory = new Inventory({ externalId, product, quantity, createdAt: new Date(), updatedAt: new Date() }); 

            const savedProductInventory = await newProductInventory.save(); 

            return res.status(201).json({ state: true, data:savedProductInventory }); 

        } catch (error) { 
            return res.status(500).send({ state: false, message: error.message }); 
        }
    },

    'ListProductsInventory': async (req,res) => {
        try {
            //const products = await Inventory.find().populate('product');
            const products = await Inventory.find();
            return res.status(200).json({ state: true, data: products }); 
        } catch (error) { 
            return res.status(500).json({ state: false, message: error.message }); 
        }

    },
    'updateProduct': async (req,res) => {
        const { id } = req.params; 
        const updates = req.body;
        
        try {

            const updatedProduct = await Inventory.findByIdAndUpdate(id, updates, {new: true }); 

            if (!updatedProduct) { 
                return res.status(404).json({ state: false, message: "Producto no encontrado." }); 
            } 

            return res.status(200).json({ state: true, data: updatedProduct }); 
        } catch (error) { 
            return res.status(500).json({ state: false, message: error.message }); 
        }
    },
    'findById': async (req,res) => {

    },
    'findByCategory': async (req,res) => {

    },
}