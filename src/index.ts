// 3rd-party lib

// local modules
import app from "@/app";

// constants
const PORT = process.env.PORT || 4000;

// Application Entry
app.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
});
