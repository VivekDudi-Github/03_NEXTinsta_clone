"use client"

import { Button, TextArea } from "@radix-ui/themes"
import { Send, Upload } from "lucide-react"
import { useRef, useState , useEffect } from "react"

function page() {
  const Url = "https://picsum.photos/id/1/2160/3080" ;
const [ImageUrl , setImageUrl] = useState("") ; 
const [UploadImage , setUploadImage] = useState(null) ;
const UploadRef = useRef() ;


useEffect( () => {
  if(!UploadImage){
      return ;
  }
  
  const UploadFunc = async() => {
      const data = new FormData ;
      console.log(data);
      
      data.set("file" ,  UploadImage)  ;
      
      const uploadRequest = await fetch("/api/upload" ,  {
          method : "POST" ,
          body : data ,  
      } ) 
      const signedUrl = await uploadRequest.json();
      console.log(signedUrl);
      
      setImageUrl(signedUrl) ;
      
  }
  UploadFunc() ;
} , [ UploadImage])

  return (
    <div className="flex justify-center font-Billabong gap-4 bg-white w-full   from-white to-black p-2 ">
        
        <div> 
            <div className=" w-64 max-h-screen  min-h-64 p-2 pb-3 bg-gradient-to-b from-gray-600 to-gray-100 rounded-xl relative flex items-center justify-center ">        
              {ImageUrl ? 
                <img className="rounded-xl shadow-2xl " src={ImageUrl} />
                : 
               <div className=" bg-white size-64 border-2 shadow-2xl  rounded-lg  "></div>
              }
             <div className="absolute inset-0 flex justify-center items-center">
              <input  
                      type="file"
                      className="hidden" 
                      ref={UploadRef} 
                      onChange={(e) => setUploadImage(e.target.files?.[0])}
                    />
              <Button  type="button" className="bg-black z-50  "  onClick={() => UploadRef.current.click()}>
                  < Upload/>
                 Upload a Photo
              </Button>
            </div> 
            </div>  
              
        </div>
        
        <div className=" flex flex-col gap-2">
          <TextArea name="description" rows={5} placeholder="Add Post description.."/>
          
          <div className="bg-gradient-to-tr from-slate-300 to-black rounded-xl p-1 group">
            <div className="bg-white rounded-lg group-hover:bg-transparent duration-200">
              <button className=" w-full rounded-lg pt-1 from-slate-300 to-black bg-gradient-to-tr text-transparent bg-clip-text group-hover:text-white" >
                Publish Your Post
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page