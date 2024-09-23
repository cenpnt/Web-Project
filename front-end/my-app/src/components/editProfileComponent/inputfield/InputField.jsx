import React from 'react';
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import "./InputField.css";

const InputField = ({ label, value, onChange, isEditing, onSave, onToggleEdit, inputRef, onKeyDown, error, isSuccess, isPassword, originalValue }) => {
    
    // When Save or Cancel is clicked, stop editing the field
    const handleSave = (e) => {
        onSave(e);
        onToggleEdit();  // Stop editing when saved
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onChange({ target: { name: label.toLowerCase(), value: originalValue } });  // Reset to original value
        onToggleEdit();  // Stop editing when canceled
    };
    

    const handleToggleEdit = (e) => {
        e.preventDefault();  // Prevent the default button action (like form submission)
        onToggleEdit();  // Toggle the editing state
    };

    return (
        <div className="input-section">
            <label>{label}</label>
            <div className="input-button-section">
                <input
                    type={isPassword ? 'password' : 'text'}
                    className={`input-field ${isSuccess ? 'input-success' : ''} ${error ? 'input-error' : ''}`}
                    name={label.toLowerCase()}  // Ensure this is set so handleInputChange updates correctly
                    value={value}
                    onChange={onChange}
                    disabled={!isEditing}  // Disable field when not in editing mode
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                />

                <div className="input-icon-section">
                    {isEditing && (
                        <>
                            <button onClick={handleSave} className="save-button"><CheckIcon /></button>
                            <button onClick={handleCancel} className="edit-button"><CloseIcon /></button>
                        </>
                    )}
                    {!isEditing && (
                        <button onClick={handleToggleEdit} className="edit-button">
                            <EditIcon />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputField;
