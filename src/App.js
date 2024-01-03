import React, {
	useState,
	useEffect,
} from "react";
import "./Style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./Componants/RatingStars";
import ShoppingCart from "./Componants/ShoppingCart";

const products = [
	{
		id: 1,
		name: "Sony Headphones",
		rating: 4.3,
		description:
			"Sony WH-XB910N Extra BASS Noise Cancellation Headphones Wireless Bluetooth Over The Ear Headset with Mic, Alexa Voice Control, Google Fast Pair, AUX & Swift Pair, 30Hrs Battery",
		price: 101,
		image: require("./Images/product-1.png"),
	},
	{
		id: 2,
		name: "Samsung Smart LED",
		rating: 4.2,
		description:
			"Samsung 108 cm (43 Inches) Crystal Vision 4K Ultra HD Smart LED TV UA43CUE70AKLXL (Titan Gray)",
		price: 299,
		image: require("./Images/product-2.png"),
	},
	{
		id: 3,
		name: "Samsung Galaxy",
		rating: 3.2,
		description:
			"Samsung Galaxy A05 (Black, 4GB, 64GB Storage) | 50 MP Main Camera | Upto 8GB RAM with RAM Plus | MediaTek Helio G85 | 5000 mAh Battery",
		price: 149,
		image: require("./Images/product-3.png"),
	},
	{
		id: 4,
		name: "JBL Soundbar",
		rating: 4.8,
		description:
			"JBL Cinema SB241, Dolby Digital Soundbar with Wired Subwoofer for Extra Deep Bass, 2.1 Channel Home Theatre with Remote, HDMI ARC, Bluetooth & Optical Connectivity (110W)",
		price: 120,
		image: require("./Images/product-4.png"),
	},
	{
		id: 5,
		name: "Whirlpool 240 L Refrigerator",
		rating: 4.5,
		description:
			"Whirlpool 240 L Frost Free Triple-Door Refrigerator (FP 263D PROTTON ROY ARCTIC STEEL(N).",
		price: 285,
		image: require("./Images/product-5.png"),
	},
	{
		id: 6,
		name: "LG 7 Kg Washing Machine",
		rating: 3.8,
		description:"LG 7 Kg 5 Star Inverter TurboDrum Fully Automatic Top Loading Washing Machine (T70SKSF1Z, Waterfall Circulation, Smart Motion, Middle Free Silver)",
		price: 149,
		image: require("./Images/product-6.png"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Logo</h3>
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<button className="btn">
									Detail
								</button>
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;