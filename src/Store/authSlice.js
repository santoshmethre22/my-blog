import { createSlice } from "@reduxjs/toolkit";

const initialState={

    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log(action );
            console.log(action.type);
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout:(state,action)=>{
             state.status = false;
            state.userData = null;
        }
    }
})

// authSlice.actions → Contains the action creators (login, logout).

// authSlice.reducer → The actual reducer function to pass to the store.
export const  {login,logout}=authSlice.actions;
export default authSlice.reducer;