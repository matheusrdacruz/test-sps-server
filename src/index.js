import 'dotenv/config';

import express from "express";
import routes from "./routes.js";
import cors from "cors";



const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
