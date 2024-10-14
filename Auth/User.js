//require('dotenv').config();
import crypto from 'crypto';
import DB from '../DBconnect/DB.js'


class User{
    constructor(config){
        this.encryption_method = config.AUTHENTICATOR.ENCRYPTION_METHOD;
        this.hash = crypto.createHash(this.encryption_method);
        this.DB = new DB();
    }

    encrtyptor(username,password){
        const data_to_generate = `${username}+${password}`;
        this.hash.update(data_to_generate);
        const user_token = this.hash.digest('hex');
        console.log(`your TOKEN is ready and it is: ${user_token}`);
        return user_token;
    }

    User_creator(username,password,display_name,email,first_name,last_name,birthDate){
        user_token = this.encrtyptor(username,password);
        user_json_data = {'username':username,'hash':user_token,'display_name':display_name,'email':email,'first_name':first_name,
            'last_name':last_name,'birth_date':birthDate};
        DB.add_doc(item_json: user_json_data, collection_name: 'users')
    }

    User_check_if_exist(username){
        try{
            if (DB.get_user_doc(username) == null){
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

    User_check_auth(username,password){
        try{
            user_token = this.encrtyptor(username,password);
            DB.get_hash_from_user(username,'users')
            console.log("Success!")}
        catch(error){
            console.error('Failed to find user hash', error);
            throw error;

    }
    

}
}

export default User;
