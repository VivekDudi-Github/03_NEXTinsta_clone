"use client"
import {SearchIcon} from "lucide-react"
import { useRouter } from "next/navigation"
function SearchForm() {
    const router = useRouter() ;
    return (
    <form className=' m-auto w-full max-w-sm h-10 border-2 focus-within:border-black flex items-center rounded-md overflow-hidden '
          action={(data) => {
            router.push('/search?query='+ data.get('query'))
            router.refresh() ;
        }}  
            >
            <div className=' p-2  bg-white z-20'>
                <SearchIcon/>
            </div>
            <input  placeholder='Search something..' 
                    className=' p-2 pl-0 w-full z-10'
                    name='query'
                    />
        </form>
  )
}

export default SearchForm