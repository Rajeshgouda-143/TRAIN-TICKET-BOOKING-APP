
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";

function Bookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("railgoBookings") || "[]",
      );
      return Array.isArray(savedBookings) ? savedBookings : [];
    } catch {
      return [];
    }
  });

  const isCancelled = (booking) =>
    String(booking.status || "").toLowerCase() === "cancelled";

  const cancelBooking = (id) => {
    const booking = bookings.find((item) => item.id === id);

    if (!booking || isCancelled(booking)) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    const updatedBookings = bookings.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item,
    );

    localStorage.setItem("railgoBookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const viewTicket = (booking) => {
    if (isCancelled(booking)) return;
    navigate(`/ticket/${booking.id}`);
  };

  const confirmedCount = bookings.filter(
    (booking) =>
      String(booking.status || "").toLowerCase() === "confirmed",
  ).length;

  const cancelledCount = bookings.filter(isCancelled).length;

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <span className="booking-eyebrow">YOUR JOURNEYS</span>
        <h1>My Bookings</h1>
        <p>All your train journeys, together in one place.</p>
      </div>

      <div className="booking-summary">
        <div className="summary-card">
          <span className="summary-icon">🎫</span>
          <div>
            <p>Total Bookings</p>
            <h2>{bookings.length}</h2>
          </div>
        </div>

        <div className="summary-card">
          <span className="summary-icon">✓</span>
          <div>
            <p>Confirmed</p>
            <h2>{confirmedCount}</h2>
          </div>
        </div>

        <div className="summary-card">
          <span className="summary-icon">✕</span>
          <div>
            <p>Cancelled</p>
            <h2>{cancelledCount}</h2>
          </div>
        </div>
      </div>

      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const cancelled = isCancelled(booking);

            const statusClass = cancelled
              ? "cancelled"
              : booking.status === "Confirmed"
                ? "confirmed"
                : "pending";

            return (
              <article
                className={`rail-ticket ${cancelled ? "ticket-cancelled" : ""}`}
                key={booking.id}
              >
                <div className="ticket-main">
                  <div className="ticket-top">
                    <div className="ticket-brand">
                      <span className="ticket-logo">R</span>
                      <div>
                        <h2>RailGo Lite</h2>
                        <p>TRAIN E-TICKET</p>
                      </div>
                    </div>

                    <span className={`booking-status ${statusClass}`}>
                      {cancelled ? "Cancelled" : booking.status || "Pending"}
                    </span>
                  </div>

                  <div className="ticket-train-info">
                    <div>
                      <h3>{booking.trainName}</h3>
                      <p>Train No. {booking.trainNumber}</p>
                    </div>

                    <div className="ticket-booking-id">
                      <span>BOOKING ID</span>
                      <strong>{booking.id}</strong>
                    </div>
                  </div>

                  <div className="ticket-route">
                    <div className="ticket-station">
                      <span className="station-code">{booking.sourceCode}</span>
                      <h3>{booking.departure}</h3>
                      <p>{booking.source}</p>
                      <small>Departure</small>
                    </div>

                    <div className="ticket-route-line">
                      <span>🚆</span>
                      <div></div>
                      <small>Journey</small>
                    </div>

                    <div className="ticket-station destination">
                      <span className="station-code">
                        {booking.destinationCode}
                      </span>
                      <h3>{booking.arrival}</h3>
                      <p>{booking.destination}</p>
                      <small>Arrival</small>
                    </div>
                  </div>

                  <div className="ticket-dashed-divider">
                    <span></span>
                    <span></span>
                  </div>

                  <div className="ticket-details">
                    <div>
                      <span>PASSENGER</span>
                      <strong>{booking.passenger}</strong>
                    </div>

                    <div>
                      <span>TRAVEL DATE</span>
                      <strong>
                        {booking.date
                          ? new Date(
                              `${booking.date}T12:00:00`,
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "Not available"}
                      </strong>
                    </div>

                    <div>
                      <span>COACH / SEAT</span>
                      <strong>{booking.seat || "Not assigned"}</strong>
                    </div>

                    <div>
                      <span>TICKET FARE</span>
                      <strong className="ticket-price">
                        ₹{booking.price}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="ticket-stub">
                  <div className="stub-circle stub-top"></div>
                  <div className="stub-circle stub-bottom"></div>

                  <span className="stub-label">BOOKING HISTORY</span>

                  <div className="stub-qr" aria-label="Decorative ticket pattern">
                    <span>▦</span>
                  </div>

                  <strong>{booking.id}</strong>
                  <p>{cancelled ? "Cancelled" : booking.status || "Pending"}</p>

                  <div className="ticket-actions">
                    <button
                      className="view-ticket-btn"
                      disabled={cancelled}
                      onClick={() => viewTicket(booking)}
                    >
                      {cancelled ? "Ticket Cancelled" : "View Ticket"}
                    </button>

                    <button
                      className="cancel-booking-btn"
                      disabled={cancelled}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      {cancelled ? "Cancelled" : "Cancel"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-bookings">
            <span>🎫</span>
            <h2>No Bookings Yet</h2>
            <p>Your train tickets will appear here when you book a journey.</p>
          </div>
        )}
      </div>

      <p className="booking-note">
        Demo tickets for your RailGo Lite project. These are not official
        railway tickets.
      </p>
    </div>
  );
}

export default Bookings;