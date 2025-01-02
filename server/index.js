import express from "express"
import cors from "cors"
import { config } from "dotenv";
config()

const app = express();
const PORT = process.env.PORT;

//Enable cors
app.use(cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
