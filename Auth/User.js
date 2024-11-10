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

    async User_creator(username,password,email,first_name,last_name,birthDate,role){
        var user_token = this.encrtyptor(username,password);
        var user_json_data = {'username':username,'hash':user_token,'email':email,'first_name':first_name,
            'last_name':last_name,'birth_date':birthDate,'role':role};
        console.log(user_json_data);
        try{
            await this.DB.add_doc(user_json_data, 'users');
            return {'status_code':200,'message':'User creation succeded'};
        }
        catch(error){
            console.log(error);
            return {'status_code':404,'message':'User creation failed'};
        }
        
    }

    async User_view(user_hash){
        try{
            var filter =  {'hash': user_hash};
            var updater = {};
            var json_to_update = [filter,updater]
            var user_details = await this.DB.get_doc_filter(json_to_update, 'users');
            if (user_details.length > 0 ){
                console.log(`retrive the data for user: ${user_details[0]['username']}`);
                return ({'valid':true, 'data':{'user_data':user_details[0],'message':'succesful retrival for user info'}});
            }
            return ({'valid':false, 'data':{'message':'failed to retrieve the user info'}});
        }
        catch(error){
            console.error('Failed to find user hash', error);
            return ({'valid':false, 'data':{'message':'some error occurd!'}});
            throw error;
        }
    }

    async User_update_data(user_hash,email,first_name,last_name,birthDate,role){
        try{
            var filter =  {'hash': user_hash};
            var updater = {
                $set: {
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'birth_date': birthDate,
                    'role': role
                }
            };
            
            var json_to_update = [filter,updater];
            var user_doc = await this.DB.update_doc(json_to_update,'users');
            return {'valid': true, 'message':user_doc};
        }
        catch(error){
            return {'valid': false, 'message':'failed to update DB'};
        }
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
