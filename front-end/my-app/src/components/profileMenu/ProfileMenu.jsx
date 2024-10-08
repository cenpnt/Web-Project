import './ProfileMenu.css';
import Button from '../button/Button';
import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { FaRegUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";

function ProfileMenu({ showSignOut, onSignOut }) {
    const [show, setShow] = useState(showSignOut);
    const profileMenuRef = useRef(null);

    useEffect(() => {
        setShow(showSignOut);
    }, [showSignOut]);

    useEffect(() => {
        const clickOutside = event => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        };
    }, []);


    return(
        <div ref={profileMenuRef} className={`profileMenuContainer ${show ? "show" : "hide"}`}>
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