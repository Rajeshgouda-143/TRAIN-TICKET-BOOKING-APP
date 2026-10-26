import { useState } from "react";
import "./Home.css";

const stations = [
  "Chennai Central",
  "Chennai Egmore",
  "Bengaluru City",
  "Hyderabad Deccan",
  "New Delhi",
  "Mumbai Central",
  "Howrah Junction",
  "Bhubaneswar",
  "Berhampur",
  "Visakhapatnam",
];

function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const swapStations = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Your journey, <span>made simple</span>
          </h1>

          <p>
            Search trains, plan your journey, and book your tickets with RailGo
            Lite.
          </p>
        </div>

        <form
          className="train-search-form"
          onSubmit={(event) => {
            event.preventDefault();

            if (source === destination) {
              alert("Source and destination stations cannot be the same.");
              return;
            }

            alert(`From: ${source}\nTo: ${destination}`);
          }}
        >
          <div className="search-field">
            <label htmlFor="source">From</label>
            <input
              list="station-list"
              id="source"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              placeholder="Select source station"
              required
            />
          </div>

          <button
            type="button"
            className="swap-btn"
            onClick={swapStations}
            aria-label="Swap stations"
            title="Swap stations"
          >
            ⇄
          </button>

          <div className="search-field">
            <label htmlFor="destination">To</label>
            <input
              list="station-list"
              id="destination"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Select destination station"
              required
            />
          </div>

          <datalist id="station-list">
            {stations.map((station) => (
              <option key={station} value={station} />
            ))}
          </datalist>

          <div className="search-field">
            <label htmlFor="journey-date">Journey Date</label>
            <input
              type="date"
              id="journey-date"
              min={new Date().toLocaleDateString("en-CA")}
              required
            />
          </div>

          <div className="search-field">
            <label htmlFor="travel-class">Travel Class</label>
            <select id="travel-class" defaultValue="all">
              <option value="all">All Classes</option>
              <option value="sleeper">Sleeper (SL)</option>
              <option value="3ac">AC 3 Tier (3A)</option>
              <option value="2ac">AC 2 Tier (2A)</option>
              <option value="1ac">AC First Class (1A)</option>
              <option value="chair-car">Chair Car (CC)</option>
            </select>
          </div>

          <button type="submit" className="search-btn">
            Search Trains
          </button>
        </form>
      </section>
    </main>
  );
}

export default Home;
