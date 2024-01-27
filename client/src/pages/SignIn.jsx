import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const dispach = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // setError(false);
      dispach(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(res);
      // setLoading(false);
      dispach(signInSuccess(data));
      if (data.success === false) {
        // setError(true);
        dispach(signInFail(data));
      }
      const navigate = useNavigate();
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispach(signInFail(error));
    }
  };
  return (
    <div className="mx-auto p-3 max-w-lg ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 p-3 text-white rounded-lg hover:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex mt-5">
        <p>Dont Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 ml-2">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-3">
        {error && "Something went Wrong" }
      </p>
    </div>
  );
};

export default SignIn;
