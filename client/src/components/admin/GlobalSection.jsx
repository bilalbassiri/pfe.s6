import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Material UI icons
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FolderIcon from "@material-ui/icons/Folder";

const GlobalSection = () => {
  const {
    dashboard: { users, books, reviews, orders },
  } = useSelector((state) => state);
  const history = useHistory();
  const all = [
    {
      title: "Users",
      icon: <PeopleIcon />,
      count: users?.length,
    },
    {
      title: "Books",
      icon: <LibraryBooksIcon />,
      count: books?.length,
    },
    {
      title: "Reviews",
      icon: <RateReviewIcon />,
      count: reviews?.length,
    },
    {
      title: "Orders",
      icon: <FolderIcon />,
      count: orders?.length,
    },
  ];
  return (
    <div className="global-section">
      {all.map((item, i) => (
        <div
          className="global-section-chip"
          key={i}
          onClick={() =>
            history.push("/admin/dashboard/" + item.title.toLocaleLowerCase())
          }
        >
          <div className="global-section-chip-icon">{item.icon}</div>
          <div className="global-section-chip-detail">
            <h3 className="global-section-chip-detail-title">{item.title}</h3>
            <h1 className="global-section-chip-detail-count">{item.count}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};
export default GlobalSection;
