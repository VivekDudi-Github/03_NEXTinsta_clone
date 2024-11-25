"use server"
import { prisma } from "./db";
import { auth } from "../../auth";


const sessionFunc = async() => {
    const session = await auth() ; 

    const profile = await prisma.profile.findFirstOrThrow({
        where : { 
            email : session?.user?.email ,
        } 
    })

    return { session , profile }
}

export const UpdateProfileFunction = async (FormData ,  newAvatarUrl  , oldurl , session ) => {
    console.log(newAvatarUrl , oldurl );
    
    const avatarURL = typeof newAvatarUrl === "string" ? newAvatarUrl : oldurl
    
    await prisma.profile.upsert({
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

export const PostEntry = async (FormData ,imageurl , ) => {
    const {profile } = await sessionFunc() ;


    try {
        const PostDoc = await prisma.post.create({
            data : {
                creator : profile?.username , 
                image : imageurl ,
                description : FormData.get("description") ,  
            }
        })
        return PostDoc.id ;
    } catch (error) {
        console.log(error)
        return ;
    }
}