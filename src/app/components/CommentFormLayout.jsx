import CommentForm from "./CommentForm"
import {auth} from '../../auth'
import {prisma} from "./db"

async function CommentFormLayout({id}) {

    const session = await auth() ;
    const profile = await prisma.profile.findFirstOrThrow({
        where : {
            email : session?.user?.email
        }
    })
    return (
    <CommentForm id={id} avatar={profile.avatar || ""} />
  )
}

export default CommentFormLayout