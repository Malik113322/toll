import express from "express";
import tollRoutes from "./routes/tollRoutes.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/toll", tollRoutes);
app.get("/", (req, res)=>{
    res.json({message:"working!"})
})

const PORT = 8081
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
