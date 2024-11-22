import {  Check, ChevronLeft, Cog } from "lucide-react";
import Link from "next/link";
import PostGrid from "../../components/PostGrid";
import { prisma } from "../../components/db";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function() {
    const session = await auth()
    const email = session?.user?.email ;

    if(!email){
        redirect("/")
    }

    const profile = await prisma.profile.findFirst({
        where : {
            email : email
        }
    })
    
    if(!profile){
        redirect("/settings")
    }
    
    
    return (
        <main>
            <section className="flex justify-between items-center">
                <button>
                    <ChevronLeft/>
                </button>
                <div className="font-bold flex items-center gap-2">
                    {profile.username}
                    <div className=" bg-red-500 rounded-full size-5  text-white   inline-flex justify-center items-center">
                        <Check size={14}/>
                    </div>
                </div>
                <Link href={"/settings"}>
                    <Cog/>
                </Link>        
            </section>
            
            <section className="mt-8     flex justify-center items-center">
                <div className=" size-[220px]    bg-gradient-to-tr from-orange-200 to-red-500    rounded-full flex justify-center items-center">  
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
                    {/* {profile.email} */}
                    </p>
                <p className="text-gray-500 font-semibold">
                    {profile.bio} <br/>
                     
                </p>
            </section>

            <section className=" flex justify-center pt-4">
                <Link  className="m-2 font-bold" href={"/"}>POST</Link>
                <Link  className="m-2 font-bold text-gray-400" href={"/"} >HIGHTLIGHTS</Link>
            </section>

            <section className="mt-4">
                <PostGrid />
            </section>
        </main>
        
    )
}