import conf from "../conf/conf.js";
import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    // create account;
    async createAccount({email, password, name}){
        try {
            
              const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            return await this.login({ email, password });
        return userAccount;
        } catch (error) {
              throw error;
        }
    }

    //login method 

    async login({email,password}){
        try {
           return  await this.account.createEmailPasswordSession(
        email, 
    password
);
        } catch (error) {
            throw error;
        }

    }

    //get current user 
    async getCurrentUser(){
       try {
    const user = await this.account.get();
    
    return user;
} catch (err) {
    // Not logged in

    throw err;
}
    }

    // logout 
   async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}

const authservice =new AuthService();


export default authservice;