import {  Check, ChevronLeft, Cog } from "lucide-react";
import Link from "next/link";
import PostGrid from "../../components/PostGrid";

export default function() {
    return (
        <main>
            <section className="flex justify-between items-center">
                <button>
                    <ChevronLeft/>
                </button>
                <div className="font-bold flex items-center gap-2">
                    MY Name
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
                        <div className=" size-[200px] rounded-full overflow-hidden ">
                            <img className=""
                                src="data:image/jpeg;base64,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" >
                            </img>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" text-center mt-4">
                <h1 className=" font-bold text-xl">Name</h1>
                <p className=" text-gray-500 mb-3 mt-1 text-sm">Business Account</p>
                <p className="">
                    Anime . Dictator . India <br/>
                    Contact - name@name.com 
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