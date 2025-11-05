import React, { useState } from "react";
import axios from "axios";

const TollForm = ({ setPassInfo, setLeaderboard }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Four Wheeler");
  const [tollId, setTollId] = useState("");
  const [boothId, setBoothId] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Process Vehicle (Check Pass)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/toll/process", {
        vehicleNumber,
        vehicleType,
        tollId: Number(tollId),
        boothId: Number(boothId),
      });
      setPassInfo(res.data);
      setMessage("");
    } catch (error) {
      setMessage("Error processing vehicle or pass not found");
    }
  };

  // ✅ Buy New Pass
  const buyPass = async (type) => {
    try {
      const res = await axios.post("http://localhost:8081/api/toll/buy", {
        vehicleNumber,
        vehicleType,
        tollId: Number(tollId),
        boothId: Number(boothId),
        type,
      });
      setPassInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Get Leaderboard
  const getLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/toll/leaderboard");
      setLeaderboard(res.data);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card p-3 shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Vehicle Number:</label>
          <input
            type="text"
            className="form-control"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Vehicle Type:</label>
          <select
            className="form-control"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="Two Wheeler">Two Wheeler</option>
            <option value="Four Wheeler">Four Wheeler</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Toll ID:</label>
          <input
            type="number"
            className="form-control"
            value={tollId}
            onChange={(e) => setTollId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Booth ID:</label>
          <input
            type="number"
            className="form-control"
            value={boothId}
            onChange={(e) => setBoothId(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Process Vehicle</button>
        <button
          type="button"
          onClick={getLeaderboard}
          className="btn btn-secondary ms-3"
        >
          Show Leaderboard
        </button>
      </form>

      {message && <p className="mt-2 text-danger">{message}</p>}

      <div className="mt-3">
        <button
          className="btn btn-outline-success me-2"
          onClick={() => buyPass("single")}
        >
          Buy Single Pass
        </button>
        <button
          className="btn btn-outline-warning me-2"
          onClick={() => buyPass("return")}
        >
          Buy Return Pass
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => buyPass("weekly")}
        >
          Buy 7-Day Pass
        </button>
      </div>
    </div>
  );
};

export default TollForm;
