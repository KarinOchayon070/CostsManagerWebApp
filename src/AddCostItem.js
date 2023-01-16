import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import header from "./header.png";

const AddCostItem = () => {
  const [cost, setCost] = useState({
    item_name: "",
    sum: 0,
    category: "",
    description: "",
    purchaseDate: new Date(),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCost({ ...cost, [name]: value });
  };

  const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (cost.sum && cost.category && cost.description && cost.purchaseDate) {
      let items = JSON.parse(localStorage.getItem("Items")) || [];
      items.push(cost);
      localStorage.setItem("Items", JSON.stringify(items));
      setMessage("Item added successfully!");
      setTimeout(() => {
        setMessage("");
        setCost({
          item_name: "",
          sum: 0,
          category: "",
          description: "",
          purchaseDate: new Date(),
        });
      }, 4000);
    } else {
      setMessage("Please fill all the details before adding an item.");
    }
  };

  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const handleDateChange = (date) => {
    setPurchaseDate(date);
  };

  return (
    <div className="allPage">
      <div className="form-container">
        <header className="App-header">
          <img src={header} className="App-logo" alt="logo" />
        </header>
        <form onSubmit={handleSubmit} className="form">
          <div className="row">
            <label>Item Name:</label>
            <input
              type="text"
              name="item_name"
              value={cost.item_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="row">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={cost.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="row">
            <label>Sum:</label>
            <input
              type="number"
              name="sum"
              value={cost.sum}
              onChange={handleInputChange}
            />
          </div>

          <div className="row">
            <label>Category:</label>
            <select
              name="category"
              value={cost.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="groceries">Groceries</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
              <option value="restaurants">Restaurants</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="row">
            <label>Purchase Date:</label>
            <input type="date" onChange={handleDateChange} />
          </div>

          <button className="btnSubmit" type="submit">
            Add Item
          </button>

          <div>{message}</div>
        </form>
      </div>
    </div>
  );
};

export default AddCostItem;
