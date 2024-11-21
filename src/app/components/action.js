"use server"
import { prisma } from "./db";


export const UpdateFunction = async (FormData , session ) => {
    console.log(session , "action.js");
    
    const result = await prisma.profile.upsert({
        where : { 
            email : session?.user?.email ,
        }
        ,
        update : {
            username : FormData.get("username") , 
            name :  FormData.get("name") ,
            subtitle :  FormData.get("subtitle") , 
            bio :  FormData.get("bio")
        } , 
        create : {
            email : session?.user?.email , 
            username :  FormData.get("username") ,
            name :  FormData.get("name") ,
            subtitle :  FormData.get("subtitle") , 
            bio :  FormData.get("bio")
        }
    } 
) 
}