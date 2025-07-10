import { useRegister } from "@/queries/authQueries";
import React from "react";
import sideImage from "@/assets/image/registrationsideimage.gif";
import "./../Login/LoginForm.css";

export default function RegisterForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    register.mutate({ email, password, fullName, role: "USER" });
  };

  return (
    <div className="login-container !bg-[#010102]">
      <div className="login-image-wrapper !flex !justify-center !items-center ">
        <img
          src={sideImage}
          alt="Crypto Animation"
          className="login-image !w-[40%] trans"
        />
      </div>
      <div className="login-form-wrapper">
        <div className="login-form">
          <div className="login-header">
            <h1 className="login-title">Create your account</h1>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="fullName"
                  name="fullName"
                  type="fullName"
                  autoComplete="fullName"
                  required
                  className="login-input"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="login-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={register.isPending}
                className="login-button !bg-primary"
              >
                {register.isPending ? "Registering..." : "Register"}
              </button>
            </div>
            {register.isError && (
              <p className="text-red-500 text-sm text-center mt-2">
                Error: {register.error?.message || "Something went wrong."}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
