// components/ProfilePicture.js
import React from 'react';
import { TbUpload } from "react-icons/tb";
import { Icon } from "@chakra-ui/react";
import "./ProfilePicture.css"

const ProfilePicture = ({ selectedImage, onImageChange }) => {
    return (
        <div className="profile-section">
            <div className="profile-picture">
                <img src={selectedImage} alt="Profile Preview" className="profile-image" />
            </div>
            <label htmlFor="profilePic" className="upload-section">
                <div className="upload-box">
                    <Icon as={TbUpload} />
                    <span className="upload-text">Upload Picture</span>
                </div>
                <input type="file" id="profilePic" accept="image/*" onChange={onImageChange} className="file-input" />
            </label>
        </div>
    );
};

export default ProfilePicture;
