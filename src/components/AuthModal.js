import React, { useState, useEffect } from 'react'
import './AuthModal.css'
import {
	fetchCountries,
	fetchCitiesForCountry,
} from '../services/locationService'
import CustomSelect from './CustomSelect'

const AuthModal = ({ onClose, onLogin, onRegister }) => {
	const [isLoginMode, setIsLoginMode] = useState(true)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		country: '',
		city: '',
	})

	const [countries, setCountries] = useState([])
	const [availableCities, setAvailableCities] = useState([])
	const [isLoadingCities, setIsLoadingCities] = useState(false)
	const [isLoadingCountries, setIsLoadingCountries] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const loadCountries = async () => {
			try {
				setError(null)
				const countriesList = await fetchCountries()
				setCountries(countriesList)
			} catch (err) {
				setError('Failed to load countries. Please try again later.')
			} finally {
				setIsLoadingCountries(false)
			}
		}
		loadCountries()
	}, [])

	useEffect(() => {
		const loadCities = async () => {
			if (formData.country) {
				try {
					setError(null)
					setIsLoadingCities(true)
					const cities = await fetchCitiesForCountry(formData.country)
					setAvailableCities(cities)
				} catch (err) {
					setError('Failed to load cities. Please try again later.')
				} finally {
					setIsLoadingCities(false)
				}
			} else {
				setAvailableCities([])
			}
		}
		loadCities()
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
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
			...(name === 'country' ? { city: '' } : {}),
		}))
	}

	return (
		<div
			className='auth-modal-overlay'
			onClick={e => e.target.className === 'auth-modal-overlay' && onClose()}
		>
			<div className='auth-modal'>
				<button className='close-button' onClick={onClose}>
					&times;
				</button>
				<h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>

				{error && <div className='error-message'>{error}</div>}

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
								<CustomSelect
									options={countries.map(country => ({
										value: country.name,
										label: country.name,
									}))}
									value={formData.country}
									onChange={value =>
										handleChange({
											target: { name: 'country', value },
										})
									}
									placeholder='Select your country'
									isLoading={isLoadingCountries}
									disabled={isLoadingCountries}
								/>
							</div>
							{formData.country && (
								<div className='form-group'>
									<label>City</label>
									<CustomSelect
										options={availableCities.map(city => ({
											value: city,
											label: city,
										}))}
										value={formData.city}
										onChange={value =>
											handleChange({
												target: { name: 'city', value },
											})
										}
										placeholder='Select your city'
										isLoading={isLoadingCities}
										disabled={isLoadingCities}
									/>
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
