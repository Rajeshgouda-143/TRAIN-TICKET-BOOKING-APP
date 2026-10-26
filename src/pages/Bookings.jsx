
import { useState } from "react";
import "./Bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([
    {
      id: "RG101",
      trainName: "Chennai Express",
      trainNumber: "12601",
      source: "Chennai Central",
      destination: "Bengaluru City",
      date: "2026-11-05",
      passenger: "Rajesh Gouda",
      seat: "S2 - 24",
      price: 450,
      status: "Confirmed",
    },
    {
      id: "RG102",
      trainName: "Coastal Express",
      trainNumber: "18046",
      source: "Berhampur",
      destination: "Bhubaneswar",
      date: "2026-11-10",
      passenger: "Rajesh Gouda",
      seat: "S3 - 18",
      price: 250,
      status: "Confirmed",
    },
  ]);

  const cancelBooking = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirmed) {
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
    }
  };

  const viewTicket = (booking) => {
    alert(
      `Booking ID: ${booking.id}\n` +
      `Train: ${booking.trainName}\n` +
      `From: ${booking.source}\n` +
      `To: ${booking.destination}\n` +
      `Travel Date: ${booking.date}\n` +
      `Passenger: ${booking.passenger}\n` +
      `Seat: ${booking.seat}\n` +
      `Status: ${booking.status}`
    );
  };

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your train tickets in one place.</p>
      </div>

      <div className="booking-summary">
        <div className="summary-card">
          <h3>Total Bookings</h3>
          <p>{bookings.length}</p>
        </div>

        <div className="summary-card">
          <h3>Confirmed</h3>
          <p>
            {bookings.filter(
              (booking) => booking.status === "Confirmed"
            ).length}
          </p>
        </div>

        <div className="summary-card">
          <h3>Cancelled</h3>
          <p>
            {bookings.filter(
              (booking) => booking.status === "Cancelled"
            ).length}
          </p>
        </div>
      </div>

      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div className="booking-card-header">
                <div>
                  <h2>{booking.trainName}</h2>
                  <p>Train No: {booking.trainNumber}</p>
                </div>

                <span
                  className={`booking-status ${
                    booking.status === "Confirmed"
                      ? "confirmed"
                      : "cancelled"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-route">
                <div>
                  <h3>{booking.source}</h3>
                  <p>From</p>
                </div>

                <span className="route-arrow">→</span>

                <div>
                  <h3>{booking.destination}</h3>
                  <p>To</p>
                </div>
              </div>

              <div className="booking-details">
                <p>
                  <strong>Booking ID:</strong> {booking.id}
                </p>
                <p>
                  <strong>Travel Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Passenger:</strong> {booking.passenger}
                </p>
                <p>
                  <strong>Seat:</strong> {booking.seat}
                </p>
                <p>
                  <strong>Ticket Price:</strong> ₹{booking.price}
                </p>
              </div>

              <div className="booking-actions">
                <button
                  className="view-ticket-btn"
                  onClick={() => viewTicket(booking)}
                >
                  View Ticket
                </button>

                <button
                  className="cancel-booking-btn"
                  disabled={booking.status === "Cancelled"}
                  onClick={() => cancelBooking(booking.id)}
                >
                  {booking.status === "Cancelled"
                    ? "Cancelled"
                    : "Cancel Booking"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-bookings">
            <h2>No Bookings Yet</h2>
            <p>Your train bookings will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
