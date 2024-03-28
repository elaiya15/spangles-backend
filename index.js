const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const notesRoutes = require("./routes/notes");
const register = require("./routes/registerRoutes");
const applied = require("./routes/AppliedRoutes");
const selected = require("./routes/SelectedRouter");
const Templeta = require("./routes/TempletRouter");
const AddJob = require("./routes/Addjob");
// const get = require("./routes/getRoutes");
const auth = require("./models/auth");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DataBase Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
 res.send(" Server Running ");
});
app.use("/register", register);
app.use("/admin/hiring/template/",Templeta );
app.use("/JobPost",AddJob );
app.use("/applied", applied);
app.use("/selected", selected);
// app.use("/get", get);

// Connect to MongoDB
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
