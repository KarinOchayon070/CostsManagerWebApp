import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import header from "./header.png";
import LocalStorage from "./LocalStorage";
import Report from "./Report";
import moment from "moment";

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

  const [showReport, setShowReport] = useState(false);
  const handleReportButtonClick = () => {
    setShowReport(true);
  };

  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cost.sum && cost.category && cost.description && cost.purchaseDate) {
      try {
        await LocalStorage.addCost({
          ...cost,
          purchaseDate: moment(purchaseDate).format("YYYY-MM-DD"),
        });
        setMessage("Item added successfully!");
      } catch (error) {
        setMessage("An error occurred while adding the item.");
      }
    } else {
      setMessage("Please fill all the details before adding an item.");
    }
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
  };

  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const handleDateChange = (event) => {
    const date = event.target.value;
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
          <div className="message">{message}</div>
          <button className="btnSubmit" onClick={handleSubmit}>
            Add Item
          </button>
          <button
            type="button"
            className="btnGenerateReport"
            onClick={handleReportButtonClick}
          >
            Generate Report
          </button>
          {showReport ? <Report /> : null}
        </form>
      </div>
    </div>
  );
};

export default AddCostItem;
