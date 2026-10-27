import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const STORAGE_KEY = "railgoUsers";
const ITERATIONS = 210000;

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password, saltHex) {
  const salt = Uint8Array.from(
    saltHex.match(/.{2}/g).map((byte) => parseInt(byte, 16)),
  );

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return bytesToHex(new Uint8Array(bits));
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!globalThis.crypto?.subtle) {
      setError(
        "Password verification is unavailable. Open the app on localhost.",
      );
      return;
    }

    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      if (!Array.isArray(users)) {
        throw new Error("Invalid saved account data.");
      }

      const user = users.find(
        (item) =>
          typeof item.email === "string" &&
          item.email.trim().toLowerCase() === normalizedEmail,
      );

      if (!user) {
        setError("Account not found. Please sign up first.");
        return;
      }

      if (!user.salt || !user.passwordHash) {
        setError(
          "This account needs to be re-registered. Please sign up again using this email and choose a new password.",
        );
        return;
      }

      const enteredHash = await hashPassword(password, user.salt);

      if (enteredHash !== user.passwordHash) {
        setError("Incorrect email or password.");
        return;
      }

      // Demo session: stores profile information, not the password.
      sessionStorage.setItem(
        "railgoCurrentUser",
        JSON.stringify({
          fullName: user.fullName,
          email: user.email,
        }),
      );

      const from = location?.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      
    } catch {
      setError("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-brand">
          🚆 RailGo <span>Lite</span>
        </Link>

        <div className="login-heading">
          <h1>Welcome Back!</h1>
          <p>Log in to continue your journey.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <div className="login-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setShowPassword((previous) => !previous)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="login-signup-link">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>

        <p className="login-demo-note">
          Frontend demo only. Do not use a real or reused password.
        </p>
      </div>
    </div>
  );
}

export default Login;
