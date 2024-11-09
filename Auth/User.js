//require('dotenv').config();
import crypto from 'crypto';


class User{
    constructor(config,DB){
        this.encryption_method = config.AUTHENTICATOR.ENCRYPTION_METHOD;
        this.DB = DB;
        this.users_online = {};
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

    async User_update_data(user_hash,email,first_name,last_name,birthDate){
        var filter =  {'user_hash': user_hash};
        var updater = { $set: {name: "New Name"}, $set: {'email':email}, $set: {'first_name':first_name},
                 $set: {'last_name':last_name}, $set: {'birth_date':birthDate}};
       
        var json_to_update = [filter,updater]
        var user_doc = await this.DB.update_doc(json_to_update,'users');
    }

    User_deletion(username){
        
    }

    async User_check_auth(username,password){
        try{
            let user_token = this.encrtyptor(username,password);
            if (user_token == await this.DB.get_hash_from_user(username,'users')){
                var json_data_user = {'hash':user_token}
                var user_doc = await this.DB.get_doc(json_data_user,'users');
                console.log(`logging succeded with username ${username}`);
                console.log(user_doc);
                return {valid:true,hash:user_token,role:user_doc[0]['role']};
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
