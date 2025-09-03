import React from 'react';
import './ProfileMenu.css';

const ProfileMenu = ({ isLoggedIn, onViewProfile, onLoginClick, onLogout }) => {
    return (
        <div className="profile-menu">
            <button 
                className="profile-menu-item" 
                onClick={onViewProfile}
            >
                View Profile
            </button>
            {isLoggedIn ? (
                <button 
                    className="profile-menu-item logout" 
                    onClick={onLogout}
                >
                    Log Out
                </button>
            ) : (
                <button 
                    className="profile-menu-item login" 
                    onClick={onLoginClick}
                >
                    Log In or Sign Up
                </button>
            )}
        </div>
    );
};

export default ProfileMenu;
