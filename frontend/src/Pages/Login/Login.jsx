import { Button, Label, TextInput } from 'flowbite-react';
import { HiUser, HiLockClosed } from 'react-icons/hi';

export const Login = () => {
  return (
    <div className="p-2 min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('https://static9.depositphotos.com/1086305/1131/i/600/depositphotos_11318042-stock-photo-american-country-with-big-city.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>
      <div className="w-full max-h-full max-w-4xl bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 relative z-10 lg:grid-cols-2 sm:grid-cols-1">
        {/* Left Section */}
        <div className="p-8  flex-col justify-center bg-gray-100 bg-opacity-30 backdrop-blur-lg rounded-l-lg hidden sm:block lg:flex">
          <h1 className="text-3xl text-center mb font-bold text-green-700">Agricom</h1>
          <h2 className="text-2xl text-center font-bold text-green-700 mt-4">We are here to help farmers</h2>
          <p className="mt-4 text-gray-600 text-center">
            We stand by the farmer with the billions of resources we spend on agriculture every year.
          </p>
        </div>
        {/* Right Section (Login Form) */}
        <div className="p-12 flex flex-col gap-2 justify-center bg-white bg-opacity-30 backdrop-blur-lg rounded-r-lg w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign in</h2>
          <p className="text-gray-600 text-sm mb-4">Type your username and password to sign in.</p>
          <form className="space-y-4">
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput id="username" icon={HiUser} placeholder="Enter your username" required />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput id="password" type="password" icon={HiLockClosed} placeholder="Enter your password" required />
            </div>
            <div className="text-right text-sm">
              <a href="#" className="text-green-600 hover:underline">Forgot?</a>
            </div>
            <Button color='success' className="w-full"  type="submit">
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
