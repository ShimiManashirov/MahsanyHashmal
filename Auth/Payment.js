


class Payment{
    constructor(config,DB){
        this.card_type = config.CARD_TYPE;
        this.DB = DB;
    }

    async payement_add(card_number,name_on_card,cvv,expiration,user_hash){
        var user_json_data = {'user_hash':user_hash,'card_number':card_number,'card_owner':name_on_card,'cvv':cvv,
            'expiration':expiration,'type':card_type};
        try{
            this.DB.add_doc(user_json_data, 'payment');
            return {'vaild': true , 'message':'Payment creation succeded'};
        }
        catch(error){
            console.log(error);
            return {'vaild': false ,'message':'Payment creation failed'};
        }
    }

    async payement_remove(user_hash){
        var filter =  {'user_hash': user_hash};
        var updater = {};
        var json_to_update = [filter,updater]
        try{
            this.DB.remove_doc(json_to_update, 'payment');
            return {'vaild': true, 'message':'Payment deletion succeded'};
        }
        catch(error){
            console.log(error);
            return {'vaild': false,'message':'Payment deletion failed'};
        }
    }
    async payement_checker(user_hash){
        var filter =  {'user_hash': user_hash};
        var updater = {};
        var json_to_update = [filter,updater]
        try{
            if (this.DB.get_doc(json_to_update, 'payment').length > 0){;
                return {'vaild': true,'message':'Payment check succeded'};
        }
        return {'vaild': false,'message':'Payment check failed'};
            }
        catch(error){
            console.log(error);
            return {'vaild': false,'message':'Payment check failed'};
        }
    }
}

export default Payment;
