import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState("vendor"); // Define userRole state

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleNextClick = async () => {
    setError("");
    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5027/api/${userRole}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      const userCredentials = {
        email: email,
        role: userRole
      };
      localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
      localStorage.setItem("isLoggedIn", "true");
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("loginInfo", JSON.stringify({ email, role: userRole }));
      }
      alert("Login successfully");
      if (userRole === "vendor") {
        navigate('/product-list'); // Navigate to the product list page after successful vendor login
      } else if (userRole === "customer") {
        navigate('/payment'); // Redirect to payment page if logged in as customer
      } else {
        navigate('/'); // Navigate to home for other roles
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Please enter your email address to reset your password:");
    if (email && /\S+@\S+\.\S+/.test(email)) {
      const resetLink = `${window.location.origin}/reset-password?token=${Date.now()}&email=${encodeURIComponent(email)}`;
      
      const templateParams = {
        to_email: email,
        reset_link: resetLink
      };
      emailjs.init('h7ICt2QsHa4PVdqee');
      emailjs.send(
        'service_7qhbioc',
        'template_w5z8576',
        templateParams
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert(`Password reset link sent to ${email}. Please check your inbox.`);
      }, (error) => {
        console.error('Email sending failed. Details:', {
          errorCode: error.status,
          errorText: error.text,
          templateParams: templateParams,
          serviceId: 'service_epzf7as',
          templateId: 'template_w5z8576'
        });
        alert(`Failed to send reset email. Error: ${error.text}. Please try again later.`);
      });
    } else if (email) {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100">
      <div className="absolute inset-0 bg-white p-8 w-full max-w-md mx-auto my-8 shadow-lg rounded-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>
        <div className="text-center mb-8">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select id="role" value={userRole} onChange={(e) => setUserRole(e.target.value)} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md">
            <option value="vendor">Vendor</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <h2 className="text-2xl font-semibold mt-4">SIGN IN</h2>
          <p className="text-gray-600">Sign in to proceed further</p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          <div className="mt-2 text-right">
            <button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-500">Forgot Password?</button>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <p className="mt-4 text-center">
                        If you are not Registered? <a href="/register" className="text-blue-500">Register here</a>
                    </p>
        <div className="flex items-center mb-6">
          <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
        </div>
        <button onClick={handleNextClick} disabled={isLoading} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed">
          {isLoading ? <div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div></div> : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
