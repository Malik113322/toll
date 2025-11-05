import { tolls, vehiclePasses } from "../data/tollData.js";

// Helper to check if pass is still valid
function isPassValid(pass) {
  const now = new Date();
  if (pass.type === "single") return !pass.used;
  if (pass.type === "return")
    return (now - new Date(pass.purchaseTime)) / (1000 * 60 * 60) <= 24 && pass.uses < 2;
  if (pass.type === "weekly")
    return (now - new Date(pass.purchaseTime)) / (1000 * 60 * 60 * 24) <= 7;
  return false;
}

// Check or buy a toll pass
export const processVehicle = (req, res) => {
  const { vehicleNumber, vehicleType, tollId, boothId } = req.body;

  const toll = tolls.find((t) => t.id === tollId);
  if (!toll) return res.status(404).json({ message: "Toll not found" });

  const booth = toll.booths.find((b) => b.id === boothId);
  if (!booth) return res.status(404).json({ message: "Booth not found" });

  const existingPass = vehiclePasses.find(
    (p) => p.vehicleNumber === vehicleNumber && p.tollId === tollId && isPassValid(p)
  );

  if (existingPass) {
    existingPass.uses = (existingPass.uses || 0) + 1;
    booth.vehiclesProcessed++;
    return res.json({
      message: "Vehicle has a valid pass — allowed to pass",
      existingPass,
    });
  }

  const charges = toll.charges[vehicleType];
  res.json({
    message: "No active pass. Choose a new one.",
    charges,
  });
};



// Purchase a pass
export const buyPass = (req, res) => {
  try {
    const { vehicleNumber, vehicleType, tollId, boothId } = req.body;

    const toll = tolls.find((t) => t.id === tollId);
    if (!toll) return res.status(404).json({ message: "Toll not found" });

    const booth = toll.booths.find((b) => b.id === boothId);
    if (!booth) return res.status(404).json({ message: "Booth not found" });

    // determine charge (you can change 'single' if you pass type dynamically)
    const type = "single"; // or get from req.body.type
    const amount = toll.charges[vehicleType][type];

    // update booth stats ✅
    booth.vehiclesProcessed += 1;
    booth.totalCollected += amount;

    // record vehicle pass
    vehiclePasses.push({
      vehicleNumber,
      vehicleType,
      tollId,
      boothId,
      type,
      amount,
      time: new Date(),
    });

    res.json({
      success: true,
      message: "Pass bought successfully",
      vehicleNumber,
      tollName: toll.name,
      boothName: booth.name,
      amount,
      totalCollected: booth.totalCollected,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing pass" });
  }
};


// Leaderboard

export const getLeaderboard = (req, res) => {
  const leaderboard = [];

  tolls.forEach((toll) => {
    toll.booths.forEach((booth) => {
      leaderboard.push({
        toll: toll.name,
        booth: booth.name,
        vehiclesProcessed: booth.vehiclesProcessed,
        totalCollected: booth.totalCollected,
      });
    });
  });

  res.json(leaderboard);
};
