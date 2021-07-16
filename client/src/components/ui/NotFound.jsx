import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomizedButton from "./CustomizedButton";

const NotFound = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = "Error 404 | Kafka";
  }, []);
  return (
    <div className="not-found">
      <div>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <h5>The page you are looking for does not exist!</h5>
        <CustomizedButton
        disableElevation
          onClick={() => history.push("/")}
          style={{
            marginTop: 20,
            borderRadius: 20,
            fontWeight: 600,
            fontSize: ".8rem",
            backgroundColor: "#2a9d8f",
            "&:hover": {
              backgroundColor: "#1f776d",
            },
          }}
        >
          GO BACK HOME
        </CustomizedButton>
      </div>
    </div>
  );
};
export default NotFound;
