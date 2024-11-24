const images = [
  // "https://picsum.photos/id/1/1024/720" ,
//   "https://picsum.photos/id/2/720/1024" ,
//   "https://picsum.photos/id/3/300/820" ,
//   null ,
//   "https://picsum.photos/id/4/720/1024" ,
//   "https://picsum.photos/id/5/1024/720" ,
//   "https://picsum.photos/id/6/720/1024" , 
  
//   "https://picsum.photos/id/1/1024/720" ,
//   "https://picsum.photos/id/2/720/1024" ,
//   "https://picsum.photos/id/3/1024/720" ,
//   "https://picsum.photos/id/4/720/1024" ,
//   "https://picsum.photos/id/5/1024/720" ,
//   "https://picsum.photos/id/6/720/1024" , 
  
//   "https://picsum.photos/id/1/1024/720" ,
//   "https://picsum.photos/id/2/720/1024" ,
//   "https://picsum.photos/id/3/1024/720" ,
//   "https://picsum.photos/id/4/720/1024" ,
//   "https://picsum.photos/id/5/1024/720" ,
//   "https://picsum.photos/id/6/720/1024" , 
]

function PostGrid() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="columns-1 sm:columns-3 md:columns-4 lg:columns-4 gap-4 ">
          {images.map((url, index) => {
            if ( !url ){
              return ;
            }
            return <div
              key={index}
              className="break-inside-avoid mb-4 overflow-hidden "
            >
              <img
                src={url}
                alt={`${index}`}
                className="w-full h-auto object-cover rounded-sm"
              />
            </div>

          }
        )}
        </div>
      </div> 

    </>
  )
}



export default PostGrid
 
