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
  const { vehicleNumber, tollId, passType, vehicleType, boothId } = req.body;

  const toll = tolls.find((t) => t.id === tollId);
  const booth = toll.booths.find((b) => b.id === boothId);

  const amount = toll.charges[vehicleType][passType];
  const newPass = {
    vehicleNumber,
    tollId,
    type: passType,
    vehicleType,
    purchaseTime: new Date(),
    used: false,
    uses: 1,
  };

  vehiclePasses.push(newPass);
  booth.vehiclesProcessed++;
  booth.totalCollected += amount;

  res.json({
    message: `${passType} pass purchased successfully`,
    passDetails: newPass,
  });
};

// Leaderboard
export const getLeaderboard = (req, res) => {
  const leaderboard = tolls.flatMap((toll) =>
    toll.booths.map((booth) => ({
      toll: toll.name,
      booth: booth.name,
      vehiclesProcessed: booth.vehiclesProcessed,
      totalCollected: booth.totalCollected,
    }))
  );

  leaderboard.sort((a, b) => b.totalCollected - a.totalCollected);
  res.json(leaderboard);
};

