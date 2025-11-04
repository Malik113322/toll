// Toll data (in-memory)
export const tolls = [
  {
    id: 1,
    name: "Delhi Toll",
    booths: [
      { id: 101, name: "Booth A", vehiclesProcessed: 0, totalCollected: 0 },
      { id: 102, name: "Booth B", vehiclesProcessed: 0, totalCollected: 0 },
    ],
    charges: {
      "Two Wheeler": { single: 30, return: 50, weekly: 200 },
      "Four Wheeler": { single: 60, return: 100, weekly: 400 },
    },
  },
  {
    id: 2,
    name: "Mumbai Toll",
    booths: [
      { id: 201, name: "Booth X", vehiclesProcessed: 0, totalCollected: 0 },
      { id: 202, name: "Booth Y", vehiclesProcessed: 0, totalCollected: 0 },
    ],
    charges: {
      "Two Wheeler": { single: 40, return: 70, weekly: 250 },
      "Four Wheeler": { single: 80, return: 140, weekly: 500 },
    },
  },
];

// Vehicle passes (in-memory)
export const vehiclePasses = [];
