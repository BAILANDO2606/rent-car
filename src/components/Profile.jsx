import React from 'react'
import './ProfileMenu.css'

const Profile = () => {
	// Тут можна отримати дані користувача з локального сховища або контексту
	const user = JSON.parse(localStorage.getItem('user')) || {}

	return (
		<div className='profile-page'>
			<h2>My profile</h2>
			<div className='profile-info'>
				<p>
					<strong>Ім'я:</strong> {user.name || 'Невідомо'}
				</p>
				<p>
					<strong>Email:</strong> {user.email || 'Невідомо'}
				</p>
				{/* Додайте інші поля профілю */}
			</div>
		</div>
	)
}

export default Profile
