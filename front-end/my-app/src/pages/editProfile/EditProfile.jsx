import React, { useState, useEffect, useRef } from "react";
import ProfilePicture from "../../components/editProfileComponent/profilePicture/ProfilePicture";
import InputField from "../../components/editProfileComponent/inputfield/InputField";
import ProfileErrorMessage from "../../components/editProfileComponent/profileErrorMessage/ProfileErrorMessage";
import { ArrowBackIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button as ChakraButton, useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import Button from "../../components/button/Button";
import "./EditProfile.css";

function EditProfile() {
    const [formData, setFormData] = useState({ username: 'name', address: 'address', password: '', profile: '' });
    const [selectedImage, setSelectedImage] = useState('');
    const [isEditing, setIsEditing] = useState({ username: false, address: false, password: false });
    const [fieldSaved, setFieldSaved] = useState({ username: false, address: false, password: false });
    const [errorMessage, setErrorMessage] = useState('');
    const [inputError, setInputError] = useState(false);
    const [conPassError, setConPassError] = useState(false);
    const [curPassError, setCurrPassError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState(''); 
    const [currentPassword, setCurrentPassword] = useState('');
    const [originalFormData, setOriginalFormData] = useState({ username: '', address: '', password: '' });


    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast(); // Add useToast hook

    const usernameInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const conPassInputRef = useRef(null);
    const curPassInputRef = useRef(null);

    const [passwordValidations, setPasswordValidations] = useState({
        hasCapitalLetter: false,
        hasNumber: false,
        hasMinLength: false,
    });

    const handlePasswordSave = (e) => {
        e.preventDefault(); // Prevent form submission
    
        // Check if the passwords match and are valid
        if (newPassword !== confirmPassword) {
            setConPassError(true);
            setErrorMessage('Passwords do not match');
            return; // Do not close the modal
        }
        
        if (!validatePassword(newPassword)) {
            setInputError(true);
            setErrorMessage('Password must contain at least 8 characters, a capital letter, and a number.');
            return; // Do not close the modal
        }
    
        // If everything is valid, save the password and close the modal
        // setFormData.passwor
        saveFieldChange('password', e);
        onClose(); // Only close the modal if there are no errors
    };
    

    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            try {
                const response = await fetch(`http://localhost:8000/user/data/${userID}`);
                const data = await response.json();
                setFormData((prevData) => ({ 
                    ...prevData,
                    username: data.username, 
                    address: data.address, 
                    profile: data.profile,
                    password: prevData.password, 
                }));
                setSelectedImage(data.profile);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            uploadProfilePicture(reader.result);
        }
    };

    const uploadProfilePicture = async (imageData) => {
        try {
            const response = await fetch('/api/upload/profile-pic', {
                method: 'POST',
                body: JSON.stringify({ image: imageData }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                toast({
                    title: 'Profile picture updated successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        marginTop: '170px', // Adjust this value to move it closer to the center
                    }
                });
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image', error);
            toast({
                title: 'Failed to upload profile picture.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
                containerStyle: {
                    marginTop: '170px', // Adjust this value to move it closer to the center
                }
            });
        }
    };

    const validatePassword = (password) => {
        const hasCapitalLetter = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasMinLength = password.length >= 8;

        return hasCapitalLetter && hasNumber && hasMinLength;
    };

    
      
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Handle username and address fields
        if (name === 'username' || name === 'address') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    
        // Handle password field and validation
        if (name === 'password') {
            setNewPassword(value);
            // Validate password and update state
            const validations = {
                hasCapitalLetter: /[A-Z]/.test(value),
                hasNumber: /\d/.test(value),
                hasMinLength: value.length >= 8,
            };
            setPasswordValidations(validations);
    
            if (!Object.values(validations).every(Boolean)) {
                setInputError(true);
                setErrorMessage('Password must contain at least 8 characters, a capital letter, and a number.');
            } else {
                setInputError(false);
                setErrorMessage('');
            }
        }
    
        // Handle current password field
        if (name === 'currentPassword') {
            setCurrentPassword(value);
        }
    
        // Handle confirm password field
        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };
    
    const saveFieldChange = async (fieldName, e) => {
        e.preventDefault();

        if (fieldName === 'password') {
            const isCurrentPasswordValid = await checkCurrentPassword();  // await the checkCurrentPassword result
            const isPasswordValid = validatePassword(newPassword);
    
            if (isCurrentPasswordValid && isPasswordValid) {
                setCurrentPassword(''); 
                setConfirmPassword('');
                setFormData((prevData) => ({ ...prevData, password: newPassword })); 
                setNewPassword('');
                console.log("Password updated to:", newPassword);
            } else {
                // handle the error cases here
                console.log("Password update condition failed");
                return;
            }
        }

        const fieldValue = formData[fieldName];
        const userID = localStorage.getItem('userID');
        try {
            const response = await fetch(`http://localhost:8000/edit_profile/${userID}`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    fieldName: fieldName,
                    newValue: fieldValue
                 }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                toast({
                    title: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated successfully.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                    containerStyle: {
                        marginTop: '170px', // Adjust this value to move it closer to the center
                    }
                });
                setFieldSaved((prevState) => ({ ...prevState, [fieldName]: true }));
                setTimeout(() => {
                    setFieldSaved((prevState) => ({ ...prevState, [fieldName]: false }));
                }, 10000);
                setIsEditing((prevState) => ({ ...prevState, [fieldName]: false }));
            } else {
                throw new Error(`Failed to update ${fieldName}`);
            }
        } catch (error) {
            console.error(`Error updating ${fieldName}`, error);
            toast({
                title: `Failed to update ${fieldName}.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
                containerStyle: {
                    marginTop: '170px', // Adjust this value to move it closer to the center
                }
            });

            // Revert to original value on failure
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: originalFormData[fieldName],
            }));
        }
    };

    const toggleEdit = (field) => {
        setIsEditing((prevState) => {
            const updatedState = { ...prevState, [field]: !prevState[field] };
            if (updatedState[field]) {
                // Capture the original value before editing starts
                setOriginalFormData((prevData) => ({
                    ...prevData,
                    [field]: formData[field],
                }));
                setTimeout(() => {
                    if (field === 'username') usernameInputRef.current?.focus();
                    else if (field === 'address') addressInputRef.current?.focus();
                    else if (field === 'password') passwordInputRef.current?.focus();
                }, 0);
            }
            return updatedState;
        });
    
        if (field === 'password') {
            setConfirmPassword('');
        }
    };
    

    const checkCurrentPassword = async () => {
        console.log(currentPassword);
        const userID = localStorage.getItem("userID");
        try {
            const response = await fetch(`http://localhost:8000/edit_profile/check_password/${userID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: currentPassword
                })
            });
            if(!response.ok) {
                setCurrPassError(true);
                setErrorMessage('Incorrect Password');
                return false;

            } else {
                setCurrPassError(false);
                setErrorMessage('');
                return true;
            }

        } catch (error) {
            console.error("Error checking current password", error)
        }
        // if (currentPassword !== formData.password) {
            
        // } 
        // return currentPassword !== formData.password;
    }


    const handleKeyDown = (field, e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (field === 'password') {
                conPassInputRef.current?.focus();
            } else if (field === 'confirmPassword') {
                saveFieldChange('password', e);
            } else if (field === 'currentPassword') {
                if (checkCurrentPassword() === false) {
                    passwordInputRef.current?.focus();
                }
                
            } else {
                toggleEdit(field);
                saveFieldChange(field, e);
            }
        }
    };

    return (
        <div className="editProfile">
            <h3>Edit Profile</h3>
            <div className="editProfileBox">
                <div className="editProfileTop">
                    <Button text={<ArrowBackIcon w={10} h={7} />} back override />
                </div>

                <form>
                    <div className="editProfileLeft">
                        <ProfilePicture selectedImage={selectedImage} onImageChange={handleImageChange} />
                    </div>

                    <div className="editprofileRight">
                        <InputField
                            label="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            isEditing={isEditing.username}
                            onSave={(e) => saveFieldChange('username', e)}
                            onToggleEdit={() => toggleEdit('username')}
                            inputRef={usernameInputRef}
                            onKeyDown={(e) => handleKeyDown('username', e)}
                            isSuccess={fieldSaved.username}
                            isPassword={false}
                            originalValue={originalFormData.username}
                        />

                        <InputField
                            label="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            isEditing={isEditing.address}
                            onSave={(e) => saveFieldChange('address', e)}
                            onToggleEdit={() => toggleEdit('address')}
                            inputRef={addressInputRef}
                            onKeyDown={(e) => handleKeyDown('address', e)}
                            isSuccess={fieldSaved.address}
                            isPassword={false}
                            originalValue={originalFormData.address}
                        />
                        <InputField
                            label="Password"
                            value={formData.password} // Show masked password (8 dots as a placeholder)
                            isEditing={false} 
                            onToggleEdit={() => {
                                onOpen();  
                            }}
                            isPassword={true}
                            isSuccess={fieldSaved.password}
                            originalValue={originalFormData.password}
                        />
                    </div>
                </form>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Password</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className="input-section">
                                <label htmlFor="currentPassword">Current Password</label>
                                <div className="input-button-section">
                                    <input 
                                        type="password" 
                                        id="currentPassword" 
                                        name="currentPassword"
                                        value={currentPassword} 
                                        onChange={handleInputChange}
                                        className={`input-field ${curPassError ? "input-error" : ""}`}
                                        placeholder="Enter current password"
                                        ref={curPassInputRef} 
                                        onKeyDown={(e) => handleKeyDown('currentPassword', e)}
                                        onBlur={() => checkCurrentPassword()}
                                    />
                                </div>
                            </div>
                            <div className="input-section">
                                <label htmlFor="newPassword">New Password</label>
                                <div className="input-button-section">
                                    <input 
                                        type="password" 
                                        id="newPassword" 
                                        name="password"
                                        value={newPassword}
                                        onChange={handleInputChange}
                                        className={`input-field ${inputError ? "input-error" : ""}`}
                                        placeholder="Enter new password"
                                        ref={passwordInputRef} 
                                        onKeyDown={(e) => handleKeyDown('password', e)} 
                                    />
                                </div>
                            </div>
                            <div className="password-validation">
                                <div className="validation-item">
                                    {passwordValidations.hasMinLength ? (
                                        <CheckIcon color="green.500" />
                                    ) : (
                                        <CloseIcon color="red.500" />
                                    )}
                                    <span>At least 8 characters</span>
                                </div>
                                <div className="validation-item">
                                    {passwordValidations.hasCapitalLetter ? (
                                        <CheckIcon color="green.500" />
                                    ) : (
                                        <CloseIcon color="red.500" />
                                    )}
                                    <span>At least one capital letter</span>
                                </div>
                                <div className="validation-item">
                                    {passwordValidations.hasNumber ? (
                                        <CheckIcon color="green.500" />
                                    ) : (
                                        <CloseIcon color="red.500" />
                                    )}
                                    <span>At least one number</span>
                                </div>
                            </div>
                            <div className="input-section">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-button-section">
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        name="confirmPassword"
                                        value={confirmPassword} 
                                        onChange={handleInputChange}
                                        className={`input-field ${conPassError ? "input-error" : ""}`}
                                        placeholder="Confirm new password"
                                        ref={conPassInputRef} 
                                        onKeyDown={(e) => handleKeyDown('confirmPassword', e)} 
                                    />
                                </div>
                            </div>
                            <ProfileErrorMessage message={errorMessage} />
                        </ModalBody>


                        <ModalFooter>
                        <ChakraButton 
                            colorScheme="orange" 
                            mr={3} 
                            onClick={handlePasswordSave} 
                            disabled={currentPassword === '' || newPassword === '' || confirmPassword === ''}
                        >
                            Save
                        </ChakraButton>

                            <ChakraButton variant="ghost"  colorScheme="orange" onClick={onClose}>Cancel</ChakraButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}

export default EditProfile;
