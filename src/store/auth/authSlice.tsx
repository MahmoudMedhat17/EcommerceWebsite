import { createSlice } from '@reduxjs/toolkit';
import getAuth from '@/store/auth/thunk/getAuth';
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
        // Regitser
        builder.addCase(getAuth.pending,(state)=>{
            state.loading ="Pending";
            state.error = null;
        });
        builder.addCase(getAuth.fulfilled,(state)=>{
            state.loading = "Succeeded";
        });
        builder.addCase(getAuth.rejected,(state,action)=>{
            state.loading = "Failed";
            if(isString(action.payload)){
                state.error = action.payload;
            };
        })
    }
});



export default authSlice.reducer;
