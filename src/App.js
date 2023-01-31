import "./App.css";
import React, { useState, useEffect } from "react";
import AddCostItem from "./AddCostItem";
import Report from "./Report";
import header from "./header.png";
import LocalStorage from "./LocalStorage";
import moment from "moment";

const currentDate = new Date();

function App() {
  const [message, setMessage] = useState("");
  const [costs, setCosts] = useState([]);
  const [reportDate, setReportDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  const [cost, setCost] = useState({
    sum: 0,
    category: "",
    item_name: "",
    description: "",
    purchaseDate: new Date(),
  });

  useEffect(() => {
    handleGenerateReport();
  }, [reportDate]);

  const handleReportDateChange = (event) => {
    const { name, value } = event.target;
    setReportDate({ ...reportDate, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCost({ ...cost, [name]: value });
  };

  const handleGenerateReport = async () => {
    try {
      let costsForMonthAndYear = [];
      if (reportDate.month === "12") {
        costsForMonthAndYear = await LocalStorage.getCostsByYear(
          reportDate.year
        );
      } else {
        costsForMonthAndYear = await LocalStorage.getCostsByMonthAndYear(
          reportDate.month,
          reportDate.year
        );
      }

      setCosts(costsForMonthAndYear);
    } catch (error) {
      //
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cost.sum && cost.category && cost.description && cost.purchaseDate) {
      try {
        await LocalStorage.addCost({
          ...cost,
          purchaseDate: moment(cost.purchaseDate).format("YYYY-MM-DD"),
        });

        setMessage("Item added successfully!");
      } catch (error) {
        setMessage("An error occurred while adding the item");
      }
    } else {
      setMessage("Please fill all the details before adding an item");
    }

    const date = new Date(cost.purchaseDate);

    setReportDate({
      year: date.getFullYear(),
      month: date.getMonth(),
    });

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

  return (
    <div className="app">
      <header>
        <img src={header} alt="logo" />
      </header>

      <main>
        <AddCostItem
          cost={cost}
          message={message}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
        <div className="separator" />
        <Report
          costs={costs}
          reportDate={reportDate}
          handleReportDateChange={handleReportDateChange}
        />
      </main>
    </div>
  );
}

export default App;
