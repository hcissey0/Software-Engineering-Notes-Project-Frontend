import { useState } from "react";
import "../../App.css";
import ThemeToggle from "../atoms/ThemeToggle";
import Result from "postcss/lib/result";
import { useNavigate, Form, Link} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster />
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <Form
        className="p-12 md:w-[500px] rounded-2xl shadow-xl bg-white dark:bg-slate-800"
        method="POST"
      >
        <h1 className="login text-2xl font-bold text-gray-950 mb-4 dark:text-white">
          Signup
        </h1>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            name="username"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email"
            name="email"
            // onChange={handleChange}
            required
          />
        </div>
     

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="password1"
            // onChange={handleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="password2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="password2"
            // onChange={handleChange}
            required
          />
        </div>
       
        
      
        <button
          type="submit"
          className="text-white bg-blue-700 block hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       
        >
          Sign up
        </button>
        <div className="mt-2 flex gap-2 justify-center">
          <span className="dark:text-gray-400">
            Already have an account? 
          </span>
          <Link to='/login' className="text-blue-600 hover:underline underline-offset-4">
            Login
          </Link>
        </div>
      </Form>
      
    </div>
  );
};

export default Signup;
