import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import authservice from "../Appwrite/auth.js"
import { Input, Button } from './index.js'

import { login } from "../Store/authSlice.js";  

function SignUp() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");
    console.log("the data", data);
    try {
      const createdUser = await authservice.createAccount(data);
      if (createdUser) {
        const currentUser = await authservice.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error?.message || "Something went wrong!");
    }
  }

  return (
    <div>
      <h1>Hello world</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit(signup)}>
        <Input
          label="Full Name: "
          placeholder="Enter your full name"
          {...register("name", { required: true })}
        />

        <Input
          label="Email: "
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  )
}

export default SignUp;
