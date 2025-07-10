import { useLogin } from "@/queries/authQueries";
import React from "react";
import sideImage from "@/assets/image/login-side-image.gif";

import "./LoginForm.css";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-form">
          <div className="login-header">
            <h1 className="login-title">
              Login to <span className="text-blue-500">EONCOIN</span>
            </h1>
            <p className="login-subtitle">
              To keep connected with us please login with your personal info
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                required
                className="login-input"
                placeholder="User Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-500 hover:text-blue-400"
                ></a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={login.isPending}
                className="login-button !bg-primary"
              >
                {login.isPending ? "Signing in..." : "Login to Your Account"}
              </button>
            </div>
          </form>
          <div className="social-login"></div>
          <div className="register-link">
            <p>
              Don't have account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Register Now
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="login-image-wrapper">
        <img src={sideImage} alt="Crypto Animation" className="login-image" />
      </div>
    </div>
  );
}
