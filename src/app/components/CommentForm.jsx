import { TextArea } from '@radix-ui/themes';
import { PostComment } from './action';

function CommentForm({avatar , id}) {
  return (
    <form className=''
          action={async (data) => {
            "use server"
            await PostComment(data , id)
          }}>

        <div className=' flex gap-2 '>
            <div className='w-[56px] h-14 aspect-square rounded-r-full flex-shrink-0 overflow-hidden '>
              <img src={avatar} alt="" />
            </div>
            <div className=' w-full '>
              <TextArea  name='comment'
              placeholder='Tell the world What do you think...' />
            <div className=' py-1'>
              <button
                type='submit'
                className='bg-gray-900 rounded-lg text-white p-2 w-full'>
                Post Comment
              </button>
            </div>
            </div>
        </div>
    </form>
  )
}

export default CommentForm