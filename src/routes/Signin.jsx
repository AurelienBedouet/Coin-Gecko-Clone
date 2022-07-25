import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signIn, UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <main className="max-w-[400px] mx-auto min-h-[480px] px-4 py-8 mt-36">
      <h1 className="text-2xl font-bold">Sign In</h1>

      {/* Error Handling */}
      {error ? (
        <p className="bg-red-300 p-3 my-2">Email/Password Incorrect</p>
      ) : null}

      {/* Start Form */}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="my-4">
          <label>Email</label>
          <div className="my-2 w-full relative rounded-2xl shadow-xl">
            <input
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 bg-primary border border-input rounded-2xl"
              type="email"
            />
            <AiOutlineMail className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="my-4">
          <label>Password</label>
          <div className="my-2 w-full relative rounded-2xl shadow-xl">
            <input
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 bg-primary border border-input rounded-2xl"
              type="password"
            />
            <AiFillLock className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Sign In Button */}
        <button className="w-full my-2 p-2 bg-button text-btnText rounded-2xl shadow-xl">
          Sign In
        </button>
      </form>
      {/* End Form */}

      <p className="my-4">
        Don't have an account ?{" "}
        <Link to="/signup" className="text-accent">
          Sign Up
        </Link>
      </p>
    </main>
  );
};

export default Signin;
