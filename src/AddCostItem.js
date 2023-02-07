/*
Project name: "Spent It Right".
Project team: Karin Ochayon - 207797002, Dor Uzan - 205890510.
*/

import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

/*
This file is a component through which a user can add a cost item.
This component has several fields, such as - product name, product description, product amount, product price, product category and
product purchase date.
Only when all the fields are filled - the item is added to localStorage and the expenses table.
Please note that the expenses table is updated automatically.
*/

const AddCostItem = ({ cost, message, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className='addCostItemForm'>
      <div className='row'>
        <label>Item Name:</label>
        <input
          className='customInput'
          type='text'
          name='item_name'
          value={cost.item_name}
          onChange={handleInputChange}
          autocomplete='off'
        />
      </div>
      <div className='row'>
        <label>Description:</label>
        <textarea
          className='customInput'
          rows={3}
          type='text'
          name='description'
          value={cost.description}
          onChange={handleInputChange}
          autocomplete='off'
        />
      </div>
      <div className='row'>
        <label>Price:</label>
        <input
          className='customInput'
          type='number'
          name='price'
          min='0'
          value={cost.price}
          onChange={handleInputChange}
        />
      </div>
      <div className='row'>
        <label>Amount:</label>
        <input
          className='customInput'
          type='number'
          name='amount'
          min='0'
          value={cost.amount}
          onChange={handleInputChange}
        />
      </div>
      <div className='row'>
        <label>Category:</label>
        <select
          name='category'
          className='customInput'
          value={cost.category}
          onChange={handleInputChange}
        >
          <option value=''>Select a category</option>
          <option value='car'>Car</option>
          <option value='cosmetics & body care'>Cosmetics & body care</option>
          <option value='clothing & footwear'>Clothing & footwear</option>
          <option value='entertainment'>Entertainment</option>
          <option value='electronics'>Electronics</option>
          <option value='garden'>Garden</option>
          <option value='gifts'>Gifts</option>
          <option value='groceries'>Groceries</option>
          <option value='health & wellness'>Health & wellness</option>
          <option value='house'>House</option>
          <option value='pet care'>Pet care</option>
          <option value='restaurants'>Restaurants</option>
          <option value='studies & courses'>Studies & courses</option>
          <option value='transportation'>Transportation</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div className='row'>
        <label>Purchase Date:</label>
        <input
          type='date'
          name='purchaseDate'
          className='customInput'
          value={cost.purchaseDate}
          onChange={handleInputChange}
        />
      </div>
      <button className='btnSubmit' onClick={handleSubmit}>
        Add Item
      </button>
      <div className='message'>{message}</div>
    </form>
  );
};

export default AddCostItem;
