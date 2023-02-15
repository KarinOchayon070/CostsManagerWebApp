/*
Project name: "Spent It Right".
Project team: Karin Ochayon - 207797002, Dor Uzan - 205890510.
*/

import React from "react";


/*
This file is a component that has two fields - month and year.
The initial and deductive value of these two fields is the current month and year.
Also, a table of expenses is always displayed - in which the user's expenses for the current month and year are displayed.
If the user's expenses have not yet been entered - the information will not be displayed in the table, and the user will be notified of this.
When a user changes the month and/or year - a table is shown to him for the month and/or year he entered.
*/

const Report = ({
  costs,
  reportDate,
  handleReportDateChange,
  totalExpenses,
}) => {
  return (
    <div className='report'>
      <form className='generateReportForm'>
        <div className='column'>
          <label>Month:</label>
          <select
            name='month'
            className='customInput'
            value={reportDate.month}
            onChange={handleReportDateChange}
          >
            <option value=''>Select a month</option>
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>March</option>
            <option value='3'>April</option>
            <option value='4'>May</option>
            <option value='5'>June</option>
            <option value='6'>July</option>
            <option value='7'>August</option>
            <option value='8'>September</option>
            <option value='9'>October</option>
            <option value='10'>November</option>
            <option value='11'>December</option>
            <option value='12'>All Months</option>
          </select>
        </div>
        <div className='column'>
          <label>Year:</label>
          <input
            name='year'
            type='number'
            min='0'
            className='customInput'
            value={reportDate.year}
            onChange={handleReportDateChange}
          />
        </div>
      </form>

  {!!totalExpenses && <div className='reportTableContainer'>
        <table className='reportTable'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost) => (
              <tr key={cost.id}>
                <td>{cost.item_name}</td>
                <td>{cost.description}</td>
                <td>{cost.price}₪</td>
                <td>{cost.amount}</td>
                <td>{cost.category}</td>
                <code>
                  <td>{new Date(cost.purchaseDate).toLocaleDateString()}</td>
                </code>{''}
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
        <div className='message'>
          Total Expenses For The Selected Date: {totalExpenses.toFixed(2)}₪
        </div>
    </div>
  );
};

export default Report;
