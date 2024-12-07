const routes = require('express').Router();

const {
    createProduct,
    listProducts,
    DeleteProduct,
    updateProduct,
    findById
    
}= require('../controllers/controlller-product')

routes.post("/:id", createProduct);

routes.put("/:id", updateProduct);

routes.delete("/:id", DeleteProduct);

routes.get("/", listProducts);

routes.get("/:id", findById );

module.exports = routes;