import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname + location.state?.from?.search || "/";

  const registerHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await fetch(
          `https://charts-backend.vercel.app/api/user/register`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();

        if (data.token) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);

          navigate(from);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await fetch(
          `https://charts-backend.vercel.app/api/user/login`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();

        if (data.token) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          navigate(from);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-auto mt-10 w-full px-4 md:px-0">
      <div className="w-full md:w-6/12 lg:w-4/12 border p-5 md:p-8 border-gray-300 rounded-md text-center">
        <p className="font-semibold text-xl">{isLogin ? "Login" : "Sign Up"}</p>
        <form>
          <div className="my-4">
            <input
              className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="my-4">
            <input
              className="border w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              type="password"
              required
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {isLogin ? (
              <button
                className="border w-full px-3 py-2 border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold"
                onClick={loginHandler}>
                Login
              </button>
            ) : (
              <button
                className="border w-full px-3 py-2 border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-semibold"
                onClick={registerHandler}>
                Sign Up
              </button>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <p>
              <span>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <span
                className="px-2 hover:underline cursor-pointer text-blue-500"
                onClick={() => setIsLogin((prev) => !prev)}>
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
