import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { FaSearch, FaHeart, FaUser } from 'react-icons/fa'
import './Header.css'
import ProfileMenu from './ProfileMenu'
import AuthModal from './AuthModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const profileMenuRef = useRef(null)
	const navigate = useNavigate()
	const { favoritesCount } = useFavorites()

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

	const handleFavoritesClick = () => {
		navigate('/favorites')
	}

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
		navigate('/')
		toast.info('You have been logged out', {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		})
		// Відкриваємо вікно авторизації після невеликої затримки,
		// щоб користувач встиг побачити повідомлення про вихід
		setTimeout(() => {
			setIsAuthModalOpen(true)
		}, 500)
	}

	return (
		<header className='header'>
			<div className='header-container'>
				<h1
					className='logo'
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/')}
				>
					MORENT
				</h1>
				<div className='search-container'>
					<FaSearch className='search-icon' />
					<input
						type='text'
						placeholder='Search...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='search-input'
					/>
				</div>
				<nav className='nav-buttons'>
					<button
						className='icon-button'
						title='Вибрані'
						onClick={handleFavoritesClick}
					>
						<FaHeart size={20} />
						{favoritesCount > 0 && (
							<span className='favorites-count'>{favoritesCount}</span>
						)}
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
					logoutMessage={
						!isLoggedIn
							? 'Ви вийшли з аккаунту. Будь ласка, увійдіть для подальшого користування додатком.'
							: undefined
					}
				/>
			)}
			<ToastContainer />
		</header>
	)
}

export default Header
