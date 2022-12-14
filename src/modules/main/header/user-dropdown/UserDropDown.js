import React from 'react'
import {Dropdown} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../store/reducers/auth";


export const UserDropDown = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className='nav-link' style={{paddingLeft: '0'}}>
            <Dropdown 
                pointing='top left' 
                text={user.first_name + ' ' + user.last_name}
                //text='Jhon doe'
            >
                <Dropdown.Menu direction='left'>
                    <Dropdown.Item text='Salir' icon='power' onClick={handleLogout}/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
