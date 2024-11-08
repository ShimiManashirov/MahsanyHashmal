//require('dotenv').config();
import crypto from 'crypto';
import DB from '../DBconnect/DB.js'
import { Collection } from 'mongodb';


class User{
    constructor(config){
        this.encryption_method = config.AUTHENTICATOR.ENCRYPTION_METHOD;
        this.DB = new DB();
    }

    encrtyptor(username,password){
        var hash = crypto.createHash(this.encryption_method);
        var data_to_generate = `${username}+${password}`;
        hash.update(data_to_generate);
        var user_token = hash.digest('hex');
        console.log(`your TOKEN is ready and it is: ${user_token}`);
        return user_token;
    }

    User_creator(username,password,email,first_name,last_name,birthDate){
        var user_token = this.encrtyptor(username,password);
        var user_json_data = {'username':username,'hash':user_token,'email':email,'first_name':first_name,
            'last_name':last_name,'birth_date':birthDate};
        console.log(user_json_data);
        try{
            this.DB.add_doc(user_json_data, 'users');
            return {'status_code':200,'message':'User creation succeded'};
        }
        catch(error){
            console.log(error);
            return {'status_code':404,'message':'User creation failed'};
        }
        
    }

    User_check_if_exist(username){
        try{
            if (this.DB.get_user_doc(username) == null){
                console.log('i will think about it user not found');
            }
            
        }
        catch(error){
            console.error('Failed to find user hash', error);
            throw error;
        }
    }

    User_update_data(username){

    }

    User_deletion(username){
        
    }

    async User_check_auth(username,password){
        try{
            let user_token = this.encrtyptor(username,password);
            if (user_token == await this.DB.get_hash_from_user(username,'users')){
                console.log(`logging succeded with username ${username}`);
                return true;
            }
            else{
                console.log(`logging failed with username ${username}`);
                return false;
            }}
        catch(error){
            console.error('Failed to find user hash', error);
            throw error;

    }
    

}
}

export default User;
