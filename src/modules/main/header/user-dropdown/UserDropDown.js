import React from 'react'
import { Link } from 'react-router-dom';
import { Dropdown} from 'semantic-ui-react';


export const UserDropDown = () => {
    return (
        <div className='nav-link' style={{paddingLeft: '0'}}>
            <Dropdown pointing='top left' text='Jhon doe'> 
                <Dropdown.Menu direction='left'>
                    <Dropdown.Item as={Link} to={`/`} text='My Profile' icon='user' />
                    <Dropdown.Item text='Logout' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
