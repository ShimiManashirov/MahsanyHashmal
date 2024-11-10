import { payment_obj } from '../main.js';

/**
 * @swagger
 * /payment/add:
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
 *             Card_number:
 *               type: string
 *             Name_on_card:
 *               type: string
 *             Cvv:
 *               type: string
 *             Expiration:
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


cart_router.post('/payment/add', async (req, res) => {
    var card_number = req.body.Card_number;
    var name_on_card = req.body.Name_on_card;
    var cvv = req.body.Cvv;
    var expiration = req.body.Expiration;
    var user_hash = req.body.User_hash;
    var payment_adding = await payment_obj.payement_add(card_number,name_on_card,cvv,expiration,user_hash);
    if (payment_adding['valid']){
        return res.status(200).json({'message':payment_adding['message']});
    }
    return res.status(500).json({'message':payment_adding['message']});
    }
    
);


/**
 * @swagger
 * /payment/remove:
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
 *             User_hash:
 *               type: string
 *             
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


cart_router.delete('/payment/delete', async (req, res) => {
    var user_hash = req.body.User_hash;
    var payment_deleting = payment_obj.payement_remove(user_hash);
    if (payment_deleting['valid']){
        return res.status(200).json({'message':payment_deleting['message']});
    }
    return res.status(500).json({'message':payment_deleting['message']});
    }
    
);

/**
 * @swagger
 * /payment/remove:
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
 *             User_hash:
 *               type: string
 *             
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


cart_router.post('/payment/checker', async (req, res) => {
    var user_hash = req.body.User_hash;
    var payment_checker = await payment_obj.payement_checker(user_hash);
    if (payment_checker['valid'] === true & payment_checker['data']['ans'] === true){
        return res.status(200).json({'ans':payment_checker['data']['ans'],'payment_info':payment_checker['data']['payment_info'],'message':payment_checker['data']['message']});
    }
    if (payment_checker['valid'] === true & payment_checker['data']['ans'] === false){
        return res.status(200).json({'ans':payment_checker['data']['ans'],'message':payment_checker['data']['message']});
    }
    return res.status(500).json({'message':payment_checker['message']});
    }
    
);