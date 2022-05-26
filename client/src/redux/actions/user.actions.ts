import { RoutePath } from './../../routes/routes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SignInData, AuthData, SignUpData } from '../../core/models/user/user.model';
import { AuthDataKeys, UserStoreDataKeys } from '../../utils/constants';

export interface PayloadInterface {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    data: any;
    error: boolean;
    message: string;
}

export const setAuthInfo = (data: AuthData) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data[AuthDataKeys.ACCESS_TOKEN]}`;
    localStorage.setItem(AuthDataKeys.ACCESS_TOKEN, data[AuthDataKeys.ACCESS_TOKEN]);
};

export const clearAuthInfo = () => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem(AuthDataKeys.ACCESS_TOKEN);
    localStorage.removeItem(UserStoreDataKeys.EMAIL);
    localStorage.removeItem(UserStoreDataKeys.ID);
};

export const signIn = createAsyncThunk(
    'user/signin',
    async (
        { email, password, navigateHome }: SignInData & { navigateHome: () => void },
        { rejectWithValue },
    ) => {
        const { data } = await axios.post('user/signin', {
            email,
            password,
        });
        if (!data.data) {
            return rejectWithValue({
                error: true,
                data: null,
                message: data.message,
            });
        }

        setAuthInfo({
            accessToken: data.data.token,
            userId: data.data.id,
        });
        navigateHome();
        return {
            [AuthDataKeys.USER_ID]: data.id,
            [AuthDataKeys.ACCESS_TOKEN]: data.token,
        };
    },
);

export const signUp = createAsyncThunk(
    'auth/signup',
    async (
        { email, password, navigateHome }: SignUpData & { navigateHome: () => void },
        { rejectWithValue },
    ) => {
        const { data } = await axios.post('user/signup', {
            email,
            password,
        });
        console.log(email, password, 'data');
        if (!data.data) {
            return rejectWithValue({
                error: true,
                data: null,
                message: data.message,
            });
        }
        const { id } = data;
        setAuthInfo({
            accessToken: data.data.token,
            userId: data.data.id,
        });
        navigateHome();
        return {
            email,
            id,
            [AuthDataKeys.ACCESS_TOKEN]: data.token,
        };
    },
);

export const setUserDataFromLocalStorage = createAsyncThunk(
    'auth/profile/from-local-storage',
    () => {
        const email = localStorage.getItem(UserStoreDataKeys.EMAIL);
        const userId = localStorage.getItem(AuthDataKeys.USER_ID);

        if (email === null || userId === null) {
            return Promise.reject();
        }
        return Promise.resolve({
            userId,
            email,
        });
    },
);

export const updateUserData = createAsyncThunk('auth/profile/update', async () => {
    const {
        data: { data },
    } = await axios.get('user/profile');
    localStorage.setItem(UserStoreDataKeys.EMAIL, data.email);
    localStorage.setItem(UserStoreDataKeys.ID, data.id);
    return {
        [UserStoreDataKeys.ID]: data.id,
        [UserStoreDataKeys.EMAIL]: data.email,
    };
});
