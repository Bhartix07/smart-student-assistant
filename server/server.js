import cors from "cors";
import express from "express";
import assistantRoutes from "./routes/assistantRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/assistant", assistantRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Smart Student Assistant API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
