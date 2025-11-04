import React from "react";

const Leaderboard = ({ data }) => {
  if (!data.length) return <p>No leaderboard data yet.</p>;

  return (
    <div className="mt-4">
      <h5>Toll Booth Leaderboard</h5>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Toll Booth</th>
            <th>Vehicles Processed</th>
            <th>Total Collected</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.tollName}</td>
              <td>{item.vehicles}</td>
              <td>₹{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
