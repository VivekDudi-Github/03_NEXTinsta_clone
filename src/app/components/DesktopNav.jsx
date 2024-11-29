import { Camera, Home, Rocket, Search, User } from "lucide-react";
import Link from "next/link"

const NavLinksArray = [
    { Icon : Home , 
      text : "Home" , 
      link : "/"
    } , 
    { Icon : Search , 
      text : "Search" , 
      link : "/search"
    } , 
    { Icon : Rocket , 
      text : "Explore" , 
      link : "/browse"
    } , 
    { Icon : User , 
      text : "Profile" , 
      link : "/profile"
    } , 
    { Icon : Camera , 
      text : "Create" , 
      link : "/create"
    }
  ]
function DesktopNav() {
  return ( 
    <div className="  flex-col  flex mt-4 text-white sticky
                              *:bg-white *:mt-2 *:rounded-3xl *:border-[3px] *:duration-100 *:gap-3  *:bg-gradient-to-tr to-black via-slate-700 from-slate-300
              ">
              {
                NavLinksArray.map((item , i) => {
                  const {text , link , Icon} = item ;
                  return (
                    <div className="bg-white p-[3px] hover:border-2  group transition-all" key={i}>
                      <Link className=" flex gap-2 bg-white rounded-2xl text-black px-2 py-1 transition-all duration-300 group-hover:bg-transparent group-hover:text-white  " href={link}>
                        <Icon />
                        {text}
                      </Link>
                    </div>
                  )
                } )
              }
            </div>
  )
}

export default DesktopNav