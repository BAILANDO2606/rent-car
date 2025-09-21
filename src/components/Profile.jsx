import React, { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import './Profile.css'

const Profile = () => {
	const profileContext = useProfile()
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState(() => {
		return (
			profileContext?.profile || {
				name: '',
				email: '',
				phone: '',
				avatar: '',
				address: '',
				driverLicense: '',
			}
		)
	})

	// Update formData when profile changes
	React.useEffect(() => {
		if (profileContext?.profile) {
			setFormData(profileContext.profile)
		}
	}, [profileContext?.profile])

	if (!profileContext) {
		return (
			<div className='profile-container'>
				<h2>Error</h2>
				<p>
					Profile context is not available. Please make sure ProfileProvider is
					properly set up.
				</p>
			</div>
		)
	}

	const { profile, updateProfile } = profileContext

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()
		updateProfile(formData)
		setIsEditing(false)
	}

	const handleAvatarChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData(prev => ({
					...prev,
					avatar: reader.result,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	if (isEditing) {
		return (
			<div className='profile-container'>
				<h2>Edit Profile</h2>
				<form onSubmit={handleSubmit} className='profile-form'>
					<div className='avatar-section'>
						<img
							src={
								formData.avatar ||
								`${process.env.PUBLIC_URL}/images/default-avatar.png`
							}
							alt='Profile'
							className='profile-avatar'
						/>
						<input
							type='file'
							accept='image/*'
							onChange={handleAvatarChange}
							className='avatar-input'
						/>
					</div>

					<div className='form-group'>
						<label>Name:</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Email:</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Phone:</label>
						<input
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<label>Address:</label>
						<input
							type='text'
							name='address'
							value={formData.address}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<label>Driver License Number:</label>
						<input
							type='text'
							name='driverLicense'
							value={formData.driverLicense}
							onChange={handleChange}
						/>
					</div>

					<div className='form-actions'>
						<button type='submit' className='save-button'>
							Save Changes
						</button>
						<button
							type='button'
							className='cancel-button'
							onClick={() => {
								setFormData(profile)
								setIsEditing(false)
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		)
	}

	return (
		<div className='profile-container'>
			<div className='profile-header'>
				<h2>My Profile</h2>
				<button className='edit-button' onClick={() => setIsEditing(true)}>
					Edit Profile
				</button>
			</div>

			<div className='profile-info'>
				<img
					src={
						profile.avatar ||
						`${process.env.PUBLIC_URL}/images/default-avatar.png`
					}
					alt='Profile'
					className='profile-avatar'
				/>

				<div className='info-group'>
					<label>Name:</label>
					<p>{profile.name || 'Not set'}</p>
				</div>

				<div className='info-group'>
					<label>Email:</label>
					<p>{profile.email || 'Not set'}</p>
				</div>

				<div className='info-group'>
					<label>Phone:</label>
					<p>{profile.phone || 'Not set'}</p>
				</div>

				<div className='info-group'>
					<label>Address:</label>
					<p>{profile.address || 'Not set'}</p>
				</div>

				<div className='info-group'>
					<label>Driver License:</label>
					<p>{profile.driverLicense || 'Not set'}</p>
				</div>
			</div>
		</div>
	)
}

export default Profile
