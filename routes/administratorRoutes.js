import express from 'express';
import { product_obj } from '../main.js';

const admin_router = express.Router();

/**
 * @swagger
 * /admin/warehouse/add:
 *   post:
 *     description: adding product to DB
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object 
 *           properties:
 *             user_hash:
 *               type: string
 *             product_id:
 *               type: string
 *     responses:
 *       200:
 *         description: A successful login with user object
 *         schema:
 *           type: object
 *           properties:
 *             tamir:
 *               type: string
 *               example: "tamiros!"
 */


admin_router.post('/admin/warehouse/add', async (req, res) => {
    var vendor = req.body.Vendor;
    var name = req.body.Name;
    var categorie = req.body.Category;
    var quantity = req.body.Quantity;
    var description = req.body.Description || '';
    var price =  req.body.Price || 1000;
    var img_url = req.body.Image || '';

    var product_encryprot = await product_obj.Product_encrtyptor(categorie,name,vendor);
    if (product_obj.Product_searcher(product_encryprot).length > 0 ){
        product_obj.Product_warehouse_adder_exist(product_encryprot,quantity);
    }
    else{
        product_obj.Product_warehouse_adder_non_exist(categorie,name,description,price,quantity,vendor,img_url,product_encryprot);
    }
    if (cart_adder['valid']){
        console.log(`new product added to cart ${user_hash} and his cart looks ${user_obj.users_online[user_hash].cart_products}`)
        return res.status(200).json({'message':cart_adder['data']});
    }
    else{
        console.log("here")
        return res.status(403).json({'message':cart_adder['message'] });
    }
});
