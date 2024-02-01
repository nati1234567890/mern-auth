import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const fileRef = useRef();
  const [Image, setImage] = useState(null);
  const [imagePercente, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log(imagePercente);

  const handleFileUpload = async (image) => {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadUrl) =>
            setFormData({ ...formData, profilePicture: downloadUrl }),
          setImage(null)
        );
      }
    );
  };
  useEffect(() => {
    if (Image) {
      handleFileUpload(Image);
    }
  }, [Image]);
  return (
    <div className="pd-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center py-4">Profile</h1>
      <form className="flex flex-col">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 self-center mb-7 cursor-pointer mt-5 rounded-full object-cover"
          src={formData.profilePicture || currentUser.profilePicture}
          alt={currentUser.name}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">error uploading image</span>
          ) : imagePercente > 0 && imagePercente < 100 ? (
            <span>{`uploading image ...${imagePercente}%`}</span>
          ) : imagePercente == 100 ? (
            <span className="text-green-600">Image uploded succssfully</span>
          ) : (
            ""
          )}
        </p>
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
