// crypto-dashboard/src/pages/ForgotPassword/ForgotPasswordForm.tsx
import React from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import "./ForgotPassword.css";

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Password reset for:", email);
    // Simulate API call
    setTimeout(() => {
      toast.success(
        "If an account with that email exists, we've sent a password reset link."
      );
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="email"
          required
          className="forgot-password-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="forgot-password-button !bg-primary"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </div>

      <div className="login-link">
        <Link to="/login">Back to Login</Link>
      </div>
    </form>
  );
}