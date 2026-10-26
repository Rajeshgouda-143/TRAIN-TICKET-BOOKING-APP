
import { useState } from "react";
import "./Trains.css";

function Trains() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

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

  const filteredTrains = trains.filter((train) => {
    const matchesSource =
      source === "" ||
      train.source.toLowerCase().includes(source.toLowerCase());

    const matchesDestination =
      destination === "" ||
      train.destination
        .toLowerCase()
        .includes(destination.toLowerCase());

    return matchesSource && matchesDestination;
  });

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

              <button
                onClick={() =>
                  alert("Booking functionality will be added next.")
                }
              >
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
