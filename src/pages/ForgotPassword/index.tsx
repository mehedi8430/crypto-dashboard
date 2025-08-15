// crypto-dashboard/src/pages/ForgotPassword/index.tsx
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import sideImage from "@/assets/image/login-side-image.gif";
import "./ForgotPassword.css";

export default function ForgotPasswordPage() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-wrapper">
        <div className="forgot-password-form">
          <div className="forgot-password-header">
            <h1 className="forgot-password-title">
              Forgot Your <span className="text-blue-500">Password?</span>
            </h1>
            <p className="forgot-password-subtitle">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
      <div className="login-image-wrapper">
        <img src={sideImage} alt="Crypto Animation" className="login-image" />
      </div>
    </div>
  );
}