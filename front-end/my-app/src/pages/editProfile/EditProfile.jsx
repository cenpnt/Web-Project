import React, { useState, useRef } from "react";
import { TbUpload } from "react-icons/tb";
import './EditProfile.css';  // For styling
import { Icon } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { EditIcon } from "@chakra-ui/icons";
import { CloseIcon } from "@chakra-ui/icons";
import Button from "../../components/button/Button";

function EditProfile() {
    const defaultProfilePic = "https://instagram.fbkk22-1.fna.fbcdn.net/v/t1.15752-9/423063124_412325167940689_1360113152861860307_n.png?stp=dst-png_s403x403&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_ohc=7a2feRAfE88Q7kNvgGSKS2i&_nc_ht=instagram.fbkk22-1.fna&_nc_gid=ARjrtvajyDsYhWLKO91EmuR&oh=03_Q7cD1QHfGzBu51Ig93BOro_n1PqGmgRFg5OekQaVUyae6QvQAg&oe=670E1B4A";
    const [selectedImage, setSelectedImage] = useState(defaultProfilePic);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        address: '123 Street, City',
        password: 'Johndoe1234',
        confirmPassword: '',
        profile: ''
    });
    const [isEditing, setIsEditing] = useState({
        name: false,
        address: false,
        password: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [inputError, setInputError] = useState(false);
    const [confirmPass, setConfirmPass] = useState(false);

    // Refs for each input field
    const nameInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const conPassInputRef = useRef(null);


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            conPassInputRef.current?.focus();
        }
    }

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

        if (formData.password && formData.password !== formData.confirmPassword) {
            setInputError(true);
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (formData.password && !isValidPassword(formData.password)) {
            setInputError(true);
            setErrorMessage(
                "Password must be at least 8 characters long, contain a number, and an uppercase letter."
            );
            return;
        }

        const { confirmPassword, ...dataToSubmit } = formData;

        setErrorMessage('');
        console.log('Profile Updated', dataToSubmit);
        setIsEditing({ name: false, address: false, password: false });
    };

    const toggleEdit = (field) => {
        setIsEditing((prevState) => {
            const updatedState = { ...prevState, [field]: !prevState[field] };
    
            // Use setTimeout to delay focus until after the input is enabled
            if (updatedState[field]) {
                setTimeout(() => {
                    if (field === 'name') {
                        nameInputRef.current?.focus();
                    } else if (field === 'address') {
                        addressInputRef.current?.focus();
                    } else if (field === 'password') {
                        passwordInputRef.current?.focus();
                        setConfirmPass(true);
                    }
                }, 0); // Slight delay to ensure the input is enabled
            }
    
            return updatedState;
        });
    
        if (field === 'password') setConfirmPass(false);
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
                        {/* Name Section */}
                        <div className="input-section">
                            <label htmlFor="name">Name</label>
                                <div className="input-button-section">
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        className="input-field"
                                        disabled={!isEditing.name}
                                        ref={nameInputRef} // Reference for name input
                                    />
                                <button 
                                    type="button" 
                                    onClick={() => toggleEdit('name')} 
                                    className="edit-button"
                                >
                                    {isEditing.name ? <CloseIcon/> : <EditIcon/>}
                                </button>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="input-section">
                            <label htmlFor="address">Address</label>
                            <div className="input-button-section">
                               
                                <input 
                                    type="text" 
                                    id="address" 
                                    name="address"
                                    value={formData.address} 
                                    onChange={handleInputChange} 
                                    className="input-field"
                                    disabled={!isEditing.address}
                                    ref={addressInputRef} // Reference for address input
                                />

                                <button 
                                    type="button" 
                                    onClick={() => toggleEdit('address')} 
                                    className="edit-button"
                                >
                                    {isEditing.address ? <CloseIcon/> : <EditIcon/>}
                                </button>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div className="input-section">
                            <label htmlFor="password">Password</label>
                            <div className="input-button-section">
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    value={formData.password} 
                                    onChange={handleInputChange}
                                    className={`input-field ${inputError ? "input-error" : ""}`}
                                    placeholder="Enter new password"
                                    disabled={!isEditing.password}
                                    ref={passwordInputRef} // Reference for password input
                                    onKeyDown={handleKeyPress}
                                />
                                    
                                <button 
                                    type="button" 
                                    onClick={() => toggleEdit('password')} 
                                    className="edit-button"
                                >
                                    {isEditing.password ? <CloseIcon/> : <EditIcon/>}
                                </button>
                            </div>

                            {confirmPass ?
                            <div className="confirmed-password"> 
                                <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword"
                                value={formData.confirmPassword} 
                                onChange={handleInputChange} 
                                className={`input-field ${inputError ? "input-error" : ""}`}
                                placeholder="Confirm password"
                                ref={conPassInputRef}
                                />
                            </div> :
                                <></>
                            }

                          
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
