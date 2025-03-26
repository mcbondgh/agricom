import { Button, Card, FloatingLabel } from "flowbite-react";
import IMG from '/agric_1.jpg'
import IMG2 from '/agric_14.jpg'
import { ImLeaf } from "react-icons/im";
import { UserContext } from "@/contextManager/context/AppContext";
import { useState, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export function Login() {
  const { user } = useContext(UserContext);
  console.log(user)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="flex min-h-screen items-center flex-col justify-center bg-gray-100 p-6 md:p-10 bg-cover bg-center relative"
    style={{ backgroundImage: `url(${IMG})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <Card 
        className=" z-10 flex w-full max-w-5xl h-auto md:h-[80vh] overflow-hidden"
        theme={{ root: { children: "flex h-full flex-row justify-center gap-4 p-6 md:p-0" }}}
      >
        {/* Left Section: Image Placeholder */}
        <div className="hidden md:flex md:w-1/2  items-center justify-center h-full">
          <div className="rounded-lg w-full h-full flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${IMG2})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center">
            <span className="flex text-4xl font-bold text-green-400 items-center justify-center"><ImLeaf className="hidden z-10 text-green-500 md:block mr-[-1.8rem] w-24 h-24 mb-5"/>Agricom</span>
              <h2 className="text-2xl text-center font-bold text-green-400 mt-4">We are here to help farmers</h2>
              <p className="mt-4 text-gray-200 text-center">
                We stand by the farmer with the billions of resources we spend on agriculture every year.
              </p>
            </div>
          </div>
        </div>
        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 p-0 flex justify-center items-center flex-col">
          <div className="flex flex-col gap-3 text-center my-6">
          <span className="md:hidden flex text-2xl font-bold text-green-700 items-center justify-center"><ImLeaf className="z-10 text-green-500 md:block mr-[-1.2rem] w-16 h-16 mb-5"/>Agricom</span>
            <h1 className="text-2xl md:text-3xl text-green-700 font-bold">Welcome back</h1>
            <p className="text-gray-600 text-balance">Login to your Agricom account</p>
          </div>
          <form className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm">
            <div>
              <FloatingLabel color="success" id="email" type="email"  variant="outlined" label="Email" required/>
            </div>
            <div>
              <span className="block relative">
                <FloatingLabel color="success" id="password" type={showPassword ? "text" :"password"}  variant="outlined" label="Password"  required/>
                { 
                  showPassword 
                  ?
                  <IoMdEyeOff  onClick={()=> setShowPassword(false)} className="text-green-700 md:w-6 md:h-6 cursor-pointer absolute right-4 top-[25%]"/>
                  :
                  <IoMdEye  onClick={()=> setShowPassword(true)} className="text-green-700 md:w-6 md:h-6 cursor-pointer absolute right-4 top-[25%]"/>
                }
              </span>
              <a href="#" className="text-sm md:text-xl text-green-700 font-normal hover:underline mt-6 block text-right">
                Forgot your password?
              </a>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800">Login</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
