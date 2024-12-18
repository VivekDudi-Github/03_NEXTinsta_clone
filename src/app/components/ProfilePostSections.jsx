'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

function ProfilePostSections({profile}) {
  const path = usePathname();
  
  const bookmarkPath = path.includes('bookmarks')
  const highlightsPath = path.includes('highlights')
  const mainPath = (!bookmarkPath && !highlightsPath) ;
  
  return (
        <section className=" flex justify-center ">
            <Link  className={`m-2 font-bold  ${mainPath ? '' : 'text-gray-400'} `}  href={"/profile/"}>POST</Link>
            <Link  className={`m-2 font-bold  ${highlightsPath ? '' : 'text-gray-400'} `} href={"/profile/highlights"} >HIGHTLIGHTS</Link>
            <Link  className={`m-2 font-bold  ${bookmarkPath ? '' : 'text-gray-400'} `} href={"/profile/bookmarks"} >BOOKMARKS</Link>
        </section>
  )
}

export default ProfilePostSections