import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const STORAGE_KEY = "railgoUsers";
const ITERATIONS = 210000;

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password, saltHex) {
  const salt = Uint8Array.from(
    saltHex.match(/.{2}/g).map((byte) => parseInt(byte, 16))
  );

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256
  );

  return bytesToHex(new Uint8Array(bits));
}

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const { password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!globalThis.crypto?.subtle) {
      setError("Password hashing is unavailable. Open the app on localhost.");
      return;
    }

    setLoading(true);

    try {
      const existingUsers = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      if (!Array.isArray(existingUsers)) {
        throw new Error("Invalid saved account data.");
      }

      const existingUser = existingUsers.find(
        (user) => user.email === email
      );

      if (existingUser?.passwordHash) {
        setError("This email is already registered. Please log in.");
        setLoading(false);
        return;
      }

      // Create a unique random salt for this account.
      const saltBytes = crypto.getRandomValues(new Uint8Array(16));
      const salt = bytesToHex(saltBytes);
      const passwordHash = await hashPassword(password, salt);

      // Save the hash and salt, never the plaintext password.
      const newUser = {
        fullName,
        email,
        salt,
        passwordHash,
        iterations: ITERATIONS,
      };

      // Upgrade a profile created by the older demo, if present.
      const updatedUsers = existingUser
        ? existingUsers.map((user) =>
            user.email === email ? newUser : user
          )
        : [...existingUsers, newUser];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

      setSuccess("Account created! Redirecting to Login...");

      setTimeout(() => {
        navigate("/login", { state: { email } });
      }, 1000);
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <Link to="/" className="signup-brand">
          🚆 RailGo <span>Lite</span>
        </Link>

        <div className="signup-heading">
          <h1>Create Account</h1>
          <p>Join RailGo Lite and plan your next journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="signup-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <div className="signup-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
              <button
                type="button"
                className="signup-toggle-password"
                onClick={() => setShowPassword((previous) => !previous)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          {error && (
            <p className="signup-message signup-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="signup-message signup-success" role="status">
              {success}
            </p>
          )}

          <button type="submit" className="signup-submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="signup-login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <p className="signup-demo-note">
          Demo only. Account data is stored in this browser.
        </p>
      </div>
    </div>
  );
}

export default SignUp;