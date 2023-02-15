/*
Project name: "Spent It Right".
Project team: Karin Ochayon - 207797002, Dor Uzan - 205890510.
*/

import "./App.css";
import React, { useState, useEffect } from "react";
import AddCostItem from "./AddCostItem";
import Report from "./Report";
import header from "./header.png";
import localstorage from "./localstorage";
import moment from "moment";
import animations from "./animations";

/*
This file contains the logic from the two components - "AddCostItem", "Report" and from the util file "localStorage".
There is a connection between adding an item and displaying it in the table - when a user adds an item, the item is
displayed directly in the table (a better and clearer user experience).
Therefore, we needed a "parent" to link the two children - so the logic is presented in this file.
*/

const currentDate = new Date();

function App() {
  const [message, setMessage] = useState('');
  const [costs, setCosts] = useState([]);
  const [reportDate, setReportDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  const [cost, setCost] = useState({
    amount: 0,
    price: 0,
    category: '',
    item_name: '',
    description: '',
    purchaseDate: new Date(),
  });
  /* These lines of code filter an array of "costs" objects based on a given month and year, and then calculate the total expenses
   for the remaining objects in the filtered array. The result of the total expenses calculation is stored in the "totalExpenses" variable.*/
  const totalExpenses = costs.reduce((total, costObject) =>  total + Number(costObject.price), 0);

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
      if (reportDate.month === '12') {
        /*If the user wants a financial expense report for the entire year, and not just for a specific month*/
        costsForMonthAndYear = await localstorage.getCostsByYear(
          reportDate.year
        );
      } else {
        /*If the user wants a financial expense report for a specific month & year*/
        costsForMonthAndYear = await localstorage.getCostsByMonthAndYear(
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
    /*If the user filled in all the fields correctly - enter the information to the localStorage, expenses table and inform the user
     that the item was successfully added. Else, let the user know he didn't fill all the fields/an error occurred while adding the item*/
    if (
      cost.price &&
      cost.category &&
      cost.description &&
      cost.purchaseDate &&
      cost.amount
    ) {
      try {
        animations.fallingcoinanimation();
        await localstorage.addCost({
          ...cost,
          purchaseDate: moment(cost.purchaseDate).format('YYYY-MM-DD'),
        });

        setMessage('Item added successfully!');
      } catch (error) {
        setMessage('An error occurred while adding the item');
      }
    } else {
      setMessage('Please fill all the details before adding an item');
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
      const fallingCoinsElement = document.getElementById('gimmick');
      fallingCoinsElement.parentNode.removeChild(fallingCoinsElement);

      setMessage('');
      setCost({
        item_name: '',
        price: 0,
        amount: 0,
        category: '',
        description: '',
        purchaseDate: new Date(),
      });
    }, 5000);
  };

  return (
    <div className='app'>
      <header>
        <img src={header} alt='logo' />
      </header>

      <main>
        <AddCostItem
          cost={cost}
          message={message}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
        <div className='separator' />
        <Report
          costs={costs}
          reportDate={reportDate}
          handleReportDateChange={handleReportDateChange}
          totalExpenses={totalExpenses}
        />
      </main>
    </div>
  );
}

export default App;
