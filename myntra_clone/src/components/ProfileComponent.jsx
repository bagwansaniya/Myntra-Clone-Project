import React from "react";
import { FaUser } from "react-icons/fa";
const ProfileComponent = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    // Replace with user's profile picture URL
    orders: [
      { id: 1, date: "2024-09-01", item: "T-Shirt", price: "₹499" },
      { id: 2, date: "2024-09-15", item: "Jeans", price: "₹1299" },
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaUser className="profile-picture" />

        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div className="order-history">
        <h3>Order History</h3>
        <ul>
          {user.orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-details">
                <span>{order.item}</span>
                <span>{order.date}</span>
              </div>
              <span className="order-price">{order.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
