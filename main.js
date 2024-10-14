import configuration from './config_reader.js';
//const Authenticator = require('./Auth/Authenticator');
import User from './Auth/User.js';
import startServer from './index.js'
import { startServer } from './index.js';



console.log(configuration.config_user);
console.log("Initilazing autenticator class");
const user_obj = new User(configuration.config_user);
user_obj.encrtyptor("ozile","ozile_pass");