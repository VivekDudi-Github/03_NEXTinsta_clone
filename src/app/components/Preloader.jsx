"use client"

function Preloader() {
  return (

    <div className="h-screen relative">
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-[33%] z-50">
            <div className="flex flex-row gap-3">
                <div className="w-2 h-14 rounded-lg bg-red-500 animate-bounce"></div>
                <div
                    className="w-2 h-14 rounded-lg  bg-red-500 animate-bounce [animation-delay:-.2s]"
                ></div>
                <div
                    className="w-2 h-14 rounded-lg  bg-red-500 animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                    className="w-2 h-14 rounded-lg  bg-red-500 animate-bounce [animation-delay:-.4s]"
                ></div>
                <div
                    className="w-2 h-14 rounded-lg  bg-red-500 animate-bounce [animation-delay:-.5s]"
                ></div>  
            </div>
        </div>
    </div>
  )
}

export default Preloader