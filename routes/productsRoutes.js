import express from 'express';
import { product_obj } from '../main.js';


const product_router = express.Router();

/**
 * @swagger
 * /product/retrive:
 *   post:
 *     summary: Retrive product from my shop
 *     description: Ozile retrive product
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: product
 *         in: body
 *         required: true
 *         description: product object that contains data on it.
 *         schema:
 *           type: object
 *           properties:
 *             categorie:
 *               type: string
 *               example: tv
 *               description: the product categorie
 *            
 *     responses:
 *       200:
 *         description: products retrivers successfully
 *         schema:
 *           $ref: '#/definitions/User'  # Reference to a User definition if available
 *       400:
 *         description: Invalid input, missing required fields
 *       500:
 *         description: Internal server error
 */

product_router.post('/product/retrive',async (req, res) => {
    console.log(req.body);
    var categorie = req.body.Category;
    //var quntity = req.body.Quntity;
    //var filter = req.body.Filter;
    //req.log('Initalizing user creator!');
    var product_retriver = await product_obj.Product_retriver(categorie=categorie);
    console.log("-----------------------");
    console.log(product_retriver);
    if (product_retriver['ans'] === true){
        console.log("Got it shimi")
        console.log("-----------------------");
        return res.status(200).json(product_retriver['data']);
        
    }
    else{
        return res.status(404).json({"message":"Tamir you"})
    }
})




/**
 * @swagger
 * /product/buy:
 *   post:
 *     summary: Buy product from my shop
 *     description: Ozile buy product
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: product_id
 *         in: body
 *         required: true
 *         description: product Id that contains data on it.
 *         schema:
 *           type: object
 *           properties:
 *             product_id:
 *               type: string
 *               example: hash_id
 *               description: the product id to buy it (created by categorie+name+vendor)
 *            
 *     responses:
 *       200:
 *         description: product bought successfully
 *         schema:
 *           $ref: '#/definitions/User'  # Reference to a User definition if available
 *       400:
 *         description: Invalid input, missing required fields
 *       500:
 *         description: Internal server error
 */

product_router.post('/product/buy',async (req, res) => {
    console.log(req.body);
    var user_hash = req.body.User_hash;
    var product_id_list = user_obj.users_online[user_hash].cart_products; 
    var product_buy = await product_obj.Product_buy(product_id_list=product_id_list,user_hash=user_hash);
    console.log("-----------------------");
    console.log(product_buy);
    if (product_buy['ans'] === true){
        console.log("Shimi bought the product")
        console.log("-----------------------");
        return res.status(200).json({'message':product_buy['data']['message'],'reception':product_buy['data']['reception']});
    }
    else{
        return res.status(404).json({'message':product_buy['data']['message']});
    }
})


export default product_router;