import React from "react";

const PassDisplay = ({ info }) => {
  if (!info) return null;

  return (
    <div className="alert alert-info">
      <h5>Pass Details</h5>
      <p><b>Vehicle:</b> {info.vehicleNo}</p>
      <p><b>Toll:</b> {info.tollName}</p>
      <p><b>Pass Type:</b> {info.passType}</p>
      <p><b>Status:</b> {info.message}</p>
    </div>
  );
};

export default PassDisplay;
