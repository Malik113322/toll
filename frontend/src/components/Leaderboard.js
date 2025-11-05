import React from "react";

const Leaderboard = ({ data }) => {
  if (!data || data.length === 0) return <p className="mt-3">No leaderboard data yet.</p>;

  console.log(data[0])

  return (
    <div className="mt-4">
      <h5>Toll Booth Leaderboard</h5>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Toll ID</th>
            <th>Booth ID</th>
            <th>Vehicles Processed</th>
            <th>Total Collected (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.toll}</td>
              <td>{item.booth}</td>
              <td>{item.vehiclesProcessed}</td>
              <td>{item.totalCollected
}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
