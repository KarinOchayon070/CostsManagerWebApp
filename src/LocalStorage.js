const LocalStorage = {
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
    allCosts.push({ ...cost, purchaseDate: new Date(cost.purchaseDate) });
    localStorage.setItem("costs", JSON.stringify(allCosts));
  },
};

export default LocalStorage;
