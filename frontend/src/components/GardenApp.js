import React, { useEffect, useState } from "react";
import "./GardenApp.css";

function App() {
  const [flowers, setFlowers] = useState([]);
  const [welcomeVisible, setWelcomeVisible] = useState(true);

  useEffect(() => {
    // Hide the welcome message after 3 minutes
    const welcomeTimeout = setTimeout(() => {
      setWelcomeVisible(false);
    }, 180000); // 3 minutes in milliseconds

    // Parse query parameters
    const params = new URLSearchParams(window.location.search);
    const image = params.get("image");
    const message = params.get("message");

    if (image && message) {
      addFlower({ image, message });
    }

    // Example flowers for testing
    const exampleFlowers = [
      { image: "https://via.placeholder.com/200", message: "Stay positive!" },
      { image: "https://via.placeholder.com/200", message: "Keep blooming!" },
    ];
    setFlowers((prev) => [...exampleFlowers, ...prev]);

    return () => clearTimeout(welcomeTimeout); // Cleanup timeout on unmount
  }, []);

  // Add a new flower to the grid
  const addFlower = (flower) => {
    setFlowers((prev) => [flower, ...prev]); // Add new flower to the top
  };

  return (
    <div className="App">
      {welcomeVisible && <div className="welcome">Welcome to Bloom Space Garden</div>}

      <div className="container">
        <h1>Bloom Space Garden</h1>
        <a href="create-flower.html" className="button">
          Create a Flower
        </a>
        <div className="grid">
          {flowers.map((flower, index) => (
            <div key={index} className="card" onClick={(e) => e.currentTarget.classList.toggle("show-message")}>
              <img src={flower.image} alt="Flower" />
              <p className="quote">{flower.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;