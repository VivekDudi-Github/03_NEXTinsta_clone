import Link from "next/link";

function PostGrid( {post} ) {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="columns-1 sm:columns-3 md:columns-4 lg:columns-4 gap-4 ">
          {post.map((post, index) => {
            if ( !post ){
              return ;
            }
            return <div
              key={index}
              className="break-inside-avoid mb-4 overflow-hidden "
            >
              <Link href={`/posts/${post.id}`}>
                <img
                  src={post.image}
                  alt={`${index}`}
                  className="w-full h-auto object-cover rounded-sm"
                />
              </Link>
            </div>

          }
        )}
        </div>
      </div> 

    </>
  )
}



export default PostGrid
 
