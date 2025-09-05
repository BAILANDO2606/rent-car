import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProfileMenu.css'

const ProfileMenu = ({ isLoggedIn, onViewProfile, onLoginClick, onLogout }) => {
	const navigate = useNavigate()
	return (
		<div className='profile-menu'>
			<button
				className='profile-menu-item'
				onClick={() => {
					if (isLoggedIn) {
						navigate('/profile')
					} else {
						onLoginClick()
					}
				}}
			>
				View Profile
			</button>
			{isLoggedIn ? (
				<button className='profile-menu-item logout' onClick={onLogout}>
					Log Out
				</button>
			) : (
				<button className='profile-menu-item login' onClick={onLoginClick}>
					Log In or Sign Up
				</button>
			)}
		</div>
	)
}

export default ProfileMenu
