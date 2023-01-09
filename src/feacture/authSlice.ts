import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { dbAuth } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData } from '../util/Util';



const initialState: AuthData = {
    name: '',
    email: '',
    token: null,
    createUserUser: '',
    data: [
        {
            data: {
            }
        }
    ],
    users: [
    ]
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
        getProfileInfo: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.users = [];
        },
        getUsers: (state, action) => {
            state.users.push(action.payload);
        },
        resetData: (state) => {
            state.data = [
                {
                    id: '',
                    data: {
                        title: '',
                        tokenUser: '',
                        urlCedula: ''
                    }
                }
            ];
        },

        resetUserList: (state) => {
            state.users = [];
        },

        signOuts: (state) => {
            state.data = [
                {
                    id: '',
                    data: {
                        title: '',
                        tokenUser: '',
                        urlCedula: ''
                    }
                }
            ];
            state.token = null;
            state.users = [];
            AsyncStorage.removeItem('@token');
            signOut(dbAuth);
        }
    }
});

export const {
    home,
    singIn,
    signUp,
    dataUSer,
    getDocument,
    getProfileInfo,
    getUsers,
    resetData,
    resetUserList,
    signOuts
} = authSlice.actions;
export default authSlice.reducer;