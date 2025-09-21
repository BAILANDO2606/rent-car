import React, { createContext, useContext, useState, useEffect } from 'react'

const ProfileContext = createContext()

export const useProfile = () => {
	return useContext(ProfileContext)
}

export const ProfileProvider = ({ children }) => {
	const [profile, setProfile] = useState(() => {
		const savedProfile = localStorage.getItem('userProfile')
		return savedProfile
			? JSON.parse(savedProfile)
			: {
					name: '',
					email: '',
					phone: '',
					avatar: '',
					address: '',
					driverLicense: '',
					preferredCars: [],
			  }
	})

	useEffect(() => {
		localStorage.setItem('userProfile', JSON.stringify(profile))
	}, [profile])

	const updateProfile = newData => {
		setProfile(prev => ({
			...prev,
			...newData,
		}))
	}

	const value = {
		profile,
		updateProfile,
	}

	return (
		<ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
	)
}
