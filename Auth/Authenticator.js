require('dotenv').config();
const crypto = require('crypto');

class Authenticator{

    constructor(config){
        this.encryption_method = config.ENCRYPTION_METHOD
        this.hash = crypto.createHash(this.encryption_method);
    }


    encrtyptor(username,password){
        const data_to_generate = `${username}+${password}`;
        this.hash.update(data_to_generate);
        const token = this.hash.digest('hex');
        console.log(`your TOKEN is ready and it is: ${token}`);
    }
}

module.exports = Authenticator;


