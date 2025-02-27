const express = require('express')
const productController = require("../controllers/productController")


const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products',productController.getProductByFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('content-Type','image/jpg');
    res.send(Path2D.join(__dirname,'..','uploads',imageName));
});
router.delete('/:productId',productController.deleteProductById);

module.exports = router;