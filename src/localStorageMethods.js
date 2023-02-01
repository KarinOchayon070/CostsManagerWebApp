/*
This code exports an object "LocalStorage" that contains 3 methods to perform operations on data stored in the browser's local storage.
getCostsByMonthAndYear method filters and returns the costs for a specific month and year from the local storage.
getCostsByYear method filters and returns the costs for a specific year from the local storage.
addCost method adds a new cost to the local storage.
*/

const localStorageMethods = {
  async getCostsByMonthAndYear(month, year) {
    const allCosts = JSON.parse(localStorage.getItem("costs")) || [];
    const costsForMonthAndYear = allCosts.filter((cost) => {
      const costDate = new Date(cost.purchaseDate);

      return (
        costDate.getMonth() === parseInt(month) &&
        costDate.getFullYear() === parseInt(year)
      );
    });

    return costsForMonthAndYear.reverse();
  },

  async getCostsByYear(year) {
    const allCosts = JSON.parse(localStorage.getItem("costs")) || [];
    const costsForYear = allCosts.filter((cost) => {
      const costDate = new Date(cost.purchaseDate);

      return costDate.getFullYear() === parseInt(year);
    });

    return costsForYear.reverse();
  },

  async addCost(cost) {
    const allCosts = JSON.parse(localStorage.getItem("costs")) || [];
    allCosts.push({
      ...cost,
      id: `${cost.item_name}${new Date().getTime()}`,
      purchaseDate: new Date(cost.purchaseDate),
    });
    localStorage.setItem("costs", JSON.stringify(allCosts));
  },
};

export default localStorageMethods;
