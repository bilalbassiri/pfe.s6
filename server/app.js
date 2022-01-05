const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileupload());

connectDB();
app.use("/user", require("./routes/userRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/api", require("./routes/bookRouter"));
app.use("/api/book", require("./routes/reviewRouter"));
app.use("/api", require("./routes/uploadRouter"));

app.listen(process.env.PORT || 5000);
