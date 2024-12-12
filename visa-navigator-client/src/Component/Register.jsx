import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser, googleLogin, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setErrorMessage("");
    setShowSuccess(false);

    // Password validation
    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Include at least one uppercase letter and lowercase letter");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        setShowSuccess(true);
      })
      .catch((error) => {
        setErrorMessage(error.code);
        setShowSuccess(false);
      });
  };

  const handleGoogleRegister = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mb-10 mt-10 mx-4">
      <div className="shadow-2xl rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Create an Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

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

          {/* Photo URL Field */}
          <div>
            <label htmlFor="photoURL" className="block text-gray-700 mb-1">
              Profile Photo URL
            </label>
            <input
              name="photo"
              type="text"
              id="photoURL"
              placeholder="Enter your profile photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
            {errorMessage && (
              <label className="label text-red-500 text-sm">{errorMessage}</label>
            )}
            {showSuccess && (
              <label className="label text-green-500 text-sm">
                <p>Register successful</p>
              </label>
            )}
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
            >
              Register
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-between my-4">
          <div className="border-t w-full"></div>
          <span className="mx-2 text-gray-500">or</span>
          <div className="border-t w-full"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FcGoogle className="mr-2" size={20} />
          Continue with Google
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-gray-700">Already have an account? </span>
          <Link
            to="/auth/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
