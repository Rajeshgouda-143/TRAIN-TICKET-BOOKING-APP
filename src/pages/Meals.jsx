
import { useState } from "react";
import "./Meals.css";

const foodItems = [
  {
    id: 1,
    name: "Masala Dosa",
    category: "South Indian",
    price: 120,
    time: "15–20 min",
    veg: true,
    description: "Crispy dosa served with sambar and chutneys.",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Veg Biryani",
    category: "Rice & Biryani",
    price: 180,
    time: "20–25 min",
    veg: true,
    description: "Aromatic rice with vegetables and fragrant spices.",
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 220,
    time: "20–25 min",
    veg: true,
    description: "Soft paneer in a rich, creamy tomato gravy.",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Veg Thali",
    category: "Meals",
    price: 160,
    time: "15–20 min",
    veg: true,
    description: "A satisfying meal with rice, roti, dal and curry.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Idli Sambar",
    category: "South Indian",
    price: 80,
    time: "10–15 min",
    veg: true,
    description: "Soft steamed idlis with warm sambar and chutney.",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Samosa",
    category: "Snacks",
    price: 40,
    time: "10–15 min",
    veg: true,
    description: "Golden, crispy pastry filled with spiced potatoes.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Masala Chai",
    category: "Beverages",
    price: 30,
    time: "5–10 min",
    veg: true,
    description: "Freshly brewed Indian tea with aromatic spices.",
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Fresh Fruit Bowl",
    category: "Beverages",
    price: 90,
    time: "5–10 min",
    veg: true,
    description: "A refreshing mix of seasonal fruits.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=80",
  },
];

const categories = [
  "All",
  "South Indian",
  "Rice & Biryani",
  "Main Course",
  "Meals",
  "Snacks",
  "Beverages",
];

