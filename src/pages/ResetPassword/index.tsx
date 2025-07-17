// crypto-dashboard/src/pages/ResetPassword/index.tsx
import { ResetPasswordForm } from "./ResetPasswordForm";
import sideImage from "@/assets/image/login-side-image.gif";
import "./ResetPassword.css";

export default function ResetPasswordPage() {
  return (
    <div className="reset-password-container">
      <div className="reset-password-form-wrapper">
        <div className="reset-password-form">
          <div className="reset-password-header">
            <h1 className="reset-password-title">
              Reset Your <span className="text-blue-500">Password</span>
            </h1>
            <p className="reset-password-subtitle">
              Enter your new password below.
            </p>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
      <div className="login-image-wrapper">
        <img src={sideImage} alt="Crypto Animation" className="login-image" />
      </div>
    </div>
  );
}