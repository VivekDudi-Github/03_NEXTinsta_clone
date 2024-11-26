import { Button, TextArea } from '@radix-ui/themes';
import {auth} from '../../auth'
import {prisma} from "./db"
import {PostComment} from "./action"

async function CommentForm() {

    // const session = await auth() ;
    // const profile = await prisma.profile.findFirstOrThrow({
    //     where : {
    //         email : session?.user?.email
    //     }
    // })
    return (
    <form className=''
          action={ async(Data) => {
            "use server"  
            await PostComment(Data)
          }}>

        <div className=' flex gap-2 '>
            <div className='w-[64px] h-16 aspect-square rounded-r-full border-gray-600  border flex-shrink-0 overflow-hidden '>
              <img src={"profile.avatar"} alt="" />
            </div>
            <div className=' w-full '>
              <TextArea  
              placeholder='Tell the world What do you think...' />
            <div className=' py-1'>
              <button
                type='submit'
                className='bg-gray-900 rounded-lg text-white p-2'>
                Post Comment
              </button>
            </div>
            </div>
        </div>
        
    </form>
  )
}

export default CommentForm