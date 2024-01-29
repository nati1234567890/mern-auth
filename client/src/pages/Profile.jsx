import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="pd-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center py-4">Profile</h1>
      <form className="flex flex-col">
        <img
          className="h-24 w-24 self-center mb-7 cursor-pointer mt-5 rounded-full object-cover"
          src={currentUser.profilePicture}
          alt={currentUser.name}
        />
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 mb-4"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 p-3 mb-4"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 p-3 mb-4"
        />
        <button className="p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