function Meals() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    customerName: "",
    trainNumber: "",
    pnr: "",
    coachSeat: "",
    station: "",
    deliveryTime: "",
  });
  const [error, setError] = useState("");

  const visibleItems = foodItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(food) {
    setOrder(null);
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === food.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...food, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setOrder(null);
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function placeOrder(event) {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Please add at least one food item.");
      return;
    }

    const pnr = form.pnr.trim();

    if (!/^\d{10}$/.test(pnr)) {
      setError("Please enter a valid 10-digit PNR number.");
      return;
    }

    const orderNumber = `RG${Date.now().toString().slice(-8)}`;

    setOrder({
      orderNumber,
      items: cart,
      total: totalPrice,
      customerName: form.customerName,
      trainNumber: form.trainNumber,
      coachSeat: form.coachSeat,
      station: form.station,
      deliveryTime: form.deliveryTime,
      placedAt: new Date().toLocaleString(),
    });

    setCart([]);
    setShowCheckout(false);
  }

  return (
    <main className="meals-page">
      <section className="meals-hero">
        <div>
          <span className="meals-eyebrow">RAILGO LITE FOOD SERVICE</span>
          <h1>Good food, wherever you travel.</h1>
          <p>
            Discover tasty meals and plan your food delivery during your
            journey.
          </p>
          <a href="#food-menu" className="meals-hero-button">
            Explore menu ↓
          </a>
        </div>

        <div className="meals-hero-art" aria-hidden="true">
          <span>🍱</span>
          <span>🍛</span>
          <span>🥤</span>
        </div>
      </section>

      <section className="meals-content" id="food-menu">
        <div className="meals-heading">
          <div>
            <span className="meals-eyebrow">MADE FOR YOUR JOURNEY</span>
            <h2>Explore our menu</h2>
            <p>Choose your favourites and add them to your cart.</p>
          </div>

          <button
            type="button"
            className="cart-open-button"
            onClick={() => setShowCheckout(true)}
          >
            🛒 Cart ({cartCount}) · ₹{totalPrice}
          </button>
        </div>

        <input
          className="meal-search"
          type="search"
          placeholder="Search meals, snacks, drinks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search food menu"
        />

        <div className="meal-categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? "meal-category active"
                  : "meal-category"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="meal-grid">
          {visibleItems.map((food) => {
            const cartItem = cart.find((item) => item.id === food.id);

            return (
              <article className="meal-card" key={food.id}>
                <div className="meal-image-wrap">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="meal-image"
                    loading="lazy"
                  />
                  <span className="meal-time">◷ {food.time}</span>
                </div>

                <div className="meal-card-body">
                  <span className="veg-label">
                    <span /> Vegetarian
                  </span>
                  <h3>{food.name}</h3>
                  <p className="meal-description">{food.description}</p>

                  <div className="meal-card-bottom">
                    <strong className="meal-price">₹{food.price}</strong>

                    {cartItem ? (
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => changeQuantity(food.id, -1)}
                          aria-label={`Remove one ${food.name}`}
                        >
                          −
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(food)}
                          aria-label={`Add one ${food.name}`}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="add-meal-button"
                        onClick={() => addToCart(food)}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {visibleItems.length === 0 && (
          <p className="meals-empty">No menu items match your search.</p>
        )}
      </section>

      {showCheckout && (
        <div className="meal-modal-backdrop">
          <section
            className="meal-checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <button
              type="button"
              className="meal-modal-close"
              onClick={() => setShowCheckout(false)}
              aria-label="Close checkout"
            >
              ×
            </button>

            <span className="meals-eyebrow">ALMOST THERE</span>
            <h2 id="checkout-title">Your food order</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty. Add some delicious food first!</p>
            ) : (
              <>
                <div className="checkout-items">
                  {cart.map((item) => (
                    <div className="checkout-item" key={item.id}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <div className="checkout-total">
                  <span>Total amount</span>
                  <strong>₹{totalPrice}</strong>
                </div>

                <form className="meal-order-form" onSubmit={placeOrder}>
                  <label>
                    Passenger name
                    <input
                      name="customerName"
                      value={form.customerName}
                      onChange={updateForm}
                      placeholder="Enter your name"
                      required
                    />
                  </label>

                  <div className="meal-form-row">
                    <label>
                      Train number
                      <input
                        name="trainNumber"
                        value={form.trainNumber}
                        onChange={updateForm}
                        placeholder="e.g. 12601"
                        required
                      />
                    </label>

                    <label>
                      PNR number
                      <input
                        name="pnr"
                        value={form.pnr}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            pnr: event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          }))
                        }
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="10 digits"
                        required
                      />
                    </label>
                  </div>

                  <div className="meal-form-row">
                    <label>
                      Coach and seat
                      <input
                        name="coachSeat"
                        value={form.coachSeat}
                        onChange={updateForm}
                        placeholder="e.g. S2, 35"
                        required
                      />
                    </label>

                    <label>
                      Delivery station
                      <input
                        name="station"
                        value={form.station}
                        onChange={updateForm}
                        placeholder="Station name"
                        required
                      />
                    </label>
                  </div>

                  <label>
                    Preferred delivery time
                    <select
                      name="deliveryTime"
                      value={form.deliveryTime}
                      onChange={updateForm}
                      required
                    >
                      <option value="">Choose a time slot</option>
                      <option value="Breakfast · 7 AM–10 AM">
                        Breakfast · 7 AM–10 AM
                      </option>
                      <option value="Lunch · 12 PM–3 PM">
                        Lunch · 12 PM–3 PM
                      </option>
                      <option value="Evening · 4 PM–7 PM">
                        Evening · 4 PM–7 PM
                      </option>
                      <option value="Dinner · 7 PM–10 PM">
                        Dinner · 7 PM–10 PM
                      </option>
                    </select>
                  </label>

                  <p className="meal-demo-note">
                    Demo only: delivery times are preferences, not live
                    availability confirmations.
                  </p>

                  {error && (
                    <p className="meal-form-error" role="alert">
                      {error}
                    </p>
                  )}

                  <button className="place-order-button" type="submit">
                    Place Demo Order · ₹{totalPrice}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}

      {order && (
        <section className="meal-order-confirmation" aria-live="polite">
          <span className="order-success-icon">✓</span>
          <span className="meals-eyebrow">ORDER CONFIRMED IN DEMO</span>
          <h2>Thank you, {order.customerName}!</h2>
          <p>
            Your demo order <strong>{order.orderNumber}</strong> has been
            recorded on this page.
          </p>

          <div className="order-confirmation-details">
            <p><strong>Placed at:</strong> {order.placedAt}</p>
            <p><strong>Train:</strong> {order.trainNumber}</p>
            <p><strong>Coach / seat:</strong> {order.coachSeat}</p>
            <p><strong>Delivery station:</strong> {order.station}</p>
            <p><strong>Preferred time:</strong> {order.deliveryTime}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>

          <div className="checkout-items">
            {order.items.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>

          <p className="meal-demo-note">
            This is a local demo confirmation, not a real food order. No
            restaurant has been notified and no payment has been taken.
          </p>

          <button
            type="button"
            className="add-meal-button"
            onClick={() => setOrder(null)}
          >
            Back to menu
          </button>
        </section>
      )}
    </main>
  );
}

export default Meals;
