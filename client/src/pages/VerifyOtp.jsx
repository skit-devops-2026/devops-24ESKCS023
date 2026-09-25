import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resending, setResending] = useState(false);
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !otp) {
      setError("Please enter your email and the OTP code.");
      return;
    }

    try {
      await verifyOtp(email, otp);
      setSuccess("Email verified successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Could not verify OTP.");
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
    setError("");
    setSuccess("");
    setResending(true);
    try {
      await resendOtp(email);
      setSuccess("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Verify Your Email</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "1rem" }}>
          We sent a 6-digit code to your email. Enter it below to activate your account.
        </p>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>OTP Code</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
        />

        <button type="submit" className="btn-filled" style={{ width: "100%", marginTop: "1rem" }}>
          Verify Email
        </button>

        <button
          type="button"
          className="btn-outline"
          style={{ width: "100%", marginTop: "0.8rem" }}
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Resend OTP"}
        </button>

        <p className="auth-switch">
          Already verified? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;
