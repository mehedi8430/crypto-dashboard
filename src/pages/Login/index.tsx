import { LoginForm } from "./LoginForm";
import sideImage from "@/assets/image/login-side-image.gif";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-form">
          <div className="login-header">
            <h1 className="login-title">
              Login to <span className="text-blue-500">VAULT</span>
            </h1>
            <p className="login-subtitle">
              To keep connected with us please login with your personal info
            </p>
          </div>

          <LoginForm />

          <div className="social-login"></div>
          <div className="register-link"></div>
        </div>
      </div>
      <div className="login-image-wrapper">
        <img src={sideImage} alt="Crypto Animation" className="login-image" />
      </div>
    </div>
  );
}
