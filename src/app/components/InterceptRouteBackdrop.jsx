"use client"
import {useRouter} from "next/navigation"

function InterceptRouteBackdrop() {
  const router = useRouter()
    return (
    <div className=" w-full h-full" 
    onClick={() => {
        router.back() ;
    }}>
    </div>
  )
}

export default InterceptRouteBackdrop