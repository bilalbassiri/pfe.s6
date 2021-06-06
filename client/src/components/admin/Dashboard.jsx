import React from "react";
import GlobalSection from "./GlobalSection";
import { useHistory } from "react-router-dom";
const Dashboard = () => {
  const history = useHistory();
  console.log(history);
  return (
    <div className="dashboard">
      <div className="left">
        <GlobalSection />
      </div>
      <div className="right">
        <div
          className="add-new-book"
          onClick={() => history.push("/admin/dashboard/books/add-new-book")}
        >
          Add New Book
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
