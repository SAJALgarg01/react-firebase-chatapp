import { LuImagePlus } from "react-icons/lu";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import {
  registerUserToFirebase,
  setUserToFirebase,
  updateProfileImageToFirebase,
  updateUserProfileToFirebase,
} from "../Firebase/actions";
import { handleFirebaseError } from "../Firebase/errorHandle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "../components/shared/LoadingSpin";

const Register = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const user = await registerUserToFirebase(email, password);

      if (!user) return;

      const photoURL = await updateProfileImageToFirebase(file, user.uid);
      await updateUserProfileToFirebase({
        displayName,
        photoURL,
      });
      await setUserToFirebase(user.uid, {
        uid: user.uid,
        displayName,
        email,
        photoURL,
      });

      navigate("/");
      setIsPending(false);
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  return (
    // <div className="relative bg-gradient-to-br from-blue-400 to-sky-300 min-h-screen flex items-center justify-center">
    //   {isPending && <LoadingSpin className="absolute" />}
    //   <div className="bg-white py-8 px-12 rounded-lg flex flex-col gap-6 items-center shadow-lg">
    //     <h1 className="text-neutral-800 font-bold text-4xl">Logo</h1>
    //     <h4 className="text-neutral-700 text-lg">Register</h4>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
    //       <Input placeholder="Enter your display name" type="text" />
    //       <Input placeholder="Email" type="email" />
    //       <Input placeholder="Password" type="password" />

    //       <input id="file" className="hidden" type="file" />
    //       <label
    //         htmlFor="file"
    //         className="flex items-center space-x-4 cursor-pointer p-4 text-sky-600/60 hover:brightness-150 duration-150"
    //       >
    //         <LuImagePlus size={48} />
    //         <span>Update Profile Image</span>
    //       </label>

    //       <Button
    //         className="bg-sky-600/80 disabled:bg-slate-300"
    //         text="Sign Up"
    //         disabled={isPending}
    //       />
    //     </form>
    //     <p className="mt-4 text-neutral-700">
    //       Already have an account?{" "}
    //       <Link
    //         to="/login"
    //         className="text-sky-500 hover:text-sky-800 duration-150"
    //       >
    //         Login
    //       </Link>
    //     </p>
    //   </div>
    // </div>
    <div className="relative bg-gradient-to-br from-blue-400 to-sky-300 min-h-screen flex items-center justify-center">
      {isPending && <LoadingSpin className="absolute" />}
      <div className="bg-white py-8 px-6 md:px-12 rounded-lg flex flex-col gap-4 md:gap-6 items-center shadow-lg w-full md:w-auto max-w-md md:max-w-lg">
        <h1 className="text-neutral-800 font-bold text-3xl md:text-4xl">Logo</h1>
        <h4 className="text-neutral-700 text-lg">Register</h4>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input placeholder="Enter your display name" type="text" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <input id="file" className="hidden" type="file" />
          <label
            htmlFor="file"
            className="flex items-center space-x-2 md:space-x-4 cursor-pointer p-2 md:p-4 text-sky-600/60 hover:brightness-150 duration-150"
          >
            <LuImagePlus size={32} className="md:w-12 md:h-12" />
            <span className="hidden md:inline-block">Update Profile Image</span>
          </label>

          <Button
            className="bg-sky-600/80 disabled:bg-slate-300"
            text="Sign Up"
            disabled={isPending}
          />
        </form>
        <p className="mt-4 text-neutral-700 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-500 hover:text-sky-800 duration-150"
          >
            Login
          </Link>
        </p>
      </div>
    </div>

  );
};

export default Register;
