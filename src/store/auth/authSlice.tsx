import { createSlice } from '@reduxjs/toolkit';
import getAuthRegister from '@/store/auth/thunk/getAuthRegister';
import getAuthLogin from './thunk/getAuthLogin';
import { isString } from '@/types';
import type { TLoading } from '@/types';

interface IAuthState{
    loading: TLoading;
    error: string | null;
    accessToken:string | null;
    user:{
        id:number;
        email:string;
        firstName:string;
        lastName:string;
    } | null;
}

const initialState: IAuthState = {
    loading:"Idle",
    error:null,
    accessToken:null,
    user:null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        // This reducer is to reset the errors shown to the user like "Incorrect Password" Msg.
        resetErrors:(state)=>{
            state.loading = "Idle";
            state.error = null;
        },
        // This reducer is to reset the state of the user and accessToken when the user Logs out of his account.
        authLogout:(state)=>{
            state.user = null;
            state.accessToken = null;
        }
    },
    extraReducers:(builder)=>{
        // Register
        builder.addCase(getAuthRegister.pending,(state)=>{
            state.loading = 'Pending';
            state.error = null;
        });
        builder.addCase(getAuthRegister.fulfilled,(state)=>{
            state.loading = "Succeeded";
            state.error = null;
        });
        builder.addCase(getAuthRegister.rejected,(state,action)=>{
            state.loading = "Failed";
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });
        // Login
        builder.addCase(getAuthLogin.pending,(state)=>{
            state.loading = "Pending";
            state.error = null;
        });
        builder.addCase(getAuthLogin.fulfilled,(state,action)=>{
            state.loading = "Succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(getAuthLogin.rejected,(state,action)=>{
            state.loading = "Failed";
            if(isString(action.payload)){
                state.error = action.payload;
            }
        });
    }
});


export const {resetErrors, authLogout} = authSlice.actions;
export default authSlice.reducer;
