import React from "react";
import { useSelector } from "react-redux";

const TotalSales = () => {
  const { orders } = useSelector((state) => state.dashboard);
  let lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);
  lastMonth = lastMonth.toISOString();
  const getTotal = () => {
    const arr = orders.map((order) => order.total);
    const payed = arr?.reduce((acc, curr) => acc + curr).toFixed(2);
    const average = payed / arr?.length;
    return {
      payed,
      average,
    };
  };
  const getThisMonth = () => {
    const arr = orders
      .filter((order) => order.createdAt > lastMonth)
      .map((order) => order.total);
    const payed = arr?.reduce((acc, curr) => acc + curr).toFixed(2);
    const average = (payed / arr?.length).toFixed(1);
    return {
      payed,
      average,
    };
  };
  const thisMonth = getThisMonth();
  const total = getTotal();
  return (
    <div className="sales-statistic">
      <div className="average-sales">
        <h1>{thisMonth.average}</h1>
        <p>
          This month average payed of<b> {thisMonth.payed}$</b>
        </p>
      </div>
      <div className="total">
        <h4>Total payed</h4>
        <div>
          <span>Amount</span>
          <p>${total.payed}</p>
        </div>
        <div>
          <span>Average</span>
          <p>${total.average.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
export default TotalSales;
