import {createSlice} from '@reduxjs/toolkit';


interface AuthData {
    name?: string,
    user: string,
    pass:string,
    token: string
}

const initialState:AuthData = {
    name: 'Robin',
    user: '',
    pass:'',
    token:''
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        singIn:(state, action) =>{
            state.name = action.payload;
        }
    }
});

export const {singIn} = authSlice.actions;
export default authSlice.reducer;