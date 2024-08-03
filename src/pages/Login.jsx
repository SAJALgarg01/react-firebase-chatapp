// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Input from "../components/shared/Input";
// import Button from "../components/shared/Button";
// import LoadingSpin from "../components/shared/LoadingSpin";
// import { loginToFirebase, sendPasswordResetEmailToFirebase } from "../Firebase/actions";

// const Login = () => {
//   const [isPending, setIsPending] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (email, password) => {
//     try {
//       await loginToFirebase(email, password);
//       setIsPending(false);
//       navigate("/");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsPending(true);

//     const email = e.target[0].value;
//     const password = e.target[1].value;

//     handleLogin(email, password);
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-400 to-sky-300 min-h-screen flex items-center justify-center">
//       {isPending && <LoadingSpin className="absolute" />}
//       <div className="bg-white py-8 px-6 md:px-10 rounded-lg shadow-lg flex flex-col gap-4 items-center w-full md:w-auto max-w-md md:max-w-lg">
//         <h1 className="text-neutral-800 font-bold text-4xl mb-4">Logo</h1>
//         <h4 className="text-neutral-700 text-lg mb-6">Login</h4>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-6 w-full max-w-md"
//         >
//           <Input className="" placeholder="Email" type="email" required/>
//           <Input className ="" placeholder="Password" type="password" required/>
//           <Button
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//             text="Sign In"
//           />
//         </form>
//         <p className="mt-4 text-neutral-700">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-sky-500 hover:text-sky-800 duration-150"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import LoadingSpin from "../components/shared/LoadingSpin";
import { loginToFirebase, sendPasswordResetEmailToFirebase } from "../Firebase/actions";

const Login = () => {
  const [isPending, setIsPending] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await loginToFirebase(email, password);
      setIsPending(false);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await sendPasswordResetEmailToFirebase(email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    handleLogin(email, password);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    handleForgotPassword(email);
  };

  return (
    <div className="bg-gradient-to-br from-amber-900 to-amber-700 min-h-screen flex items-center justify-center">
      {isPending && <LoadingSpin className="absolute" />}
      <div className="bg-white py-8 px-6 md:px-10 rounded-lg shadow-lg flex flex-col gap-4 items-center w-full md:w-auto max-w-md md:max-w-lg">
        <h1 className="text-neutral-800 font-bold text-4xl mb-4">ChitChat</h1>
        {forgotPassword ? (
          <div className="flex flex-col items-center">
            <h4 className="text-neutral-700 text-lg mb-6">Forgot Password</h4>
            <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-6 w-full max-w-md">
              <Input className="" placeholder="Email" type="email" required />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" text="Send Reset Email" />
            </form>
            <p className="mt-4 text-neutral-700">
              Remember your password?{" "}
              <span onClick={() => setForgotPassword(false)} className="text-sky-500 hover:text-sky-800 duration-150 cursor-pointer">
                Login
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h4 className="text-neutral-700 text-lg mb-6">Login</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-md">
              <Input className="" placeholder="Email" type="email" required />
              <Input className="" placeholder="Password" type="password" required />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" text="Sign In" />
            </form>
            <p className="mt-4 text-neutral-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-sky-500 hover:text-sky-800 duration-150">
                Register
              </Link>
            </p>
            <p className="mt-4 text-neutral-700">
              Forgot password?{" "}
              <span onClick={() => setForgotPassword(true)} className="text-sky-500 hover:text-sky-800 duration-150 cursor-pointer">
                Click here
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;