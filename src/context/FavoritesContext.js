import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
	const [favoritesCount, setFavoritesCount] = useState(0)

	// Оновлюємо кількість при першому завантаженні
	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		setFavoritesCount(favorites.length)
	}, [])

	// Функція для оновлення кількості обраних
	const updateFavoritesCount = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		setFavoritesCount(favorites.length)
	}

	return (
		<FavoritesContext.Provider value={{ favoritesCount, updateFavoritesCount }}>
			{children}
		</FavoritesContext.Provider>
	)
}

export function useFavorites() {
	return useContext(FavoritesContext)
}
