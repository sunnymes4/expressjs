import {axiosInstance} from './index';

export const RegisterUser = async (userData) => {
    try {

        const response = await axiosInstance.post('/api/users/register', userData);
        return response.data;

    } catch(err) {
        console.log(err);
    }
}

export const LoginUser = async (user) => {
    try {
        const response = await axiosInstance.post('/api/users/login', user);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}