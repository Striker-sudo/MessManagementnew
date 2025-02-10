import React, { useState } from "react";

const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("admin"); // 'admin' or 'user'

  return (
    <div className="min-h-screen flex items-center justify-center bg-badamidark p-4">
      <div className="bg-white rounded-lg shadow-md shadow-white p-8 max-w-4xl w-full flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8">
          <h2 className="text-3xl font-bold mb-4 text-brown6">
            {loginMode === "admin" ? "Admin Login" : "User Login"}
          </h2>
          <p className="text-gray-600 mb-6">
            {loginMode === "admin"
              ? "Login as an administrator to manage the platform."
              : "Login as a student to access your account."}
          </p>

          {/* Buttons to Toggle Login Mode */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`py-2 px-4 rounded-md font-medium transition hover:cursor-pointer ${
                loginMode === "admin"
                  ? "bg-brown5 text-white hover:bg-brown6"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setLoginMode("admin")}
            >
              Admin
            </button>
            <button
              className={`py-2 px-4 rounded-md font-medium transition hover:cursor-pointer ${
                loginMode === "user"
                  ? "bg-brown5 text-white hover:bg-brown6"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setLoginMode("user")}
            >
              User
            </button>
          </div>

          {/* Admin Login Form */}
          {loginMode === "admin" && (
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:brown6"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:brown6"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white py-3 bg-brown6 shadow-lg shadow-brown2 rounded-md transition hover:shadow-md"
              >
                Login as Admin
              </button>
            </form>
          )}

          {/* User Login Form */}
          {loginMode === "user" && (
            <form>
              <div className="mb-4">
                <label
                  htmlFor="regno"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="regno"
                  placeholder="Enter your registration number"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:brown6"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:brown6"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white py-3 bg-brown6 shadow-lg shadow-brown2 rounded-md transition hover:shadow-md"
              >
                Login as User
              </button>
            </form>
          )}
          {/* Divider */}
          <div className="text-center text-sm text-gray-500 my-4">OR</div>
          {/* Google Sign In */}
          <button className="w-full flex items-center justify-center text-white bg-badami5 border border-gray-300 py-2 rounded-md hover:bg-black transition duration-1000">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="25px" height="25px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            <div className="mx-2">
            Sign in with Google
            </div>
             
          </button>
          {/* Sign Up Link */}
          <p className="text-sm text-gray-500 mt-6 text-center flex justify-center">
            Haven't signup?{" "}
            <p className = "animate-bounce"> 
            <a href="src/Signup.jsx" className="m-1 text-red-500 font-medium hover:underline">
              Sign up here!
            </a>
            </p>
          </p>
        {/* </div> */}
           {/* <div className = "flex">
            <div>Haven't Signup Yet?</div>
            <div>Sign up</div>
            </div> */}
        </div>

        {/* Right Section: Illustration */}
        <div className="w-full lg:w-1/2 hidden lg:flex items-center justify-center">
          <img
            src="https://cdn.dribbble.com/users/3281732/screenshots/16120527/media/53b8f6c7c5e6a87f3bc92b8fa22f2fdb.png"
            alt="Login Illustration"
            className="rounded-lg shadow-lg max-h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
