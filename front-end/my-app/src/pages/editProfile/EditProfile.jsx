import React, { useState } from "react";
import { TbUpload } from "react-icons/tb";
import './EditProfile.css';  // For styling
import { Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'
import Button from "../../components/button/Button";

function EditProfile() {
    const defaultProfilePic = "https://instagram.fbkk22-1.fna.fbcdn.net/v/t1.15752-9/423063124_412325167940689_1360113152861860307_n.png?stp=dst-png_s403x403&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=7a2feRAfE88Q7kNvgGSKS2i&_nc_ht=instagram.fbkk22-1.fna&_nc_gid=ARjrtvajyDsYhWLKO91EmuR&oh=03_Q7cD1QHfGzBu51Ig93BOro_n1PqGmgRFg5OekQaVUyae6QvQAg&oe=670E1B4A";
    const [selectedImage, setSelectedImage] = useState(defaultProfilePic);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        password: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission (e.g., send data to the server)
        console.log('Profile Updated', formData);
    };

    return (
        <div className="editProfile">
            <h3>Edit Profile</h3>

            <div className="editProfileBox">
                <div className="editProfileTop">
                    <Button text={<ArrowBackIcon w={10} h={7}/>} path={"/u_student"} override/>
                    
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="editProfileLeft">
                        <div className="profile-section">
                            <div className="profile-picture">
                                <img 
                                    src={selectedImage} 
                                    alt="Profile Preview" 
                                    className="profile-image"
                                />
                            </div>

                            <div className="upload-section">
                                <label htmlFor="profilePic" className="upload-label">
                                    <div className="upload-box">
                                        <Icon as={TbUpload}/>
                                        <span className="upload-text">Upload Picture</span>
                                    </div>
                                </label>
                                <input 
                                    type="file" 
                                    id="profilePic" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="file-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="editprofileRight">
                        <div className="input-section">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name} 
                                onChange={handleInputChange} 
                                className="input-field"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="input-section">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="address" 
                                id="address" 
                                name="address"
                                value={formData.address} 
                                onChange={handleInputChange} 
                                className="input-field"
                                placeholder="Enter your Address"
                            />
                        </div>

                        <div className="input-section">
                            <label htmlFor="password">Change Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                value={formData.password} 
                                onChange={handleInputChange} 
                                className="input-field"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="input-section">
                            <label htmlFor="passwordCon">Password Confirmation</label>
                            <input 
                                type="password" 
                                id="passwordCon" 
                                name="passwordCOn"
                                value={formData.password} 
                                onChange={handleInputChange} 
                                className="input-field"
                                placeholder="Confirm password"
                            />
                        </div>

                        <div className="save-button-container">
                            <button type="submit" className="save-button">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
