const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const notesRoutes = require("./routes/notes");
const register = require("./routes/registerRoutes");
const applied = require("./routes/AppliedRoutes");
const selected = require("./routes/SelectedRouter");
const Templeta = require("./routes/TempletRouter");
const AddJob = require("./routes/Addjob");
const joiningForm = require("./routes/joiningForm");
const EmployeeProfile = require("./routes/EmployeeProfile");
// const get = require("./routes/getRoutes");
const auth = require("./models/auth");
require("dotenv").config();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const PORT = process.env.PORT || 5000;
const multer = require("multer");
const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});
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
app.use("/admin/hiring/template",Templeta);
app.use("/admin/hiring/jobPost",AddJob );
app.use("/admin/hiring/applicant", applied);
app.use("/admin/hiring/shortlisted", selected);
app.use("/admin/hiring/joining-form",upload.any(), joiningForm);
app.use("/admin/employee-profile", EmployeeProfile);


// Connect to MongoDB
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
