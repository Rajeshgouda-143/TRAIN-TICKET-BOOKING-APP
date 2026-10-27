
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");

  const readBookings = () => {
    const saved = JSON.parse(
      localStorage.getItem("railgoBookings") || "[]",
    );

    if (!Array.isArray(saved)) {
      throw new Error("Invalid booking data");
    }

    return saved;
  };

  // Check whether this booking has already been cancelled.
  const savedBooking = (() => {
    if (!booking?.id) return null;

    try {
      return readBookings().find(
        (item) => String(item.id) === String(booking.id),
      ) || null;
    } catch {
      return null;
    }
  })();

  const isCancelled =
    String(savedBooking?.status || booking?.status || "").toLowerCase() ===
    "cancelled";

  if (!booking) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>No booking details found</h2>
          <p>Please select a train and complete the booking form first.</p>
          <button onClick={() => navigate("/trains")}>
            Find Trains
          </button>
        </div>
      </div>
    );
  }

  if (isCancelled) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>Booking Cancelled</h2>
          <p>
            This booking has been cancelled. Payment is unavailable for
            cancelled bookings.
          </p>
          <button onClick={() => navigate("/bookings")}>
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = (event) => {
    event.preventDefault();
    setError("");

    if (paymentMethod === "UPI" && !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      setError("Enter a demo UPI ID, for example demo@upi.");
      return;
    }

    if (
      paymentMethod === "Card" &&
      !/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))
    ) {
      setError("Enter a 16-digit demo card number.");
      return;
    }

    try {
      // Re-check the latest data immediately before payment.
      const savedBookings = readBookings();

      const existingIndex = savedBookings.findIndex(
        (item) => String(item.id) === String(booking.id),
      );

      if (existingIndex !== -1) {
        const existingBooking = savedBookings[existingIndex];

        if (
          String(existingBooking.status || "").toLowerCase() === "cancelled"
        ) {
          setError("This booking has been cancelled. Payment is unavailable.");
          return;
        }

        if (
          String(existingBooking.status || "").toLowerCase() === "confirmed"
        ) {
          setError("This booking is already confirmed.");
          return;
        }
      }

      const confirmedBooking = {
        ...(existingIndex !== -1 ? savedBookings[existingIndex] : booking),
        paymentMethod,
        paymentStatus: "Demo payment successful",
        status: "Confirmed",
      };

      let updatedBookings;

      if (existingIndex !== -1) {
        updatedBookings = [...savedBookings];
        updatedBookings[existingIndex] = confirmedBooking;
      } else {
        updatedBookings = [...savedBookings, confirmedBooking];
      }

      localStorage.setItem(
        "railgoBookings",
        JSON.stringify(updatedBookings),
      );

      setPaymentStatus("success");
    } catch {
      setError("Unable to save your booking. Please try again.");
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="payment-page">
        <div className="payment-card payment-success">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your demo payment was successful.</p>
          <p>
            Booking ID: <strong>{booking.id}</strong>
          </p>
          <p className="demo-note">
            This is a simulated payment. No money was transferred.
          </p>
          <button onClick={() => navigate(`/ticket/${booking.id}`)}>
            View Ticket
          </button>
          <button
            className="secondary-button"
            onClick={() => navigate("/bookings")}
          >
            My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-heading">
          <h1>Complete Your Payment</h1>
          <p>Secure your journey with RailGo Lite</p>
          <span className="demo-badge">DEMO PAYMENT ONLY</span>
        </div>

        <div className="payment-layout">
          <section className="payment-card">
            <h2>Journey Summary</h2>

            <div className="payment-detail">
              <span>Train</span>
              <strong>{booking.trainName}</strong>
            </div>

            <div className="payment-detail">
              <span>Train Number</span>
              <strong>{booking.trainNumber}</strong>
            </div>

            <div className="payment-detail">
              <span>From</span>
              <strong>{booking.source}</strong>
            </div>

            <div className="payment-detail">
              <span>To</span>
              <strong>{booking.destination}</strong>
            </div>

            <div className="payment-detail">
              <span>Travel Date</span>
              <strong>{booking.date || "Not selected"}</strong>
            </div>

            <div className="payment-detail">
              <span>Passenger</span>
              <strong>{booking.passenger}</strong>
            </div>

            <div className="payment-total">
              <span>Total Amount</span>
              <strong>₹{booking.price}</strong>
            </div>
          </section>

          <section className="payment-card">
            <h2>Choose Payment Method</h2>

            <form onSubmit={handlePayment}>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                <span>📱 UPI</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={paymentMethod === "Card"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                <span>💳 Debit / Credit Card</span>
              </label>

              {paymentMethod === "UPI" && (
                <div className="payment-input-group">
                  <label htmlFor="upiId">Demo UPI ID</label>
                  <input
                    id="upiId"
                    type="text"
                    placeholder="demo@upi"
                    value={upiId}
                    onChange={(event) => setUpiId(event.target.value)}
                    required
                  />
                  <small>Use a sample ID such as demo@upi.</small>
                </div>
              )}

              {paymentMethod === "Card" && (
                <div className="payment-input-group">
                  <label htmlFor="cardNumber">Demo Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(event) =>
                      setCardNumber(
                        event.target.value.replace(/\D/g, "").slice(0, 16),
                      )
                    }
                    required
                  />
                  <small>
                    Enter any 16 digits for this simulation. Do not use real
                    payment details.
                  </small>
                </div>
              )}

              {error && (
                <p className="payment-error" role="alert">
                  {error}
                </p>
              )}

              <button className="pay-button" type="submit">
                Simulate Payment — ₹{booking.price}
              </button>
            </form>

            <p className="demo-note">
              Demo only. No real payment gateway is connected.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Payment;
