import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toggleSidebarMenu } from '../../store/reducers/ui';
import { addWindowClass, removeWindowClass } from '../../utils/helpers';
import { Header } from './header/Header';
import { MenuSidebar } from './menu-sidebar/MenuSidebar';

export const Home = () => {
    const dispatch = useDispatch();
    const {menuSidebarCollapsed, controlSidebarCollapsed} = useSelector(
        (state) => state.ui
    );
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    useEffect(() => {
        removeWindowClass('register-page');
        removeWindowClass('login-page');
        removeWindowClass('hold-transition');
    
        addWindowClass('sidebar-mini');
    
        return () => {
            removeWindowClass('sidebar-mini');
        };
    }, []);

    useEffect(() => {
        removeWindowClass('sidebar-closed');
        removeWindowClass('sidebar-collapse');
        removeWindowClass('sidebar-open');
        if (menuSidebarCollapsed && screenSize === 'lg') {
            addWindowClass('sidebar-collapse');
        } else if (menuSidebarCollapsed && screenSize === 'xs') {
            addWindowClass('sidebar-open');
        } else if (!menuSidebarCollapsed && screenSize !== 'lg') {
            addWindowClass('sidebar-closed');
            addWindowClass('sidebar-collapse');
        }
    }, [screenSize, menuSidebarCollapsed]);

    useEffect(() => {
        if (controlSidebarCollapsed) {
            removeWindowClass('control-sidebar-slide-open');
        } else {
            addWindowClass('control-sidebar-slide-open');
        }
    }, [screenSize, controlSidebarCollapsed]);

    const getAppTemplate = useCallback(() => {
        return( 
        <>
            <Header />

            <MenuSidebar />

            <div className="content-wrapper">
                <div className="pt-3" />
                <section className="content">
                    <Outlet />
                </section>
            </div>
            <div
                id="sidebar-overlay"
                role="presentation"
                onClick={handleToggleMenuSidebar}
                onKeyDown={() => {}}
            />
        </>)
    }, []);

    return (
        <div className='wrapper'>
            {getAppTemplate()}
        </div>
    )
}
