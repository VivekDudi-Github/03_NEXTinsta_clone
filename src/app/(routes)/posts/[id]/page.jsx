
import { prisma } from "../../../components/db"


const SinglePost = async ({params}) => {
    const id = await params?.id ;
    const post = await prisma.post.findFirstOrThrow({
        where : {
            id : id
        }
    })
    const authorProfile = await prisma.profile.findFirstOrThrow({
        where : {
            username : post.username ,
        }
    })


console.log(post);

    return (
        <>
        <div className=" grid grid-cols-2 gap-4 p-4 w-full">
            <div className="w-full max-h-[80%] rounded-full ">
                <img className="w-full h-full object-contain " src={post.image} />
            </div>
            
            <div className="w-full">
                <div className=" flex rounded-l-full overflow-hidden">
                    <img src={authorProfile.avatar || ""} alt="Creator Avatar" />
                   
                    <div className=" ">
                        <div className="bg-gradient-to-r from-black via-black  to-white h-[2px] w-full"></div>
                        <h3 className="p-3 text-4xl ml-2 font-semibold font-Billabong ">
                            {authorProfile.name}
                            <div className="bg-gradient-to-r from-black  to-white h-[2px] w-1/2 "></div>
                        </h3>
                        <p className="p-2 font border-[1px] border-black rounded-xl  ml-2 ">
                            {post.description} I don't know what is this but kinda annoying.
                        </p> 
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )

}

export default SinglePost