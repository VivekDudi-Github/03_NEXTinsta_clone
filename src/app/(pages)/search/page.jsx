import { Suspense } from "react"
import SearchForm from "../../components/SearchForm"
import SearchResults from "../../components/SearchResults"
import Preloader from "../../components/Preloader"

async function page({ searchParams }) {
   const Params = await searchParams ;

    return (
    <div className=' w-full min-h-screen h-full p-4 relative  '>
        <SearchForm />
        <Suspense fallback={<Preloader/> }>
            <SearchResults query={Params.query} />
        </Suspense>
    </div>
  )
}

export default page