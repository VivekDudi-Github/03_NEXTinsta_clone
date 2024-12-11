import {prisma} from './db'

export default async function SearchResults({query}) {

  const profiles = await prisma.profile.findMany({
    where : {
      OR : [
        {username : { contains : query.q}} , 
        {name : { contains : query.q }} 
      ]
    }
  })

  return (
    <div>
        <h1 className=' my-2 '>
          Search results for {query?.q}
        </h1>
        <h2> Profiles
          { profiles.length > 0 ? 
            profiles.map((profile) => {
              return (
                <div   className=' text-gray'>
                  {profile.username}
                </div>
              )
            }) :
            <div>
              No profiles found
            </div>
          }
        </h2>
    </div>
  )
}
