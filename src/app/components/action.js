"use server"
import { prisma } from "./db";


export const UpdateProfileFunction = async (FormData ,  newAvatarUrl  , oldurl , session ) => {
    console.log(newAvatarUrl , oldurl );
    
    
    const avatarURL = newAvatarUrl ? newAvatarUrl : oldurl ;
    
    

    const result = await prisma.profile.upsert({
        where : { 
            email : session?.user?.email ,
        }
        ,
        update : {
            username : FormData.get("username") , 
            name :  FormData.get("name") ,
            subtitle :  FormData.get("subtitle") , 
            bio :  FormData.get("bio") , 
            avatar : avatarURL
        } , 
        create : {
            email : session?.user?.email , 
            username :  FormData.get("username") ,
            name :  FormData.get("name") ,
            subtitle :  FormData.get("subtitle") , 
            bio :  FormData.get("bio") , 
            avatar : avatarURL 
        }
    } 
) 
}