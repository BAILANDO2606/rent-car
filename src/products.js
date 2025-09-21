const products = [
	{
		id: 1,
		name: 'Koenigsegg Agera R',
		type: 'Supercar',
		image: `${process.env.PUBLIC_URL}/public/images/cars/koenigsegg/photo1.png`,
		images: [
			`${process.env.PUBLIC_URL}/public/images/cars/koenigsegg/photo1.png`,
		],
		price: {
			perDay: 99.0,
			perMonth: 2970.0,
		},
		fuelCapacity: 92,
		transmission: 'Automatic',
		capacity: 2,
		description:
			'Experience pure automotive excellence with the Koenigsegg Agera R. This hypercar represents the pinnacle of engineering and design.',
		rating: 4.9,
		reviewCount: 26,
		reviews: [
			{
				id: 1,
				author: 'Alex Johnson',
				position: 'Car Enthusiast',
				avatar: 'https://i.pravatar.cc/150?img=1',
				rating: 5,
				date: 'March 15, 2024',
				content: 'Absolutely incredible experience! The car exceeded all my expectations. The power delivery is smooth yet explosive, and the handling is precise. A true masterpiece of engineering.',
			},
			{
				id: 2,
				author: 'Sarah Williams',
				position: 'Professional Driver',
				avatar: 'https://i.pravatar.cc/150?img=2',
				rating: 5,
				date: 'March 10, 2024',
				content: "As a professional driver, I've driven many supercars, but this one stands out. The technology and performance are simply unmatched. Highly recommended for anyone seeking the ultimate driving experience.",
			}
		],
	},
	{
		id: 2,
		name: 'Nissan GT-R',
		type: 'Sports Car',
		image: `${process.env.PUBLIC_URL}/images/cars/nissan-gtr/nissan-gtr.png`,
		images: [`${process.env.PUBLIC_URL}/images/cars/nissan-gtr/nissan-gtr.png`],
		price: {
			perDay: 80.0,
			perMonth: 2400.0,
		},
		fuelCapacity: 74,
		transmission: 'Automatic',
		capacity: 4,
		description:
			'The Nissan GT-R is a high-performance sports car known for its exceptional handling and impressive power.',
		rating: 4.8,
		reviewCount: 32,
		reviews: [],
	},
	{
		id: 3,
		name: 'Porsche 911',
		type: 'Sports Car',
		image: `${process.env.PUBLIC_URL}/images/cars/porsche-911/photo1.png`,
		images: [`${process.env.PUBLIC_URL}/images/cars/porsche-911/photo1.png`],
		price: {
			perDay: 89.0,
			perMonth: 2670.0,
		},
		fuelCapacity: 64,
		transmission: 'Automatic',
		capacity: 2,
		description:
			'The iconic Porsche 911 combines luxury with performance in a perfectly balanced package.',
		rating: 4.9,
		reviewCount: 41,
		reviews: [],
	},
	{
		id: 4,
		name: 'BMW M4',
		type: 'Sports Car',
		image: `${process.env.PUBLIC_URL}/images/cars/bmw-m4/photo1.png`,
		images: [`${process.env.PUBLIC_URL}/images/cars/bmw-m4/photo1.png`],
		price: {
			perDay: 70.0,
			perMonth: 2100.0,
		},
		fuelCapacity: 59,
		transmission: 'Automatic',
		capacity: 4,
		description:
			'The BMW M4 delivers exhilarating performance with signature German engineering and luxury.',
		rating: 4.7,
		reviewCount: 28,
		reviews: [],
	},
	{
		id: 5,
		name: 'Audi RS',
		type: 'Sports Car',
		image: `${process.env.PUBLIC_URL}/images/cars/audi-rs/photo1.png`,
		images: [`${process.env.PUBLIC_URL}/images/cars/audi-rs/photo1.png`],
		price: {
			perDay: 75.0,
			perMonth: 2250.0,
		},
		fuelCapacity: 65,
		transmission: 'Automatic',
		capacity: 4,
		description:
			'The Audi RS combines sophisticated design with powerful performance and cutting-edge technology.',
		rating: 4.8,
		reviewCount: 35,
		reviews: [],
	},
	{
		id: 6,
		name: 'Mercedes-AMG GT',
		type: 'Sports Car',
		image: `${process.env.PUBLIC_URL}/images/cars/mercedes-amg/photo1.png`,
		images: [`${process.env.PUBLIC_URL}/images/cars/mercedes-amg/photo1.png`],
		price: {
			perDay: 85.0,
			perMonth: 2550.0,
		},
		fuelCapacity: 75,
		transmission: 'Automatic',
		capacity: 2,
		description:
			'The Mercedes-AMG GT represents the perfect blend of luxury and high-performance engineering.',
		rating: 4.9,
		reviewCount: 38,
		reviews: [],
	},
]

export default products
