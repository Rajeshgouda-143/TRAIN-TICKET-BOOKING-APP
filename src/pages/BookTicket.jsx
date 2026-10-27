import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BookTicket.css";

function BookTicket() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const train = state?.train;
  const selectedTravelDate = state?.travelDate || "";

  const [passengerName, setPassengerName] = useState("");
  const [travelDate, setTravelDate] = useState(selectedTravelDate);
  const [passengerAge, setPassengerAge] = useState("");
  const [coach, setCoach] = useState("Sleeper");

  const today = new Date().toLocaleDateString("en-CA");

  const handleSubmit = (e) => {
    e.preventDefault();

    const booking = {
      id: `RG${Date.now()}`,
      trainName: train.name,
      trainNumber: train.number,
      source: train.source,
      destination: train.destination,
      departure: train.departure,
      arrival: train.arrival,
      date: travelDate,
      passenger: passengerName.trim(),
      age: Number(passengerAge),
      seat: coach,
      price: train.price,
      status: "Pending Payment",
    };

    // Go to payment before saving the booking as confirmed
    navigate("/payment", {
      state: { booking },
    });
  };

  if (!train) {
    return (
      <div className="booking-form-page">
        <h2>No train selected</h2>
        <p>Please select a train before booking your ticket.</p>
        <button onClick={() => navigate("/trains")}>Browse Trains</button>
      </div>
    );
  }

  return (
    <div className="booking-form-page">
      <div className="booking-form-card">
        <h1>Book Your Ticket</h1>
        <p className="booking-form-subtitle">
          Enter your details to book your journey.
        </p>

        <div className="selected-train">
          <h2>{train.name}</h2>
          <p>Train No. {train.number}</p>
          <p>
            {train.source} → {train.destination}
          </p>
          <p>
            {train.departure} – {train.arrival}
          </p>
          <h3>Fare: ₹{train.price}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="passengerName">Passenger Name</label>
          <input
            id="passengerName"
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            placeholder="Enter passenger name"
            required
          />

          <label htmlFor="passengerAge">Passenger Age</label>
          <input
            id="passengerAge"
            type="number"
            min="1"
            max="120"
            value={passengerAge}
            onChange={(e) => setPassengerAge(e.target.value)}
            placeholder="Enter age"
            required
          />

          <label htmlFor="travelDate">Travel Date</label>
          <input
            id="travelDate"
            type="date"
            min={today}
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            required
          />

          <label htmlFor="coach">Coach Preference</label>
          <select
            id="coach"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          >
            <option value="Sleeper">Sleeper</option>
            <option value="AC 3 Tier">AC 3 Tier</option>
            <option value="AC 2 Tier">AC 2 Tier</option>
            <option value="AC First Class">AC First Class</option>
          </select>

          <button type="submit" className="confirm-booking-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookTicket;
