import { Suspense } from "react"
import SearchForm from "../../components/SearchForm"
import SearchResults from "../../components/SearchResults"

async function page({ searchParams }) {
   const Params = await searchParams ;

    return (
    <div className=' w-full h-full p-4  '>
        <SearchForm />
        <Suspense fallback='loading...'>
            <SearchResults query={Params.query} />
        </Suspense>
    </div>
  )
}

export default page