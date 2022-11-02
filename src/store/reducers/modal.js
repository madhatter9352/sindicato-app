import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        body: null,
        props: null
    },
    reducers: {
        setProps(state, action){
            state.props = action.payload
        },
        openModal(state, action){
            state.isOpen = true;
            state.body = action.payload;
        },
        closeModal(state, action){
            state.isOpen = false;
            state.body = null;
        } 
    },
});

export const {openModal, closeModal, setProps} = modalSlice.actions;

export default modalSlice.reducer;