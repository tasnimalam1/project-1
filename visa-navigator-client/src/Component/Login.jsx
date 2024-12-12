import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { userLogin, setUser, googleLogin } = useContext(AuthContext);
  const [userError, setUserError] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setSuccess("Login Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setUserError({ ...userError, login: error.code });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setSuccess("Login Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setUserError({ ...userError, login: error.code });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-4">
      <div className="shadow-2xl rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 hover:text-primary"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error and Success Messages */}
          {userError.login && (
            <p className="text-red-600 text-sm">{userError.login}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between my-4">
          <div className="border-t w-full"></div>
          <span className="mx-2 text-gray-500">or</span>
          <div className="border-t w-full"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle className="mr-2" size={20} />
          Continue with Google
        </button>

        {/* Register Link */}
        <div className="text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <Link
            to="/auth/register"
            className="text-primary font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
