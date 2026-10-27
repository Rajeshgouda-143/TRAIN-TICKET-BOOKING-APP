
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const today = new Date().toLocaleDateString("en-CA");

  const handleSearch = (e) => {
    e.preventDefault();

    navigate("/trains", {
      state: {
        source: source.trim(),
        destination: destination.trim(),
        travelDate,
      },
    });
  };

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">
            YOUR JOURNEY, YOUR WAY
          </span>

          <h1>
            Every Journey
            <br />
            Begins with <span>RailGo</span>
          </h1>

          <p>
            Discover routes, explore destinations, and plan your
            next train journey with ease.
          </p>

          <button
            className="explore-trains-btn"
            onClick={() => navigate("/trains")}
          >
            Explore Trains →
          </button>
        </div>

        <div className="home-hero-decoration" aria-hidden="true">
          <span>🚆</span>
        </div>
      </section>

      {/* Train Search Section */}
      <section className="home-search-section">
        <div className="home-section-heading">
          <span>PLAN YOUR TRIP</span>
          <h2>Where would you like to go?</h2>
          <p>Search for your next train journey.</p>
        </div>

        <form className="home-search-form" onSubmit={handleSearch}>
          <div className="home-form-field">
            <label htmlFor="source">From</label>
            <input
              id="source"
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Departure station"
              required
            />
          </div>

          <div className="home-form-field">
            <label htmlFor="destination">To</label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination station"
              required
            />
          </div>

          <div className="home-form-field">
            <label htmlFor="travel-date">Journey Date</label>
            <input
              id="travel-date"
              type="date"
              min={today}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
            />
          </div>

          <button className="home-search-btn" type="submit">
            Search Trains
          </button>
        </form>
      </section>

      {/* Popular Routes */}
      <section className="home-popular-section">
        <div className="home-section-heading">
          <span>GET INSPIRED</span>
          <h2>Popular Routes</h2>
          <p>Choose a route and start planning your journey.</p>
        </div>

        <div className="popular-route-grid">
          <button
            className="popular-route-card"
            onClick={() => {
              setSource("Chennai Central");
              setDestination("Bengaluru City");
              navigate("/trains", {
                state: {
                  source: "Chennai Central",
                  destination: "Bengaluru City",
                },
              });
            }}
          >
            <span className="route-icon">🌆</span>
            <h3>Chennai → Bengaluru</h3>
            <p>Explore trains between these cities</p>
            <span className="route-link">Explore route →</span>
          </button>

          <button
            className="popular-route-card"
            onClick={() => {
              setSource("Berhampur");
              setDestination("Bhubaneswar");
              navigate("/trains", {
                state: {
                  source: "Berhampur",
                  destination: "Bhubaneswar",
                },
              });
            }}
          >
            <span className="route-icon">🌿</span>
            <h3>Berhampur → Bhubaneswar</h3>
            <p>Explore trains between these cities</p>
            <span className="route-link">Explore route →</span>
          </button>

          <button
            className="popular-route-card"
            onClick={() => {
              setSource("Chennai Central");
              setDestination("Hyderabad Deccan");
              navigate("/trains", {
                state: {
                  source: "Chennai Central",
                  destination: "Hyderabad Deccan",
                },
              });
            }}
          >
            <span className="route-icon">🏙️</span>
            <h3>Chennai → Hyderabad</h3>
            <p>Explore trains between these cities</p>
            <span className="route-link">Explore route →</span>
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="home-features-section">
        <div className="home-section-heading">
          <span>WHY RAILGO LITE?</span>
          <h2>A simpler way to plan your journey</h2>
        </div>

        <div className="home-features-grid">
          <div className="home-feature-card">
            <span>🔎</span>
            <h3>Find Your Train</h3>
            <p>Explore the sample trains available in your app.</p>
          </div>

          <div className="home-feature-card">
            <span>🎫</span>
            <h3>Manage Bookings</h3>
            <p>View your saved demo bookings in one place.</p>
          </div>

          <div className="home-feature-card">
            <span>🍽️</span>
            <h3>Explore Meals</h3>
            <p>Browse food options available in the demo menu.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta">
        <h2>Your next adventure is waiting.</h2>
        <p>Start exploring routes and plan your next journey.</p>
        <button onClick={() => navigate("/trains")}>
          Find Your Train →
        </button>
      </section>
    </main>
  );
}

export default Home;
