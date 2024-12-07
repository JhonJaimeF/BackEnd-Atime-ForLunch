const Product = require("../models/product");
const Supplier = require("../models/supplier");

module.exports = {
    'createProduct' : async (req, res) => {
        const { id, name, description, price,category,supplier} = req.body;
        const existingProduct = await Product.findOne({id: id});
        try {
            if (existingProduct) { 
                return res.status(400).json({ state: false, message: "El producto ya existe." }); 
            }

            const newProduct = new Product({ id, name, description,price,category,supplier,createdAt: new Date(), updatedAt: new Date()}); 
         
            const savedProduct = await newProduct.save(newProduct);
            Supplier.product.push(newProduct);
            return res.status(201).json({ state: true, data: savedProduct }); 

            
        } catch (error) {
            return res.status(500).json({ state: false, message: error });

        }
    },
    'listProducts' : async (req, res) => {

        try { 
            const products = await Product.find().populate('supplier'); 
            return res.status(200).json({ state: true, data: products }); 
        } catch (error) { 
            return res.status(500).json({ state: false, message: error.message }); 
        }

    },
    'updateProduct': async (req, res) => {
        const { id } = req.params; const updates = req.body;
        try { 
            const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true }); 
            
            if (!updatedProduct) { 
            return res.status(404).json({ state: false, message: "Producto no encontrado." }); } 
            return res.status(200).json({ state: true, data: updatedProduct }); 
        } catch (error) { 
            return res.status(500).json({ state: false, message: error.message }); 
        }
    },
    'DeleteProduct': async (req, res) => {
        
        const { id } = req.params; 
        try { 

            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) { 
                return res.status(404).json({ state: false, message: "Producto no encontrado." }); 
            } // Desvincular producto del proveedor await Supplier.
            findByIdAndUpdate(deletedProduct.supplier, { $pull: { Product: deletedProduct._id } }); 
            return res.status(200).json({ state: true, message: "Producto eliminado." }); 
        } catch (error) { 
            return res.status(500).json({ state: false, message: error.message }); 
        }

    },
    'findById': async (req, res) => {

        const { id } = req.params; 
        try { 
            const product = await Product.findById(id).populate('supplier'); 
            if (!product) { 
                return res.status(404).json({ state: false, message: "Producto no encontrado." }); 
            } 
            return res.status(200).json({ state: true, data: product }); 
        } catch (error) { 
            return res.status(500).json({ state: false, message: errormessage }); 
        }

    },
    'findByCategory': async (req, res) => {
        const { category } = req.params; 
        try { 
            const products = await Product.find({ category }).populate('supplier'); 
            return res.status(200).json({ state: true, data: products });
        } catch (error) { 
        return res.status(500).json({ state: false, message: error.message }); 
        }
    },
}