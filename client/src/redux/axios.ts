import axios, { AxiosError } from 'axios';
import { isExpired } from 'react-jwt';
import { AuthDataKeys } from '../utils/constants';
import { store } from './store';
import { signOut } from './store/reducers';

axios.defaults.baseURL = 'http://localhost:8000';

const accessToken = localStorage.getItem(AuthDataKeys.ACCESS_TOKEN);
axios.interceptors.response.use(
    response => {
        return response;
    },
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            const isMyTokenExpired = isExpired(accessToken || '');
            if (isMyTokenExpired) {
                store.dispatch(signOut());
                return null;
            }
        }
        const code = error.response?.data?.code;
        if (code != undefined) {
            return Promise.reject(new Error(String(code)));
        }
        return Promise.reject(error);
    },
);
if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
