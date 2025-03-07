import { useState } from "react";
import { useCart } from "../context/CartContext";

const PaymentPage = () => {
  const { cartItems } = useCart();
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [formData, setFormData] = useState({
    pincode: "",
    mobile: "",
    fullName: "",
    locality: "",
    house: "",
    street: "",
    city: "",
    state: "",
    addressType: "Home",
  });
  const [errors, setErrors] = useState({});
  const [selectedPayment, setSelectedPayment] = useState("Cash On Delivery");

  const validate = () => {
    let newErrors = {};
    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "6 Digit Valid Pincode Required";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Please fill out this field.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Fill Address For Shipping</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.pincode ? "border-red-500" : "border-gray-300"} rounded`}
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number *</label>
          <div className="flex">
            <span className="p-2 bg-gray-200 border border-gray-300">+91</span>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-r"
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name *</label>
          <input type="text" name="fullName" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Locality/Area *</label>
          <input type="text" name="locality" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Flat / House No. / Building Name *</label>
          <input type="text" name="house" className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Building/Street/Landmark *</label>
          <input type="text" name="street" className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">City *</label>
            <input type="text" name="city" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block text-gray-700">State *</label>
            <input type="text" name="state" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Submit Address
        </button>
      </form>

      {/* Cart Products Section */}
      <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Your Cart Items</h2>

        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
              <span>{item.name} (x{item.quantity})</span>

              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      {/* Payment Mode Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Payment Mode</h2>
        <div className="flex border rounded-md overflow-hidden">
          <div className="w-1/3 border-r">
            {["Cash On Delivery", "ATM / Debit Card", "Credit Card", "Net Banking", "Wallets"].map((mode) => (
              <div
                key={mode}
                className={`p-4 cursor-pointer ${selectedPayment === mode ? "bg-green-100 border-l-4 border-green-500" : "bg-gray-100"}`}
                onClick={() => setSelectedPayment(mode)}
              >
                {mode}
              </div>
            ))}
          </div>
          <div className="w-2/3 p-4">
            <h3 className="font-semibold">Order Details</h3>
            <p>Total Price: ₹ {calculateTotalPrice()}</p>
            <p>Shipping Charges: ₹ Free</p>
            <p>Handling Charges: <span className="text-green-600">FREE</span></p>
            <p className="text-red-500 font-bold text-lg">Amount Payable: ₹ {calculateTotalPrice()}</p>
            <button className="w-full bg-green-500 text-white py-2 rounded mt-4">Confirm Order ₹ {calculateTotalPrice()}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
