import './ProfileMenu.css';
import Button from '../button/Button';
import React from 'react';
import { Icon } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { FaRegUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";

function ProfileMenu({showSignOut, onSignOut}) {

    return(
        <div className={`profileMenuContainer ${showSignOut ? "show" : "hide"}`}>
            <div className='profileContainer'>
                
            </div>
            <div className='menuContainer' >
                <ul>
                    
                    <li>
                        <Icon as={FaRegUser}/>
                        <a href='/u_student'>Your Profile</a>
                    </li>

                    <li>
                        <EditIcon/> 
                        <a href='/editprofile'>Edit Profile</a>
                    </li>
                    <hr />
                    <li>
                        <Icon as={GoSignOut}/>
                        <Button text={"Sign Out"} path={"/"} onClick={onSignOut}/>
                    </li>
                </ul>
            </div>
        </div>
         
    );
}

export default ProfileMenu