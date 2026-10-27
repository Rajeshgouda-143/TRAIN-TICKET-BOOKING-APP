
import { useParams, useNavigate } from "react-router-dom";
import "./Ticket.css";

function Ticket() {
  const { id } = useParams();
  const navigate = useNavigate();

  let bookings = [];

  try {
    bookings = JSON.parse(
      localStorage.getItem("railgoBookings") || "[]",
    );

    if (!Array.isArray(bookings)) {
      bookings = [];
    }
  } catch {
    bookings = [];
  }

  const booking = bookings.find(
    (item) => String(item.id) === String(id),
  );

  const isCancelled =
    String(booking?.status || "").toLowerCase() === "cancelled";

  // Handle missing or cancelled tickets
  if (!booking || isCancelled) {
    return (
      <div className="ticket-not-found">
        <h2>{isCancelled ? "Ticket Cancelled" : "Ticket Not Found"}</h2>

        <p>
          {isCancelled
            ? "This booking has been cancelled. You can view its status in your booking history, but it is no longer valid for travel."
            : "We couldn't find this ticket. Please open a saved booking from your My Bookings page."}
        </p>

        <button onClick={() => navigate("/bookings")}>
          Back to My Bookings
        </button>
      </div>
    );
  }

  const travelDate = booking.date
    ? new Date(`${booking.date}T12:00:00`).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      )
    : "Not specified";

  return (
    <div className="print-ticket-page">
      <div className="print-ticket-actions">
        <button onClick={() => navigate("/bookings")}>
          ← Back to Bookings
        </button>

        <button onClick={() => window.print()}>
          Print Ticket
        </button>
      </div>

      <article className="official-ticket">
        <header className="official-ticket-header">
          <div className="official-ticket-logo">R</div>

          <div>
            <h1>RailGo Lite</h1>
            <p>TRAIN JOURNEY TICKET</p>
          </div>

          <span className="official-ticket-status ticket-confirmed">
            {booking.status || "Confirmed"}
          </span>
        </header>

        <div className="official-ticket-reference">
          <div>
            <span>BOOKING ID</span>
            <strong>{booking.id}</strong>
          </div>

          <div>
            <span>TRAVEL DATE</span>
            <strong>{travelDate}</strong>
          </div>
        </div>

        <section className="official-ticket-journey">
          <div>
            <span>FROM</span>
            <h2>{booking.source}</h2>
            {booking.sourceCode && <strong>{booking.sourceCode}</strong>}
            <p>{booking.departure}</p>
          </div>

          <div className="official-ticket-arrow">→</div>

          <div>
            <span>TO</span>
            <h2>{booking.destination}</h2>
            {booking.destinationCode && (
              <strong>{booking.destinationCode}</strong>
            )}
            <p>{booking.arrival}</p>
          </div>
        </section>

        <div className="official-ticket-train">
          <span>TRAIN DETAILS</span>
          <h3>{booking.trainName}</h3>
          <p>Train Number: {booking.trainNumber}</p>
        </div>

        <section className="official-ticket-passenger">
          <h3>Passenger Details</h3>

          <div>
            <span>Passenger Name</span>
            <strong>{booking.passenger}</strong>
          </div>

          {booking.age != null && (
            <div>
              <span>Passenger Age</span>
              <strong>{booking.age} years</strong>
            </div>
          )}

          <div>
            <span>Coach / Seat Preference</span>
            <strong>{booking.seat || "Not assigned"}</strong>
          </div>
        </section>

        <footer className="official-ticket-footer">
          <div>
            <span>TOTAL FARE</span>
            <strong>₹{booking.price}</strong>
          </div>

          <p>
            This is a demonstration ticket for the RailGo Lite project,
            not an official railway ticket or confirmed railway reservation.
          </p>
        </footer>
      </article>
    </div>
  );
}

export default Ticket;