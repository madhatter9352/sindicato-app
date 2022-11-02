import { createSlice } from "@reduxjs/toolkit";
import { addWindowClass, calculateWindowSize } from "../../utils/helpers";

addWindowClass('layout-footer-fixed');

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        screenSize: calculateWindowSize(window.innerWidth),
        navbarVariant: 'navbar-light',
        sidebarSkin: 'sidebar-dark-primary',
        menuSidebarCollapsed: false,
        controlSidebarCollapsed: true,
        headerBorder: false,
        headerFixed: false,
        footerFixed: true,
        layoutBoxed: false,
        menuItemFlat: false,
        menuChildIndent: false,
        layoutFixed: false
    },
    reducers: {
        toggleSidebarMenu: (state) => {
            state.menuSidebarCollapsed = !state.menuSidebarCollapsed;
        },
        toggleControlSidebar: (state) => {
            state.controlSidebarCollapsed = !state.controlSidebarCollapsed;
        },
        toggleHeaderBorder: (state) => {
            state.headerBorder = !state.headerBorder;
        },
    }
});

export const {
    toggleSidebarMenu,
    toggleControlSidebar,
    toggleHeaderBorder
} = uiSlice.actions;

export default uiSlice.reducer;