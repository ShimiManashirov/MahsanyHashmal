import configuration from './config_reader.js';
//const Authenticator = require('./Auth/Authenticator');
import User from './Auth/User.js';


//console.log(configuration.config_user);
console.log("--- Starting of Backend ----")
console.log("Initilazing autenticator class");
export const user_obj = new User(configuration.config_user);