import { useState } from "react";
import { Form, Link } from "react-router-dom";
import "../../App.css";
import ThemeToggle from "../atoms/ThemeToggle";
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Toaster />
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <Form
        className="md:w-[500px] p-12 rounded-2xl shadow-xl bg-white dark:bg-slate-800"
        method="POST"
      >
        <h1 className="login text-2xl font-bold text-gray-950 mb-4 dark:text-white">
          Login
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
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="password"
            // onChange={handleChange}
            required
          />
        </div>
       
        <button
          type="submit"
          className="text-white bg-blue-700 block hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log in
        </button>
        <div className="mt-2 flex gap-2 justify-center">
          <span className="dark:text-gray-400">
            Don't have an account? 
          </span>
          <Link to='/signup' className="text-blue-600 hover:underline underline-offset-4">
            Create an account
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
