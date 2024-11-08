import configuration from './config_reader.js';
//const Authenticator = require('./Auth/Authenticator');
import User from './Auth/User.js';
import Product from './Products/Product.js'
import DB from './DBconnect/DB.js'

//console.log(configuration.config_user);
console.log("--- Starting of Backend ----")
console.log("Initilazing DB class");
export const DB_obj = new DB();
console.log("Initilazing autenticator class");
export const user_obj = new User(configuration.config_user);
console.log("Initilazing product class");
export const product_obj = new Product(configuration.config_product,DB_obj);