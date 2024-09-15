import './ProfileMenu.css';
import Button from '../button/Button';
import React from 'react';
import SubMenu from '../header/navbar/submenu/SubMenu';
import { profileMenu } from '../../constants';
import { EditIcon } from '@chakra-ui/icons';
import Icon from '../icon/Icon';

function ProfileMenu({showSignOut, onSignOut}) {

    return(
        <div className={`profileMenuContainer ${showSignOut ? "show" : "hide"}`}>
            <div className='profileContainer'>
                
            </div>
            <div className='menuContainer' >
                <ul>
                    
                    <li><Icon dark={'https://cdn-icons-png.flaticon.com/128/266/266134.png'} light={'https://cdn-icons-png.flaticon.com/128/266/266134.png'} alt={'sign out'} theme={'https://cdn-icons-png.flaticon.com/128/266/266134.png'} anchor={'/'} width={16}/><span>Your Profile</span></li>

                    <li><EditIcon/> <span>Edit Profile</span></li><hr />
                    <li><Icon dark={'https://cdn-icons-png.flaticon.com/128/992/992680.png'} light={'https://cdn-icons-png.flaticon.com/128/992/992680.png'} alt={'sign out'} theme={'https://cdn-icons-png.flaticon.com/128/992/992680.png'} anchor={'/'} width={16}/><Button text={"Sign Out"} path={"/"} onClick={onSignOut}/></li>
                </ul>
            </div>
        </div>
         
    );
}

export default ProfileMenu