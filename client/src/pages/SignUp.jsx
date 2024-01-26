import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="mx-auto p-3 max-w-lg ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg hover:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex mt-5">
        <p>Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 ml-2">Sign-in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
