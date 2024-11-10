

class Cart{
    constructor(config,user_hash,DB){
        this.encryption_method = config.ENCRYPTOR.ENCRYPTION_METHOD;
        this.cart_products = [];
        this.user_hash = user_hash;
        this.DB = DB;
    }
    async Cart_add_product(product_id){
        console.log(`adding the product ${product_id} to user ${this.user_hash}`);
        var product_json_data = {'id':product_id};
         try{
            var data =  await this.DB.get_doc(product_json_data, 'items');
            if (!data){
                return {'valid':false,'data':[{'message':"not such product"}]};
            }
            if (data[0]['available_quantity'] < 1){
                return {'valid':false,'data':[{'message':"no product available in the warehouse"}]};
            }
            var filter =  {'id': product_id, 'available_quantity': { "$gt": 0 }}
            var updater = { $inc: { 'available_quantity': -1 }};
            var json_to_update = [filter,updater]
            await this.DB.update_doc(json_to_update,"items");
            this.cart_products.push(product_id);
            return {'valid':true, 'data':data };
        }
        catch(error){
            console.log(error);
            return {'valid':false};
        }
    }

    async Cart_delete_product(product_id){
        console.log(`removing the product ${product_id} to user ${this.user_hash}`);
        var product_json_data = {'id':product_id};
         try{
            var data =  await this.DB.get_doc(product_json_data, 'items');
            if (!data){
                return {'valid':false,'data':[{'message':"not such product"}]};
            }
            var filter =  {'id': product_id, 'available_quantity': { "$gt": -1 }}
            var updater = { $inc: { 'available_quantity': 1 }};
            var json_to_update = [filter,updater]
            await this.DB.update_doc(json_to_update,"items");
            this.cart_products.pop(product_id);
            return {'valid':true, 'data':{'message':'Removed product from cart'}};
        }
        catch(error){
            console.log(error);
            return {'valid':false};
        }
    }
}

export default Cart;