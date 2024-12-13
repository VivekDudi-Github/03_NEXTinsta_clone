"use server"
import { prisma } from "./db";
import {signOut, auth } from "../../auth";
import { use } from "react";


export const sessionFunc = async() => {
    const session = await auth() ; 

    const profile = await prisma.profile.findFirstOrThrow({
        where : { 
            email : session?.user?.email ,
        } 
    })

    return { session , profile }
}

export const UpdateProfileFunction = async (FormData ,  newAvatarUrl  , oldurl , email ) => {
    console.log(newAvatarUrl , oldurl );
    
    const avatarURL = typeof newAvatarUrl === "string" ? newAvatarUrl : oldurl
    
    await prisma.profile.upsert({
        where : { 
            email : email ,
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
            email : email , 
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

export const PostComment = async (Data , id) => {
    const { profile} = await sessionFunc() ;
    console.log(id);
    
    if(Data.get('comment')){
        
        await prisma.comment.create({
            data : {
                postId : `${id}` ,
                username : profile.username , 
                text : Data.get("comment")
            }
        })
        return ; 
    }
}

export const TogglePostLikes = async ( postId ) => {
    const {profile} = await sessionFunc() ; 

    const FindLikeStatus = await prisma.like.findFirst({
        where : {
            postId : postId, 
            username : profile.username , 
        }
    })

    if (FindLikeStatus) {
        await prisma.like.delete({
            where : {
                id : FindLikeStatus.id
            }
        })
    }else
    {
        await prisma.like.create({
            data : {
                postId : postId , 
                liked : true ,
                username : profile.username 
            }
        })
    }    
}

export const LogOut = async() => {
    await signOut('google')
    return ;
}

export const FollowFunc = async(username) => {
    const {profile} = await sessionFunc() ;

    const FollwingStatus = await prisma.follow.findFirst({
        where : {
            followBy : profile.username ,
            followTo : username 
        }
    })

    if(FollwingStatus){
        await prisma.follow.delete({
            where : {
                id : FollwingStatus.id
            }
        })
    }else {
        await prisma.follow.create({
            data : {
                followBy : profile.username , 
                followTo : username , 
            }
        })
    }


}