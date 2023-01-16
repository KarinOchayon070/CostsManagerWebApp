import React, { useState, useEffect } from "react";

const AddCostItem = () => {
  const [cost, setCost] = useState(
    localStorage.getItem("cost")
      ? JSON.parse(localStorage.getItem("cost"))
      : { sum: 0, category: "", description: "" }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCost({ ...cost, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to save the cost item to local storage
    console.log(cost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sum:
        <input
          type="number"
          name="sum"
          value={cost.sum}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Category:
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
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={cost.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Add Cost Item</button>
    </form>
  );
};

export default AddCostItem;
