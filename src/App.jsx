
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import Trains from "./pages/Trains";
import Meals from "./pages/Meals";
import Bookings from "./pages/Bookings";
import Ticket from "./pages/Ticket";
import BookTicket from "./pages/BookTicket";
import PNRStatus from "./pages/PNRStatus";
import Payment from "./pages/Payment";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/pnr-status" element={<PNRStatus />} />

        {/* Authentication pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Login required */}
        <Route element={<RequireAuth />}>
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/book-ticket" element={<BookTicket />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
