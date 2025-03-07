import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('customer');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registration Data:', {
            fullName,
            email,
            password,
            mobileNumber,
            role,
        });
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return; // Prevent submission if passwords do not match
        }
        
        const registrationData = {
            fullName,
            email,
            password,
            mobileNumber,
            role,
        };
        try {
            const response = await fetch(`http://localhost:5027/api/${role}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });
            if (response.ok) {
                // Store user details in local storage
                const registeredUser = {
                    fullName,
                    email,
                    mobileNumber,
                    role,
                };
                localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
                setSuccessMessage(`Registration successful as ${role}`);
                navigate('/login'); // Redirect to login page
            } else {
                const errorData = await response.json();
                if (errorData.error.includes("duplicate key error")) {
                    // setSuccessMessage("Email already exists. Please log in.");
                } else {
                    console.error('Registration error:', errorData);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {successMessage && <p>{successMessage}</p>}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4">Register</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Your Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md" style={{ zIndex: 10 }}>Register Now</button>
                    <p className="mt-4 text-center">
                        Already Registered? <a href="/login" className="text-blue-500">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default Register;

