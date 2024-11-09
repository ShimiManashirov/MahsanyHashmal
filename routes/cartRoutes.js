import express from 'express';
import { product_obj, user_obj } from '../main.js';

const cart_router = express.Router();


/**
 * @swagger
 * /cart/add:
 *   post:
 *     description: adding to cart product
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


cart_router.post('/cart/add', async (req, res) => {
    var user_hash = req.body.User_hash;
    var product_id = req.body.Product_id;
    var product_quantity = req.body.Product_quantity;


    try{
        var added_to_cart_product = 0;
        for (let i = 0; i < product_quantity; i++){
            var cart_adder = await user_obj.users_online[user_hash].Cart_add_product(product_id);
            console.log(cart_adder);
            if (cart_adder['valid']){
                console.log(`new product added to cart ${user_hash} and his cart looks ${user_obj.users_online[user_hash].cart_products.length}`);
                added_to_cart_product = i;
                console.log(added_to_cart_product);
            }else{
                for (let j = 1; j <= added_to_cart_product; j++){
                    console.log(`remove product from cart ${user_hash} and his cart looks ${user_obj.users_online[user_hash].cart_products.length}`);
                    await user_obj.users_online[user_hash].Cart_delete_product(product_id);
                }
            var product_quantity = await product_obj.Product_searcher(product_id);
            return res.status(403).json({'message':` The avialable proudct you choose is ${product_quantity['data'][0]['available_quantity']}`});
        }
    }
        return res.status(200).json({'message':cart_adder['data']});
        
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({'message':'bro this shit is not working!!'})
    }
});


/**
 * @swagger
 * /cart/remove:
 *   post:
 *     description: adding to cart product
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


cart_router.post('/cart/remove', async (req, res) => {
    var user_hash = req.body.User_hash;
    var product_id = req.body.Product_id;
    var product_quantity = req.body.Product_quantity;
    for (let i = 0; i < product_quantity; i++){
        var cart_remover = await user_obj.users_online[user_hash].Cart_delete_product(product_id);
        console.log(cart_remover);
        if (cart_remover['valid']){
            console.log(` product removed from cart of ${user_hash} and his cart looks ${user_obj.users_online[user_hash].cart_products}`)
        }
        else{
            return res.status(403).json({'message':cart_remover['message'] });
        }
    }   
    return res.status(200).json({'message':cart_remover['data']});
    }
    
);


export default cart_router;