import SinglePost from "../../../posts/[id]/page";
import InterceptRouteBackdrop from "../../../../components/InterceptRouteBackdrop"

async function page({params}) {
  const GetParams = await params ;
  console.log(GetParams.id);
  
  return (
    <div className=" bg-black/60 fixed inset-0 z-20">
      <div className=" bg-white inset-12 absolute p-4 overflow-scroll z-30 ">
        <SinglePost passedParams={GetParams} />
      </div>
      <div className="inset-0  fixed z-20">
        <InterceptRouteBackdrop />
      </div>
    </div>
  )
}

export default page