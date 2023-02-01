import "./App.css";
import React, { useState, useEffect } from "react";
import AddCostItem from "./AddCostItem";
import Report from "./Report";
import header from "./header.png";
import localStorageMethods from "./localStorageMethods";
import moment from "moment";
import { fallingCoinAnimation } from "./fallingCoinAnimation";

/*
This file contains the logic from the two components - "AddCostItem", "Report" and from the util file "localStorage".
There is a connection between adding an item and displaying it in the table - when a user adds an item, the item is
displayed directly in the table (a better and clearer user experience).
Therefore, we needed a "parent" to link the two children - so the logic is presented in this file.
*/

const currentDate = new Date();

function App() {
  const [message, setMessage] = useState("");
  const [costs, setCosts] = useState([]);
  const [reportDate, setReportDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  const [cost, setCost] = useState({
    amount: 0,
    price: 0,
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
        /*If the user wants a financial expense report for the entire year, and not just for a specific month*/
        costsForMonthAndYear = await localStorageMethods.getCostsByYear(
          reportDate.year
        );
      } else {
        /*If the user wants a financial expense report for a specific month & year*/
        costsForMonthAndYear = await localStorageMethods.getCostsByMonthAndYear(
          reportDate.month,
          reportDate.year
        );
      }

      setCosts(costsForMonthAndYear);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    /*If the user filled in all the fields correctly - enter the information to the localStorage, expenses table and inform the user
     that the item was successfully added. Else, let the user know he didn't fill all the fields*/
    if (
      cost.price &&
      cost.category &&
      cost.description &&
      cost.purchaseDate &&
      cost.amount
    ) {
      try {
        fallingCoinAnimation();
        await localStorageMethods.addCost({
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

    /*
    After the item has been successfully added, the animation will be performed and after 5 seconds -
    all the fields will be reset and the animation will stop.
    */

    setTimeout(() => {
      const fallingCoinsElement = document.getElementById("gimmick");
      fallingCoinsElement.parentNode.removeChild(fallingCoinsElement);

      setMessage("");
      setCost({
        item_name: "",
        price: 0,
        amount: 0,
        category: "",
        description: "",
        purchaseDate: new Date(),
      });
    }, 5000);
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
