import { prisma } from "../../components/db"
import PostGrid from "../../components/PostGrid"
import { Suspense } from "react"

async function page() {
    const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      })

    return (
      <div className="w-full">
        <div className="p-4 w-full flex flex-col justify-center">
            <h1 className="text-5xl font-bold">
                Browse
            </h1>
            <p className="text-gray-500  text-sm ">
                Check trending posts and find inspiration
            </p>
        </div>
        <div className=" w-full px-4">
            <Suspense fallback={"loading.."}>
              <PostGrid post={posts} />
            </Suspense>
        </div>
    </div>
  )
}

export default page