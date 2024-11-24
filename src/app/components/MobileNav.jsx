import { Camera, HomeIcon, Rocket, Search, User } from "lucide-react";
import Link from "next/link";

function MobileNav() {
  return (
    <div className=" md:hidden fixed bg-[#fffdfd4f] p-4 bottom-0 left-0 right-0 flex justify-center">
    <div className=" flex justify-around  text-gray-600
                    max-w-xl w-full"
      >
      <Link className="p-3 shadow-md  shadow-gray-300 hover:scale-105 duration-200 rounded-xl bg-white border- border-gray-" href={'/'} >
        <HomeIcon />
      </Link>
      <Link className="p-3 shadow-md  shadow-gray-300 hover:scale-105 duration-200 rounded-xl bg-white" href={'/search'} >
        <Search />
      </Link>
      
      <Link 
        className="  p-3 shadow-md shadow-gray-300 scale-[120%]  hover:scale-125 duration-200 rounded-full bg-gradient-to-tr from-purple-300 via-slate-800 to-black text-white" 
        href={'/create'} 
        >
        <Camera />
      </Link>  

      <Link className="p-3 shadow-md  shadow-gray-300  hover:scale-105 duration-200 rounded-xl bg-white" href={'/browse'} >
        <Rocket />
      </Link>
      <Link className="p-3 shadow-md  shadow-gray-300  hover:scale-105 duration-200 rounded-xl bg-white text-purple-500" href={'/profile'}>
        <User />
      </Link>
    </div>
  </div>
  )
}

export default MobileNav