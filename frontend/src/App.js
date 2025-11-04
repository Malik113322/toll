import React, { useState } from "react";
import TollForm from "./components/TollForm";
import PassDisplay from "./components/PassDisplay";
import Leaderboard from "./components/Leaderboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [passInfo, setPassInfo] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🚗 Toll Management System</h2>
      <TollForm setPassInfo={setPassInfo} setLeaderboard={setLeaderboard} />
      <hr />
      {passInfo && <PassDisplay info={passInfo} />}
      <hr />
      <Leaderboard data={leaderboard} />
    </div>
  );
}

export default App;
