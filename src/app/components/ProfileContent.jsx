import {  Check, ChevronLeft, Cog, LucideMessagesSquare, UserCheck2Icon, UserPlus2 } from "lucide-react";

import Link from "next/link";
import ProfilePosts from "./ProfilePosts";
import { prisma } from "./db";
import FollwButton from "./FollowButton"
import { auth } from "../../auth";
import { redirect } from "next/navigation";

async function ProfileContent({profile}) {
    const session = await auth()
    const email = session?.user?.email ;

    const ownerProfile = email === profile.email ;
    
    let followState ;
    if(!ownerProfile ){     
        const {username} =  await prisma.profile.findFirst({
            where : {
                email : email , 
            }
        })

        followState = await prisma.follow.findFirst({
            where : {
                followBy : username , 
                followTo : profile.username , 
            }
    })
    }


  return (
    <main className="p-4 w-full max-w-[1300px]"> 
            <section className="flex justify-between items-center">
                { ownerProfile && 
                    <button>
                        <ChevronLeft/>
                    </button>
                }
                <div className="font-bold mx-auto flex items-center gap-2">
                    {profile.username}
                    <div className=" bg-slate-600 rounded-full size-5  text-white   inline-flex justify-center items-center">
                        <Check size={14}/>
                    </div>
                </div>
                {ownerProfile && 
                    <Link href={"/settings"}>
                        <Cog/>
                    </Link>    
                }    
            </section>
            
            <section className="mt-8     flex justify-center items-center">
                <div className=" size-[220px]    bg-gradient-to-tr from-violet-400 to-red-600    rounded-full flex justify-center items-center">  
                    <div className=" size-[210px] bg-white rounded-full     flex justify-center items-center">  
                        <div className=" size-[200px] rounded-full overflow-hidden object-cover">
                            <img className="object-cover size-[200px]"
                                src={profile?.avatar} >
                            </img>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" text-center mt-4">
                <h1 className=" font-bold text-xl">{profile.name}</h1>
                <p className=" text-gray-500 mb-3 mt-1 text-sm">
                    {profile.subtitle}<br/>
                    </p>
                <p className="text-gray-500 font-semibold">
                    {profile.bio} <br/> 
                </p>
                
                {
                   !ownerProfile && 
                <div className=" mx-auto my-2 px-3 w-fit flex gap-1 justify-center items-center  overflow-hidden  rounded-r-full rounded-l-full   bg-gradient-to-tr  from-violet-600 to-red-400">
                    <FollwButton username={profile.username} followingStatus={followState ? true : false} />
                    
                    <div className="bg-white py-6 w-[1px] h-full "></div>
                    
                    <Link href={'/message'}>
                        <button className=" min-w-32 my-2 flex items-center justify-center gap-1  rounded-r-full p-4 py-[2px] text-sm   font-medium text-white">
                            <LucideMessagesSquare />
                            Mesaage
                        </button>
                    </Link>
                </div>
                }

            </section>

            <section className=" flex justify-center ">
                <Link  className="m-2 font-bold" href={"/"}>POST</Link>
                <Link  className="m-2 font-bold text-gray-400" href={"/"} >HIGHTLIGHTS</Link>
            </section>

            <section className="mt-4">
                <ProfilePosts profile = {profile} />
            </section>
    </main>
        
  )
}

export default ProfileContent