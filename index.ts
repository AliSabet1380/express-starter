import { config } from "dotenv";

import app from "./app";

config({ path: ".env" });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App ready on port: ${PORT}`);
});
