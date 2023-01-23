const LocalStorage = {
  async getCostsByMonthAndYear(month, year) {
    const allCosts = JSON.parse(localStorage.getItem("costs")) || [];
    console.log(month, year);
    const costsForMonthAndYear = allCosts.filter((cost) => {
      const costDate = new Date(cost.purchaseDate);
      console.log("test for the date." + costDate.toISOString());
      return (
        costDate.getMonth() === parseInt(month) &&
        costDate.getFullYear() === parseInt(year)
      );
    });
    console.log(costsForMonthAndYear.length);
    return costsForMonthAndYear;
  },

  async getCostsByYear(year) {
    const allCosts = JSON.parse(localStorage.getItem("costs")) || [];
    const costsForYear = allCosts.filter((cost) => {
      const costDate = new Date(cost.purchaseDate);
      return costDate.getFullYear() === parseInt(year);
    });
    return costsForYear;
  },

  async addCost(cost) {
    let allCosts = JSON.parse(localStorage.getItem("costs")) || [];
    allCosts.push({ ...cost, purchaseDate: new Date(cost.purchaseDate) });
    localStorage.setItem("costs", JSON.stringify(allCosts));
    // cost.purchaseDate = new Date(cost.purchaseDate);
    // allCosts.push(cost);
    // localStorage.setItem("costs", JSON.stringify(allCosts));
  },
};

export default LocalStorage;
