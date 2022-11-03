import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { MenuItem } from '../../../components';
import { MENU } from './menuList';

const StyledBrandImage = {
    float: 'left',
    lineHeight: '0.8',
    margin: '-1px 8px 0 6px',
    opacity: '0.8',
    pfBoxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important'
};

export const MenuSidebar = () => {
    const sidebarSkin = useSelector((state) => state.ui.sidebarSkin);
    const menuItemFlat = useSelector((state) => state.ui.menuItemFlat);
    const menuChildIndent = useSelector((state) => state.ui.menuChildIndent);
    return (
        <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
            <Link to="/" className="brand-link">
                <Image
                    src="/img/logo.png"
                    alt="Sindicato Logo"
                    width={33}
                    height={33}
                    rounded
                    style={StyledBrandImage} />
                <span className="brand-text font-weight-light">Sindicato App</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        {/* <StyledUserImage
                            src={user.picture}
                            fallbackSrc="/img/default-profile.png"
                            alt="User"
                            width={34}
                            height={34}
                            rounded
                        /> */}
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {/* {user.email} */}
                        </Link>
                    </div>
                </div>

                <div className="form-inline">
                    {/* <SidebarSearch /> */}
                </div>

                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className={`nav nav-pills nav-sidebar flex-column${
                        menuItemFlat ? ' nav-flat' : ''
                        }${menuChildIndent ? ' nav-child-indent' : ''}`}
                        role="menu"
                    >
                        {MENU.map((menuItem) => (
                            <MenuItem
                                key={menuItem.name + menuItem.path}
                                menuItem={menuItem}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
