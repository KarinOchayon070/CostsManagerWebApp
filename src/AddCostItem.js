import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const AddCostItem = ({ cost, message, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="addCostItemForm">
      <div className="row">
        <label>Item Name:</label>
        <input
          className="customInput"
          type="text"
          name="item_name"
          value={cost.item_name}
          onChange={handleInputChange}
          autocomplete="off"
        />
      </div>
      <div className="row">
        <label>Description:</label>
        <textarea
          className="customInput"
          rows={3}
          type="text"
          name="description"
          value={cost.description}
          onChange={handleInputChange}
          autocomplete="off"
        />
      </div>
      <div className="row">
        <label>Sum:</label>
        <input
          className="customInput"
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
          className="customInput"
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
        <input
          type="date"
          name="purchaseDate"
          className="customInput"
          value={cost.purchaseDate}
          onChange={handleInputChange}
        />
      </div>
      <button className="btnSubmit" onClick={handleSubmit}>
        Add Item
      </button>
      <div className="message">{message}</div>
    </form>
  );
};

export default AddCostItem;
