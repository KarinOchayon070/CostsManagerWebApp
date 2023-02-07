/*
Project name: "Spent It Right".
Project team: Karin Ochayon - 207797002, Dor Uzan - 205890510.
*/

/*
This code exports an object named "localstorage" that contains three methods to perform operations on data stored in the browser's
local storage.
Each method returns a Promise that resolves to the desired result if the operation is successful, or rejects with an error message if there
is a failure.
The first method, "getCostsByMonthAndYear", retrieves all costs from the local storage and filters them to only include costs from the
specified month and year. It returns an array of the filtered costs, reversed in order.
The second method, "getCostsByYear", retrieves all costs from the local storage and filters them to only include costs from the specified
year. It returns an array of the filtered costs, reversed in order.
The third method, "addCost", adds a new cost to the local storage. The new cost is added to an array of all costs, stored in the local
storage under the key "costs". The new cost is given a unique id based on its item name and the current timestamp.
*/

const utilsnamespace = {};

utilsnamespace.getCostsByMonthAndYear = async (month, year) => {
  return new Promise((resolve, reject) => {
    try {
      const allCosts = JSON.parse(localStorage.getItem('costs')) || [];
      const costsForMonthAndYear = allCosts.filter((cost) => {
        const costDate = new Date(cost.purchaseDate);
        return (
          costDate.getMonth() === parseInt(month) &&
          costDate.getFullYear() === parseInt(year)
        );
      });
      resolve(costsForMonthAndYear.reverse());
    } catch (error) {
      reject(
        `Failed to get costs for the month ${month} and year ${year}: ${error}`
      );
    }
  });
};

utilsnamespace.getCostsByYear = async (year) => {
  return new Promise((resolve, reject) => {
    try {
      const allCosts = JSON.parse(localStorage.getItem('costs')) || [];
      const costsForYear = allCosts.filter((cost) => {
        const costDate = new Date(cost.purchaseDate);

        return costDate.getFullYear() === parseInt(year);
      });

      resolve(costsForYear.reverse());
    } catch (error) {
      reject(`Failed to get costs for the year ${year}: ${error}`);
    }
  });
};

utilsnamespace.addCost = async (cost) => {
  return new Promise((resolve, reject) => {
    try {
      const allCosts = JSON.parse(localStorage.getItem('costs')) || [];
      allCosts.push({
        ...cost,
        // The id must be uniqe so we used timestamp
        id: `${cost.item_name}${new Date().getTime()}`,
        purchaseDate: new Date(cost.purchaseDate),
      });
      localStorage.setItem('costs', JSON.stringify(allCosts));
      resolve();
    } catch (error) {
      reject(`Failed to add cost ${cost.item_name}: ${error}`);
    }
  });
};

export default utilsnamespace;
