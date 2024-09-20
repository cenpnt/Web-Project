// components/InputField.js
import React from 'react';
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import "./InputField.css"

const InputField = ({ label, value, onChange, isEditing, onSave, onToggleEdit, inputRef, onKeyDown, error, isSuccess, isPassword }) => {

    const handleToggleEdit = (e) => {
        e.preventDefault();  // Prevent the default button action (like form submission)
        onToggleEdit();  // Call the passed in onToggleEdit function
    };

    return (
        <div className="input-section">
            <label>{label}</label>
            <div className="input-button-section">
                <input
                    type={isPassword ? 'password' : 'text'}
                    className={`input-field ${isSuccess ? 'input-success' : ''} ${error ? 'input-error' : ''}`}
                    name={label.toLowerCase()} // Ensure this is set so handleInputChange updates correctly
                    value={value}
                    onChange={onChange}
                    disabled={isPassword && !isEditing}  // Disable password field only when not editing
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                />

                <div className="input-icon-section">
                    {isEditing && !isPassword && (
                        <button onClick={onSave} className="save-button"><CheckIcon /></button>
                    )}
                    <button onClick={handleToggleEdit} className="edit-button">
                        {isEditing && !isPassword ? <CloseIcon /> : <EditIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
};



export default InputField;
