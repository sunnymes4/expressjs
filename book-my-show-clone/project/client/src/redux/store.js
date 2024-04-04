import {configureStore} from '@reduxjs/toolkit';
import loadersSlice from './loadersSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        loader: loadersSlice,
        user: userSlice
    }
});

export default store;