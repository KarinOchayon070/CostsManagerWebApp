import React, { useState } from "react";
import LocalStorage from "./LocalStorage";
import { useEffect } from "react";

const Report = () => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [costs, setCosts] = useState([]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    if (month && year) {
      if (month === "12") {
        for (let i = 0; i < 12; i++) {
          handleGenerateReport(i);
        }
      } else {
        handleGenerateReport(month);
      }
    }
  }, [month, year]);

  const handleGenerateReport = async () => {
    try {
      let costsForMonthAndYear = [];
      if (month === "12") {
        costsForMonthAndYear = await LocalStorage.getCostsByYear(year);
      } else {
        costsForMonthAndYear = await LocalStorage.getCostsByMonthAndYear(
          month,
          year
        );
      }
      console.log(costsForMonthAndYear);
      setCosts(costsForMonthAndYear);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="generateReportForm">
        <div className="row">
          <label>Month:</label>
          <select onChange={handleMonthChange}>
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
        <div className="row">
          <label>Year:</label>
          <input type="number" onChange={handleYearChange} />
        </div>
      </form>
      {/* <button onClick={handleGenerateReport}>Generate Report</button> */}
      {costs.length === 0 ? (
        <div> </div>
      ) : (
        <table className="reportTable">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Sum</th>
              <th>Category</th>
              <th>Description</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost) => (
              <tr key={cost.item_name}>
                <td>{cost.item_name}</td>
                <td>{cost.sum}</td>
                <td>{cost.category}</td>
                <td>{cost.description}</td>
                <code>
                  <td>{new Date(cost.purchaseDate).toLocaleDateString()}</td>
                </code>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {costs.length === 0 && month && year ? (
        <div className="reportMessage">No data available</div>
      ) : null}
    </div>
  );
};
export default Report;
