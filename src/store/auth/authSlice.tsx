import { createSlice } from '@reduxjs/toolkit';
import getAuthRegister from '@/store/auth/thunk/getAuthRegister';
import { isString } from '@/types';

interface IAuthState{
    loading: 'Idle' | 'Pending' | 'Succeeded' | 'Failed';
    error: string | null;
}

const initialState: IAuthState = {
    loading:"Idle",
    error:null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
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
        })
    }
});



export default authSlice.reducer;
