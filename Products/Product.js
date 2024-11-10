
//import { json } from 'body-parser';
import crypto from 'crypto';


class Product{
    constructor(config,DB){
        this.warehouse_max_product = config.WAREHOUSE.MAX_PRODUCTS;
        this.encryption_method = config.ENCRYPTOR.ENCRYPTION_METHOD;
        this.DB = DB;
    }
    async Product_retriver(categorie){
        var product_json_data = {'category':categorie,
            'description':{ "$exists": true },
            'quantity': { "$exists": true, "$gt": 0 },
            'price':{ "$exists": true },
            'name':{ "$exists": true },
            'vendor':{ "$exists": true },
            'id':{ "$exists": true }};
        try{
            var data =  await this.DB.get_doc(product_json_data, 'items');
            return {'ans':true, 'data':data};
        }
        catch(error){
            console.log(error);
            return {'ans':false};
        }
    }

    async Product_encrtyptor(categorie,name,vendor){
        var hash = crypto.createHash(this.encryption_method);
        var data_to_generate = `${categorie}+${name}+${vendor}`;
        console.log(data_to_generate);
        hash.update(data_to_generate);
        var product_id = hash.digest('hex');
        console.log(`product hash ID is ready and it is: ${product_id}`);
        return product_id;
    }

    async Product_buy(product_id_list,user_hash){
        var reception_buy_sum = 0;
        var reception_item_list = [];
        var user_json_data = {'hash':user_hash};
        var full_name_retriver = await this.DB.get_doc(user_json_data,'users');
        console.log(full_name_retriver);
        var reception_full_name = `${full_name_retriver[0]['first_name']} ${full_name_retriver[0]['last_name']}`;
        for (let product_id of product_id_list) {
            var product_json_data = {'id':product_id};
            try{
                var data =  await this.DB.get_doc(product_json_data, 'items');
                if (!data){
                    return {'ans':false,'data':{'message':"not such product"}};
                }
                if (data[0]['quantity'] < 1){
                    return {'ans':false,'data':{'message':"no product left in the warhouse"}};
                }
                var filter =  {'id': product_id, 'quantity': { "$gt": 0 }}
                var updater = { $inc: { 'quantity': -1 }};
                var json_to_update = [filter,updater]
                await this.DB.update_doc(json_to_update,"items");
                reception_buy_sum += data[0]['price'];
                reception_item_list.push(`${data[0]['name']} : ${data[0]['price']}`);
        var reception = {'full_name':reception_full_name,'sum':reception_buy_sum, 'items':reception_item_list};
        var db_puarchse = {'user_hash':user_hash,'sum':reception_buy_sum, 'items':reception_item_list};
        await this.DB.add_doc(db_puarchse,'purchase')
        return {'ans':true, data: {'message':'payment succeded enjoy!','reception':reception}};
            }
            catch(error){
                console.log(error);
                return {'ans':false,'data':{'message':"error occurd "}};
            }
    }
}
    async Product_searcher(product_id){
        var product_json_data = {'category':{ "$exists": true },
            'description':{ "$exists": true },
            'quantity': { "$exists": true },
            'price':{ "$exists": true },
            'name':{ "$exists": true },
            'vendor':{ "$exists": true },
            'id':product_id};
        try{
            var data =  await this.DB.get_doc(product_json_data, 'items');
            return {'ans':true, 'data':data};
        }
        catch(error){
            console.log(error);
            return {'ans':false};
        }

    }

    async Product_warehouse_adder_exist(product_id,quantity_adder){
        try{
            var filter =  {'id': product_id}
            var updater = { $inc: { 'quantity': quantity_adder }};
            var json_to_update = [filter,updater]
            await this.DB.update_doc(json_to_update,"items");
            var data =  await this.DB.get_doc(product_json_data, 'items');
            return {'ans':true, 'data':data};
        }
        catch(error){
            console.log(error);
            return {'ans':false};
        }

    }

    async Product_warehouse_adder_non_exist(categorie,name,description,price,quantity,vendor,img_url,product_encryprot){
        var product_json_data = {'category':categorie,
            'description':description,
            'quantity': quantity,
            'price':price,
            'name':name,
            'vendor':vendor,
            'id':product_encryprot,
            'img_url':img_url,
            };
        try{
            await this.DB.add_doc(product_json_data,"items");
            
            var data =  {'data':await this.DB.get_doc(product_json_data, 'items'),'message':'added product to warehouse'};
            return {'ans':true, 'data':data};
        }
        catch(error){
            console.log(error);
            return {'ans':false};
        }

    }

    }



export default Product;