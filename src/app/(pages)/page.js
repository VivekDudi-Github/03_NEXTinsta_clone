import { auth, signIn } from "../../auth.js";
import HomePage from "../components/HomePage.jsx"

export default async function Home() {
  const session = await auth();
if(!session){
  return (
    <div className="">
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button 
            className="border-2 bg-orangish rounded-xl p-4" 
            type="submit"
        >
          Signin with Google
        </button>
      
      </form>
      
    </div>
    );
}
  return (
  <div className="w-full">
      <HomePage  />
  </div>
  );
}
