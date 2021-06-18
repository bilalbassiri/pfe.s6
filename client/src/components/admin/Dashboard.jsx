import React from "react";
import GlobalSection from "./GlobalSection";
import { useHistory } from "react-router-dom";
import CustomizedButton from "../ui/CustomizedButton";
import Chart from "./Chart";

const styles = {
  addBook: {
    backgroundColor: "#2a9d8f",
    padding: "8.5px 16px",
    borderRadius: 20,
    width: "100%",
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
      </div>
      <div className="right">
        <CustomizedButton
          style={styles.addBook}
          className="add-new-book"
          onClick={() => history.push("/admin/dashboard/books/add-new-book")}
        >
          Add New Book
        </CustomizedButton>
      </div>
    </div>
  );
};
export default Dashboard;
