import {axiosInstance} from './index';

export const AddTheater = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theaters/add-theater', payload);
        return response.data;
    } catch(err) {
        return err.response
    }
   
}

export const GetTheatersByOwner = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theaters/get-theaters-by-owner', payload);
        return response.data;
    } catch(err) {
        return err.response;
    }
}

export const UpdateTheater = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/theaters/update-theater', payload);
        return response.data;
    } catch(err) {
        return err.response
    }
   
}

export const DeleteTheater = async (payload) => {
    try {
        const response = await axiosInstance.delete('/api/theaters/delete-theater', payload);
        return response.data;
    } catch(err) {
        return err.response
    }
   
}