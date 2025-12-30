import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem('pastes')
        ? JSON.parse(localStorage.getItem('pastes'))
        : []
};

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste created successfully");
        },
        updateToPastes: (state, action) => {

        },
        resetToPastes: (state, action) => {
        },
        removeFromPastes: (state, action) => {

        },
    }
})

export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer