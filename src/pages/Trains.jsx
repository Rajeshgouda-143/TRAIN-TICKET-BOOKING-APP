import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Trains.css";

function Trains() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive search details from the Home Page
  const searchData = location.state || {};

  const [source, setSource] = useState(searchData.source || "");
  const [destination, setDestination] = useState(
    searchData.destination || ""
  );
  const [travelDate, setTravelDate] = useState(
    searchData.travelDate || ""
  );

  const trains = [
    {
      id: 1,
      name: "Chennai Express",
      number: "12601",
      source: "Chennai Central",
      destination: "Bengaluru City",
      departure: "06:00 AM",
      arrival: "11:00 AM",
      price: 450,
    },
    {
      id: 2,
      name: "Coastal Express",
      number: "18046",
      source: "Berhampur",
      destination: "Bhubaneswar",
      departure: "08:30 AM",
      arrival: "12:00 PM",
      price: 250,
    },
    {
      id: 3,
      name: "Duronto Express",
      number: "12245",
      source: "Chennai Central",
      destination: "Hyderabad Deccan",
      departure: "07:00 PM",
      arrival: "06:00 AM",
      price: 750,
    },
  ];

  // Filter trains by source and destination
  const filteredTrains = trains.filter((train) => {
    const matchesSource =
      source.trim() === "" ||
      train.source.toLowerCase().includes(source.trim().toLowerCase());

    const matchesDestination =
      destination.trim() === "" ||
      train.destination
        .toLowerCase()
        .includes(destination.trim().toLowerCase());

    return matchesSource && matchesDestination;
  });

  const handleBookTicket = (train) => {
    navigate("/book-ticket", {
      state: {
        train,
        travelDate,
      },
    });
  };

  return (
    <div className="trains-page">
      <h1>Available Trains</h1>
      <p>Find a train for your journey.</p>

      <div className="train-filters">
        <input
          type="text"
          placeholder="From station"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />

        <input
          type="text"
          placeholder="To station"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />

        <input
          type="date"
          value={travelDate}
          min={new Date().toLocaleDateString("en-CA")}
          onChange={(event) => setTravelDate(event.target.value)}
          aria-label="Travel date"
        />
      </div>

      <div className="train-list">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <div className="train-card" key={train.id}>
              <h2>{train.name}</h2>
              <p>Train Number: {train.number}</p>

              <div className="train-route">
                <div>
                  <strong>{train.departure}</strong>
                  <p>{train.source}</p>
                </div>

                <span>→</span>

                <div>
                  <strong>{train.arrival}</strong>
                  <p>{train.destination}</p>
                </div>
              </div>

              <p>Starting price: ₹{train.price}</p>

              <button onClick={() => handleBookTicket(train)}>
                Book Ticket
              </button>
            </div>
          ))
        ) : (
          <p>No trains found for your search.</p>
        )}
      </div>
    </div>
  );
}

export default Trains;