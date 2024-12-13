import { prisma } from "./db"
import {sessionFunc} from "./action"
import { Plus } from "lucide-react";

async function HomeTopRow({profiles}) {
    
  return (
    <div className="flex flex-row justify-start pt-2 p-4 gap-3 w-full">

      <div className=" flex flex-col justify-center ">
        <div className=" size-28 rounded-full bg-gradient-to-tr from-violet-600  to-red-400 p-1">
            <div className="border-4 border-white w-full h-full rounded-full flex flex-col items-center justify-center text-white ">
              <Plus size={40} strokeWidth={2} />
            </div>
        </div>
       <p className="text-xs text-black text-center">Add your story...</p>
      </div>

      {profiles.map((p , i) => {
        return (
          <div className="flex flex-col justify-center" key={i}>
            <div className=" size-28 overflow-hidden rounded-full bg-gradient-to-tr from-violet-600  to-red-400 p-1">
              <img className=" border-4 border-white w-full h-full object-cover  rounded-full" src={p.avatar}/>
            </div>
            <p className="text-xs text-gray-500 text-center">{p.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default HomeTopRow