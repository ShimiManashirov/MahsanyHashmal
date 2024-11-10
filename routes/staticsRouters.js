import express from 'express';
import { product_obj } from '../main.js';

const static_router = express.Router();

/**
 * @swagger
 * /statics/retrive:
 *   post:
 *     summary: Retrive statics from my shop
 *     description: Ozile retrive statics
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

static_router.post('/statics/retrive',async (req, res) => {
    console.log(req.body);
    console.log("-----------------------");

    var filter = 
        {
            $group: {
              _id: "$vendor", 
              count: { $sum: "$quantity" } 
            }
          };

    var updater = {
        $sort: { count: -1 } 
      };
    var json_to_aggr = [filter,updater]; 
    var data = await product_obj.DB.aggregate_data(json_to_aggr,"items")
    return res.status(200).json({
        'data': data
    });
});

// } catch (err) {
//     console.error('Error fetching data:', err);
//     return [];
// }
// }
//         return res.status(200).json(product_retriver['data']);
        
//     }
//     else{
//         return res.status(404).json({"message":"Tamir you"})
//     }
// })

export default static_router;