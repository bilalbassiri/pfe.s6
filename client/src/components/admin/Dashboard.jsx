import React from "react";
import { useHistory } from "react-router-dom";
// Components
import CustomizedButton from "../ui/CustomizedButton";
import Chart from "./Chart";
import GlobalSection from "./GlobalSection";
import LastUsers from "./LastUsers";
import TotalSales from "./TotalSales";

const styles = {
  addBook: {
    backgroundColor: "#2a9d8f",
    padding: "8.5px 16px",
    borderRadius: 20,
    width: "200px",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
};
const Dashboard = () => {
  const history = useHistory();
  return (
    <div className="dashboard">
      <div className="left">
        <GlobalSection />
        <Chart />
        <LastUsers />
      </div>
      <div className="right">
        <CustomizedButton
          disableElevation
          style={styles.addBook}
          className="add-new-book"
          onClick={() => history.push("/admin/dashboard/books/add-new-book")}
        >
          Add New Book
        </CustomizedButton>
        <TotalSales />
      </div>
    </div>
  );
};
export default Dashboard;
