
import { useState } from "react";
import "./PNRStatus.css";

function PNRStatus() {
  const [pnr, setPnr] = useState("");
  const [booking, setBooking] = useState(null);
  const [searched, setSearched] = useState(false);

  const checkPNR = (e) => {
    e.preventDefault();

    setSearched(true);

    const savedBookings = JSON.parse(
      localStorage.getItem("railgoBookings") || "[]"
    );

    const foundBooking = savedBookings.find(
      (item) =>
        String(item.pnr || item.id).toLowerCase() ===
        pnr.trim().toLowerCase()
    );

    setBooking(foundBooking || null);
  };

  return (
    <div className="pnr-page">
      <div className="pnr-header">
        <span className="pnr-eyebrow">RAILGO LITE</span>
        <h1>Check PNR Status</h1>
        <p>
          Check the status of your demo train booking in one place.
        </p>
      </div>

      <div className="pnr-search-card">
        <div className="pnr-icon">🎫</div>

        <h2>Enter Your Booking ID or PNR</h2>
        <p>Enter the ID shown on your RailGo Lite ticket.</p>

        <form onSubmit={checkPNR}>
          <label htmlFor="pnr-number">Booking ID / PNR Number</label>

          <input
            id="pnr-number"
            type="text"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            placeholder="e.g. RG123456789"
            required
          />

          <button type="submit">Check Status</button>
        </form>

        {searched && !booking && (
          <div className="pnr-error">
            No booking found. Please check your ID and try again.
          </div>
        )}
      </div>

      {booking && (
        <div className="pnr-result-card">
          <div className="pnr-result-header">
            <div>
              <span>BOOKING ID</span>
              <h2>{booking.id}</h2>
            </div>

            <span
              className={`pnr-status-badge ${
                booking.status === "Confirmed"
                  ? "pnr-confirmed"
                  : "pnr-cancelled"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="pnr-train-info">
            <h3>{booking.trainName}</h3>
            <p>Train Number: {booking.trainNumber}</p>
          </div>

          <div className="pnr-route">
            <div>
              <span>FROM</span>
              <h3>{booking.source}</h3>
              <p>{booking.departure}</p>
            </div>

            <div className="pnr-route-arrow">→</div>

            <div>
              <span>TO</span>
              <h3>{booking.destination}</h3>
              <p>{booking.arrival}</p>
            </div>
          </div>

          <div className="pnr-details">
            <div>
              <span>Passenger</span>
              <strong>{booking.passenger}</strong>
            </div>

            <div>
              <span>Travel Date</span>
              <strong>{booking.date}</strong>
            </div>

            <div>
              <span>Coach / Seat Preference</span>
              <strong>{booking.seat || "Not assigned"}</strong>
            </div>

            <div>
              <span>Fare</span>
              <strong>₹{booking.price}</strong>
            </div>
          </div>

          <p className="pnr-demo-note">
            This is demo booking information, not a live railway PNR
            enquiry.
          </p>
        </div>
      )}
    </div>
  );
}

export default PNRStatus;
