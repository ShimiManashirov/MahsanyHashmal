import express from 'express';
import { product_obj } from '../main.js';
import { user_obj } from '../main.js';


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
 *             Name:
 *               type: string
 *             Vendor:
 *               type: string
 *             Category:
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
    try{
        console.log(req.body);
        var user_hash = req.body.User_hash;
        console.log(user_obj.users_online[user_hash].cart_products);
        var product_id_list = user_obj.users_online[user_hash].cart_products; 
        var product_buy = await product_obj.Product_buy(product_id_list=product_id_list,user_hash=user_hash);
        console.log("-----------------------");
        if (product_buy['ans'] === true){
            console.log("Shimi bought the product")
            console.log("-----------------------");
            delete user_obj.users_online.user_hash;
            return res.status(200).json({
                'message': product_buy['data']['message'],
                'reception': product_buy['data']['reception']
            });
        
        }
        else{
            return res.status(404).json({'message':product_buy['data']['message']});
        }
    }
    catch(error){
        return res.status(500).json({'message':'error occured check auth'});

    }
})

/**
 * @swagger
 * /product/add:
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

product_router.post('/product/add',async (req, res) => {
    var categorie = req.body.Category;
    var name = req.body.Name;
    var vendor = req.body.Vendor;
    var quantity = req.body.Quantity;
    var description = req.body.Description;
    var price = req.body.Price;
    var img_url = req.body.Img_url;
    try{
        console.log(req.body);
        var product_id = await product_obj.Product_encrtyptor(categorie,name,vendor);
        console.log(product_id);
        var product_check_existing = await product_obj.Product_searcher(product_id);

        if (product_check_existing['data'].length > 0){
            console.log("-----------------------");
            console.log("The product exist")
            var product_adder_exist = await product_obj.Product_warehouse_adder_exist(product_id, quantity)
            console.log(product_adder_exist);
            if (product_adder_exist['valid']){
                console.log("-----------------------");
                return res.status(200).json({
                    'message': product_adder_exist['data']['message'],
                    'data': product_adder_exist['data']['product']
                
                });
            }
            return res.status(500).json({
                'message': product_adder_exist['data']['message']
            
            });
        }
        else{
            console.log("-----------------------");
            var  product_adder_non_exist = await product_obj.Product_warehouse_adder_non_exist(categorie,name,description,price,quantity,vendor,img_url,product_id)
            console.log("The product created");
                if (product_adder_non_exist['valid']){
                    console.log(product_adder_non_exist);
                    console.log("-----------------------");
                    return res.status(200).json({
                        'message': product_adder_non_exist['data']['message'],
                        'data': product_adder_non_exist['data']['product'][0]
                    
                    });
        
                }
        return res.status(500).json({
            'message': product_adder_non_exist['data']['message']
    });
}
    }
       
    
    catch(error){
        console.log(error);
        return res.status(500).json({'message':'error occured while adding product'});

    }
});


/**
 * @swagger
 * /product/remove:
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

product_router.post('/product/remove',async (req, res) => {
    var categorie = req.body.Category;
    var name = req.body.Name;
    var vendor = req.body.Vendor;
    var quantity = req.body.Quantity;
    var description = req.body.Description;
    var price = req.body.Price;
    var img_url = req.body.Img_url;
    try{
        console.log(req.body);
        var product_id = await product_obj.Product_encrtyptor(categorie,name,vendor);
        console.log(product_id);
        var product_check_existing = await product_obj.Product_searcher(product_id);
        console.log(product_check_existing);
        if (product_check_existing['data'].length > 0){
            console.log("-----------------------");
            console.log("The product exist and start removing it");
            var product_reomver = await product_obj.Product_remover(product_id);
            if (product_reomver['valid']){
                console.log("-----------------------");
                return res.status(200).json({
                    'message': product_reomver['message']
                    
                });
            }
            return res.status(500).json({
                 'message': product_reomver['message']
            });
        }
        return res.status(500).json({
                 'message': 'product does not exist'         
               

            });
        }
    
    catch(error){
                console.log(error);
                return res.status(500).json({'message':'error occured while adding product'});
        
            }
        });


export default product_router;