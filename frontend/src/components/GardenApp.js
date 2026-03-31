import React, { useEffect, useState } from "react";
import "./GardenApp.css";
import { getMessages } from "../services/apiService"
import { Link } from "react-router-dom";

function App() {
	const [flowers, setFlowers] = useState([]);

	useEffect(() => {
		const fetchFlowers = async () => {
			try {
			const data = await getMessages();
			setFlowers(data);
			} catch (error) {
			console.error("Error fetching flowers:", error);
			}
		};

		fetchFlowers();
	}, []);

	return (
		<div className="App">
		<div className="container">
			<h1>Bloom Space Garden</h1>
			<Link to="/" className="button">
				Create a Flower
			</Link>
			<div className="grid">
			{flowers.map((flower, index) => (
				<div key={index} className="card" onClick={(e) => e.currentTarget.classList.toggle("show-message")}>
				<img src={`http://localhost:8080/uploads/${flower.image_path}`} alt="Flower" />
				<p className="quote">{flower.message}</p>
				</div>
			))}
			</div>
		</div>
		</div>
	);
}

export default App;