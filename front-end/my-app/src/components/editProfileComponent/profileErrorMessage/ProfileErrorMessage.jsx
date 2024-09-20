// components/ProfileErrorMessage.js
import React from 'react';

const ProfileErrorMessage = ({ message }) => {
    return message ? <div className="profile-error-message">{message}</div> : null;
};

export default ProfileErrorMessage;
