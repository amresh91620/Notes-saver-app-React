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
      const { title, content } = action.payload;

      // 🔴 Validation
      if (!title?.trim() || !content?.trim()) {
        toast.error("Title and Content are required");
        return;
      }

      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },

    updateToPastes: (state, action) => {
      const { _id, title, content } = action.payload;

      // 🔴 Validation
      if (!title?.trim() || !content?.trim()) {
        toast.error("Title and Content cannot be empty");
        return;
      }

      const index = state.pastes.findIndex(item => item._id === _id);

      if (index >= 0) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex(item => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },

    resetToPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared");
    },
  }
});

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetToPastes
} = pasteSlice.actions;

export default pasteSlice.reducer;
