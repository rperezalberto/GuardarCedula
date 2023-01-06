import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { dbAuth } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthData {
    name?: string,
    email: string,
    pass: string,
    token: null,
    createUserUser: string,
}

const initialState = {
    name: '',
    email: '',
    pass: '',
    token: null,
    createUserUser: '',
    data: [],
    dataID: [],
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        home: (state, action) => {
            state.token = action.payload;
        },
        signUp: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        singIn: (state, action) => {
            state.token = action.payload;
        },
        dataUSer: (state, action) => {
            // console.log(state.token)
            state.token = action.payload.idUser;
            state.email = action.payload.emailUser;
            state.createUserUser = action.payload.createUserUser;
        },

        getDocument: (state, action) => {
            state.data.unshift(action.payload);
        },
        signOuts: (state) => {
            state.data = [];
            state.token = null;
            // state.name = '';
            // state.createUserUser = '';
            AsyncStorage.removeItem('@token');
            signOut(dbAuth);
        }
    }
});

export const { home, singIn, signUp, dataUSer, getDocument, signOuts } = authSlice.actions;
export default authSlice.reducer;