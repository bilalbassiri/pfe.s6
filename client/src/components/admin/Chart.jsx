import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { MONTHS } from "../../helpers/global.helpers";

const getLastYearMonths = (orders, users) => {
  const d = new Date();
  let currentMonth = d.getMonth();
  d.setMonth(d.getMonth() - 6);
  const currentIOSDate = d.toISOString();
  const lastOrders = orders.filter((order) => order.createdAt > currentIOSDate);
  let lastSexMonths = [];
  for (let i = 5; i >= 0; i--) {
    const index = currentMonth;
    const salesSet = lastOrders.filter(
      (sale) => new Date(sale.createdAt).getMonth() === index
    )?.length;
    const usersSet = users?.filter(
      (user) => new Date(user.createdAt).getMonth() === index
    )?.length;
    lastSexMonths[i] = {
      ...MONTHS[currentMonth],
      salesSet,
      usersSet,
    };
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
    }
  }
  return {
    indexs: lastSexMonths.map((item) => item.index),
    months: lastSexMonths.map((item) => item.month),
    salesSet: lastSexMonths.map((item) => item.salesSet),
    usersSet: lastSexMonths.map((item) => item.usersSet),
  };
};

let Chart = () => {
  const { orders, users } = useSelector((state) => state.dashboard);
  const { months, salesSet, usersSet } = getLastYearMonths(orders, users);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "rgb(186, 186, 186)",
            fontSize: 11,
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "rgb(186, 186, 186)",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        data: salesSet,
        label: "Sales",
        backgroundColor: "#2a9d8f",
        borderColor: "#2a9d8f",
        borderWidth: 2,
      },
      {
        data: usersSet,
        label: "Users",
        backgroundColor: "#F56C66",
        borderColor: "#F56C66",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="horizontalBar-chart-container">
      <Line data={data} options={options} height={300} width={100} />
    </div>
  );
};
export default Chart;
