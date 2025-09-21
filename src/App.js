import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { ProfileProvider } from './context/ProfileContext'
import ProductList from './components/ProductList'
import Header from './components/Header'
import Banner from './components/Banner'
import Profile from './components/Profile'
import Booking from './components/Booking'
import CarDetails from './components/CarDetails'
import Favorites from './components/Favorites'
import './App.css'

function App() {
	return (
		<FavoritesProvider>
			<ProfileProvider>
				<Router>
					<div className='App'>
						<Header />
						<main className='main-content'>
							<Routes>
								<Route
									path='/'
									element={
										<>
											<div className='banner-row'>
												<Banner
													title='The Best Platform for Car Rental'
													subtitle='Ease of doing a car rental safely and reliably. Of course at a low price.'
													image={`${process.env.PUBLIC_URL}/images/koenigsegg.png`}
													variant='primary'
												/>
												<Banner
													title='Easy way to rent a car at a low price'
													subtitle='Providing cheap car rental services and safe and comfortable facilities.'
													image={`${process.env.PUBLIC_URL}/images/nissan-gtr.png`}
													variant='secondary'
												/>
											</div>
											<ProductList />
										</>
									}
								/>
								<Route path='/profile' element={<Profile />} />
								<Route path='/car/:id' element={<CarDetails />} />
								<Route path='/booking/:id' element={<Booking />} />
								<Route path='/favorites' element={<Favorites />} />
							</Routes>
						</main>
					</div>
				</Router>
			</ProfileProvider>
		</FavoritesProvider>
	)
}

export default App
