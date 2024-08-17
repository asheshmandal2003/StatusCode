import { app } from "./app";
import dotenv from "dotenv";

if (process.env.NODE !== "PRODUCTION") {
  dotenv.config();
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
