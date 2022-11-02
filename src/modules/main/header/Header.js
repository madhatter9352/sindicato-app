import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { toggleSidebarMenu } from '../../../store/reducers/ui';
import { UserDropDown } from './user-dropdown/UserDropDown';

export const Header = () => {
    const dispatch = useDispatch();
    const {navbarVariant, headerBorder} = useSelector((state) => state.ui);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const getContainerClasses = useCallback(() => {
        let classes = `main-header navbar navbar-expand ${navbarVariant}`;
        if (headerBorder) {
            classes = `${classes} border-bottom-0`;
        }
        return classes;
    }, [navbarVariant, headerBorder]);

    return (
        <nav className={getContainerClasses()}>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        onClick={handleToggleMenuSidebar}
                        type="button"
                        className="nav-link"
                    >
                        <i className="fas fa-bars" />
                    </button>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">
                        Contact
                    </Link>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto mr-2">
                {/* <MessagesDropdown />
                <NotificationsDropdown />
                <LanguagesDropdown /> */}
                <li className="nav-item">
                    <div className="row">
                        <Image src={'/img/default-profile.png'} avatar />
                        <UserDropDown />
                    </div>
                </li>
                {/* <li className="nav-item">
                    <button
                        type="button"
                        className="nav-link"
                        onClick={handleToggleControlSidebar}
                    >
                        <i className="fas fa-th-large" />
                    </button>
                </li> */}
            </ul>
        </nav>
    )
}
