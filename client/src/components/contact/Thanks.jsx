import React from "react";
const Thanks = ({ name }) => {
  return (
    <div className="thanks">
      <h1>Thank you {name}</h1>
      <p>
        Your message has been recieved, we will send back a response as soon as possible
      </p>
    </div>
  );
};
export default Thanks;
