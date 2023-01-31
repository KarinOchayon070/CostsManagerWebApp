import React from "react";

const Report = ({ costs, reportDate, handleReportDateChange }) => {
  return (
    <div className="report">
      <form className="generateReportForm">
        <div className="column">
          <label>Month:</label>
          <select
            name="month"
            className="customInput"
            value={reportDate.month}
            onChange={handleReportDateChange}
          >
            <option value="">Select a month</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
            <option value="12">All Months</option>
          </select>
        </div>
        <div className="column">
          <label>Year:</label>
          <input
            name="year"
            type="number"
            className="customInput"
            value={reportDate.year}
            onChange={handleReportDateChange}
          />
        </div>
      </form>

      <div className="reportTableContainer">
        <table className="reportTable">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Sum</th>
              <th>Category</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost) => (
              <tr key={`${cost.item_name}+${cost.description}`}>
                <td>{cost.item_name}</td>
                <td>{cost.description}</td>
                <td>{cost.sum}</td>
                <td>{cost.category}</td>
                <code>
                  <td>{new Date(cost.purchaseDate).toLocaleDateString()}</td>
                </code>{" "}
              </tr>
            ))}
          </tbody>
        </table>
        {costs.length === 0 && <div className="message">No data available</div>}
      </div>
    </div>
  );
};

export default Report;
