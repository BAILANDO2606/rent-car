import React, { useState, useEffect } from 'react'
import './AuthModal.css'
import { countries } from '../data/locations'

const AuthModal = ({ onClose, onLogin, onRegister }) => {
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		country: '',
		city: '',
	})

	const [availableCities, setAvailableCities] = useState([])

	useEffect(() => {
		if (formData.country) {
			const selectedCountry = countries.find(c => c.name === formData.country)
			setAvailableCities(selectedCountry ? selectedCountry.cities : [])
			setFormData(prev => ({ ...prev, city: '' })) // Reset city when country changes
		}
	}, [formData.country])

	const handleSubmit = e => {
		e.preventDefault()
		if (isLoginMode) {
			onLogin(formData)
		} else {
			onRegister(formData)
		}
	}

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div className='auth-modal-overlay'>
			<div className='auth-modal'>
				<button className='close-button' onClick={onClose}>
					&times;
				</button>
				<h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
				<form onSubmit={handleSubmit}>
					{!isLoginMode && (
						<>
							<div className='form-group'>
								<label>Name</label>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									placeholder='Enter your name'
									required={!isLoginMode}
								/>
							</div>
							<div className='form-group'>
								<label>Country</label>
								<select
									name='country'
									value={formData.country}
									onChange={handleChange}
									required={!isLoginMode}
									className='location-select'
								>
									<option value=''>Select your country</option>
									{countries.map(country => (
										<option key={country.name} value={country.name}>
											{country.name}
										</option>
									))}
								</select>
							</div>
							{formData.country && (
								<div className='form-group'>
									<label>City</label>
									<select
										name='city'
										value={formData.city}
										onChange={handleChange}
										required={!isLoginMode}
										className='location-select'
									>
										<option value=''>Select your city</option>
										{availableCities.map(city => (
											<option key={city} value={city}>
												{city}
											</option>
										))}
									</select>
								</div>
							)}
						</>
					)}

					<div className='form-group'>
						<label>Email</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Enter your email'
							required
						/>
					</div>

					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Enter your password'
							required
						/>
					</div>

					<button type='submit' className='submit-button'>
						{isLoginMode ? 'Log In' : 'Sign Up'}
					</button>
				</form>

				<p className='switch-mode'>
					{isLoginMode
						? "Don't have an account? "
						: 'Already have an account? '}
					<button
						className='switch-button'
						onClick={() => setIsLoginMode(!isLoginMode)}
					>
						{isLoginMode ? 'Sign Up' : 'Log In'}
					</button>
				</p>
			</div>
		</div>
	)
}

export default AuthModal
