import conf from "../conf/conf.js";
import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
    }

    // create account;
    async createAccount({email, password, name}){
        try {
            
            const userAccount = await account.create(
                    ID.unique(), 
                    email,
                    password,
                        name
                );
            if(userAccount){
                return this.login({email, password});
            }else{
                return  userAccount;
            }     
        } catch (error) {
              throw error;
        }
    }

    //login method 

    async login(){
        try {
           return  await account.createEmailPasswordSession(
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
    const user = await account.get();
    // Logged in
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