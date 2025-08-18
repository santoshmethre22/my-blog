import React ,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom'
import authservice from "../Appwrite/auth.js"
import Input from './Input.jsx';
import Button from "./Button.jsx"

function SignUp() {
  const {register,handleSubmit} =useForm();
  const navigate =useNavigate();
  const [error,setError]=useState("");
  const dispatch=useDispatch();


  const signup=async(data)=>{
    setError("");
    console.log("the data",data);
    try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
  }


  return (
    <div>

        Hello world

        <form onSubmit={handleSubmit(signup)}>
          <Input
           label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
                            required: true,
                        })}
          
          />

        <Input
        label="Email: "
                          placeholder="Enter your email"
                          type="email"
                          {...register("email", {
                              required: true,
                              validate: {
                                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                  "Email address must be a valid address",
                              }
                          })}
        />
        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
 <Button type="submit" className="w-full">
                            Create Account
                        </Button>
        </form>
      
    </div>
  )
}

export default SignUp
