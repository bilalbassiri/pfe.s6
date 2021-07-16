import React from "react";
import { useParams } from "react-router";
const NewPassword = () => {
  const { userId, token } = useParams();
  return (
    <div className="new-password">
      {userId} - {token}
    </div>
  );
};
export default NewPassword;
