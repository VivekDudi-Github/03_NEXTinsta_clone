"use client"
import { TextArea } from '@radix-ui/themes';

import { PostComment } from './action';
import { useRouter } from 'next/navigation';

function CommentForm({avatar , id}) {
  const Router = useRouter() ;
  return (
    <form className=' border-b-[2px] border-gray-300 pb-2 '
          action={async (data) => {
            await PostComment(data , id)
            Router.refresh() ;
          }}>

        <div className=' flex gap-2 '>
            <div
             className='w-[56px] h-14 aspect-square rounded-r-full flex-shrink-0 overflow-hidden' onClick={() => {Router.push('/profile')}}>
              <img className=' object-cover size-14' src={avatar} alt="" />
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