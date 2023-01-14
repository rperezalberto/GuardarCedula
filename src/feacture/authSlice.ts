import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { dbAuth } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData } from '../util/Util';



const initialState = {
    name: '',
    email: '',
    token: null,
    privilegio: '',
    createUserUser: '',
    data: [],
    users: [],
    dataSearch: {
        title: null,
        nameImg: null,
        tokenUser: null,
        urlCedula: null,
        id: null
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        home: (state, action) => {
            state.token = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.privilegio = action.payload.privilegio;
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
            // state.users = [];
        },
        getUsers: (state, action) => {
            state.users.push(action.payload);
        },
        resetData: (state) => {
            state.data = [];
        },

        resetUserList: (state) => {
            state.users = [];
        },
        resultSearch: (state, action) => {
            state.dataSearch.id = action.payload.id;
            state.dataSearch.title = action.payload.title;
            state.dataSearch.nameImg = action.payload.nameImg;
            state.dataSearch.tokenUser = action.payload.tokenUser;
            state.dataSearch.urlCedula = action.payload.urlCedula;
        },
        signOuts: (state) => {
            state.data = [];
            state.token = null;
            state.users = [];
            AsyncStorage.removeItem('@token');
            signOut(dbAuth);
        }
    }
});

export const {
    setToken,
    home,
    singIn,
    signUp,
    dataUSer,
    getDocument,
    getProfileInfo,
    getUsers,
    resetData,
    resetUserList,
    resultSearch,
    signOuts
} = authSlice.actions;
export default authSlice.reducer;