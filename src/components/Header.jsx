import React, { useState, useRef, useEffect } from 'react'
import { FaSearch, FaHeart, FaUser } from 'react-icons/fa'
import './Header.css'
import ProfileMenu from './ProfileMenu'
import AuthModal from './AuthModal'

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const profileMenuRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target)
			) {
				setIsProfileMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleLogin = formData => {
		// Тут буде логіка для входу
		console.log('Login:', formData)
		setIsLoggedIn(true)
		setIsAuthModalOpen(false)
	}

	const handleRegister = formData => {
		// Тут буде логіка для реєстрації
		console.log('Register:', formData)
		setIsLoggedIn(true)
		setIsAuthModalOpen(false)
	}

	const handleLogout = () => {
		setIsLoggedIn(false)
		setIsProfileMenuOpen(false)
	}

	return (
		<header className='header'>
			<div className='header-container'>
				{/* Logo */}
				<h1 className='logo'>MORENT</h1>

				{/* Search Bar */}
				<div className='search-container'>
					<FaSearch className='search-icon' />
					<input
						type='text'
						placeholder='Пошук автомобіля...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='search-input'
					/>
				</div>

				{/* Navigation */}
				<nav className='nav-buttons'>
					<button className='icon-button' title='Вибрані'>
						<FaHeart size={20} />
					</button>
					<div className='profile-menu-container' ref={profileMenuRef}>
						<button
							className='icon-button'
							title='Профіль'
							onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
						>
							<FaUser size={20} />
						</button>
						{isProfileMenuOpen && (
							<ProfileMenu
								isLoggedIn={isLoggedIn}
								onViewProfile={() =>
									!isLoggedIn
										? setIsAuthModalOpen(true)
										: console.log('View profile')
								}
								onLoginClick={() => setIsAuthModalOpen(true)}
								onLogout={handleLogout}
							/>
						)}
					</div>
				</nav>
			</div>

			{isAuthModalOpen && (
				<AuthModal
					onClose={() => setIsAuthModalOpen(false)}
					onLogin={handleLogin}
					onRegister={handleRegister}
				/>
			)}
		</header>
	)
}

export default Header
