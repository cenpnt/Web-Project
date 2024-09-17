import React, { useState } from "react";
import { TbUpload } from "react-icons/tb";
import './EditProfile.css';  // For styling
import { Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import Button from "../../components/button/Button";

function EditProfile() {
    const defaultProfilePic = "https://instagram.fbkk22-1.fna.fbcdn.net/v/t1.15752-9/423063124_412325167940689_1360113152861860307_n.png?stp=dst-png_s403x403&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=7a2feRAfE88Q7kNvgGSKS2i&_nc_ht=instagram.fbkk22-1.fna&_nc_gid=ARjrtvajyDsYhWLKO91EmuR&oh=03_Q7cD1QHfGzBu51Ig93BOro_n1PqGmgRFg5OekQaVUyae6QvQAg&oe=670E1B4A";
    const [selectedImage, setSelectedImage] = useState(defaultProfilePic);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        password: '',
        confirmPassword: '',
        profile: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [inputError, setInputError] = useState(false);

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

        if (name === 'password' || name === 'confirmPassword') {
            setInputError(false);
            setErrorMessage('');
        }
    };

    const isValidPassword = (password) => {
        const hasNumber = /\d/; 
        const hasUpperCase = /[A-Z]/; 
        return password.length >= 8 && hasNumber.test(password) && hasUpperCase.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            setInputError(true);
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Validate password requirements
        if (!isValidPassword(formData.password)) {
            setInputError(true);
            setErrorMessage(
                "Password must be at least 8 characters long, contain a number, and an uppercase letter."
            );
            return;
        }

        // Exclude confirmPassword from the data sent to the backend
        const { confirmPassword, ...dataToSubmit } = formData;

        setErrorMessage('');  // Clear error message if any
        console.log('Profile Updated', dataToSubmit);  // This is where the form data would be sent to the backend
    };

    return (
        <div className="editProfile">
            <h3>Edit Profile</h3>

            <div className="editProfileBox">
                <div className="editProfileTop">
                    <Button text={<ArrowBackIcon w={10} h={7}/>} back override />
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
                                        <Icon as={TbUpload} />
                                        <span className="upload-text">Upload Picture</span>
                                    </div>
                                </label>
                                <input 
                                    type="file" 
                                    id="profilePic" 
                                    accept="image/*"
                                    value={formData.profile} 
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
                                type="text" 
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
                                className={`input-field ${inputError ? "input-error" : ""}`}
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="input-section">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword"
                                value={formData.confirmPassword} 
                                onChange={handleInputChange} 
                                className={`input-field ${inputError ? "input-error" : ""}`}
                                placeholder="Confirm password"
                            />
                        </div>

                        {errorMessage && <div className="profile-error-message">{errorMessage}</div>}

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
