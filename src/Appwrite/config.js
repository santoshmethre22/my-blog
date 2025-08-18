import conf from "../conf/conf.js";
import { Client,Databases,ID,Query,Storage } from "appwrite";

export class Service {

    client=new Client();
    database;
    bucket;

    constructor(){
        this.client=new Client()
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    // createPost
    async creatPost({title, slug, content, featuredImage, status, userId}){

   try {
     const promise = this.database.createDocument(
     conf.appwriteDatabaseId,
     conf.appwriteCollectionId,
     slug,
      {
                     title,
                     content,
                     featuredImage,
                     status,
                     userId,
                 }
 );
   } catch (error) {
     console.log("Appwrite serive :: createPost :: error", error);
     throw error;
   }

    }
    // updatePost

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            const result = await this.database.updateDocument(
    conf.appwriteDatabaseId, // databaseId
    conf.appwriteCollectionId, // collectionId
    slug, // documentId
   {
                    title,
                    content,
                    featuredImage,
                    status,

                }, // data (optional)
    
);
        } catch (error) {
              console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    
    // deletePost
async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    // getPost
     async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    // getPosts
    async getPost(quries=[Query.equal("status","active")]){
        try {
            const promise =await this.database.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteCollectionId,
    
);
    return promise;
            
        } catch (error) {
             console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }

    }

    // uploadFile
      async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    // deleteFile
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    // getFilePreview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service =new Service();
export default service;